import db from '../models';
import { GENERIC_ERROR, ErrorHandler } from './ErrorHandler';

let Group = db.Group;
let Access = db.Access;

export const Errors = {
    GROUP_NOT_FOUND: new ErrorHandler(404, "GROUP_NOT_FOUND", "Group was not found"),
};

const findById = (id) => {
    return new Promise((resolve, reject) => {
        Group.findOne({ where: { id: id }, include: "accesses" }).then(row => {
            if (row) resolve(row);
            else reject(Errors.GROUP_NOT_FOUND);
        }).catch((err) => {
            console.error(err);
            reject(GENERIC_ERROR);
        })
    })
}

/**
 *
 * @param {Group} group
 */
const updateGroup = (group, values) => {
    return new Promise((resolve, reject) => {
        group.update(values).then(res => resolve(res)).catch(err => {
            console.error(err);
            reject(GENERIC_ERROR);
        })
    })
}

/**
 *
 * @param {Group} group
 */
const deleteGroup = (group) => {
    return new Promise((resolve, reject) => {
        group.destroy().then(() => resolve(true)).catch(err => {
            console.error(err);
            reject(GENERIC_ERROR);
        })
    })
}

const createAccesses = (groupId, accesses) => {
    return new Promise((resolve, reject) => {
        let records = accesses.map(a => {
            delete a.id;
            return {
                accessC: false,
                accessR: false,
                accessU: false,
                accessD: false,
                ...a,
                groupId: groupId
            }
        });
        Access.bulkCreate(records, { updateOnDuplicate: ["accessC", "accessR", "accessU", "accessD"] }).then(resolve).catch(err => {
            console.error(err);
            reject(GENERIC_ERROR);
        });
    })
}

export class Controller {
    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     * Get all groups
     */
    all = (req, res) => {
        Group.findAll({ include: "accesses" })
            .then(rows => res.json(rows))
            .catch(err => {
                console.error(err);
                GENERIC_ERROR.send(res);
            })
    }

    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     * Create a new group
     */
    create = (req, res) => {
        Group.create(req.body)
            .then(row => createAccesses(row.id, req.body.accesses).then(() => { return findById(row.id) }))
            .then(row => res.json(row))
            .catch(err => {
                console.error(err);
                GENERIC_ERROR.send(res);
            })
    }

    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     * Update a group
     */
    update = (req, res) => {
        findById(req.params.id)
            .then(group => updateGroup(group, req.body))
            .then(group => createAccesses(group.id, req.body.accesses).then(() => { return findById(group.id) }))
            .then(group => res.json(group))
            .catch(err => err.send(res));
    }

    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     * Delete a group
     */
    remove = (req, res) => {
        findById(req.params.id)
            .then(deleteGroup)
            .then(res.json({ 'message': 'Group deleted' }))
            .catch(err => err.send(res));
    }
}
