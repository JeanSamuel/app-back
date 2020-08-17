import db from '../models';
import bcrypt from 'bcryptjs';
import { ErrorHandler, GENERIC_ERROR } from './ErrorHandler';
import UIDGenerator from 'uid-generator';
import addDate from 'date-fns/add';
import isBefore from 'date-fns/isBefore';
import { Op } from 'sequelize';
import sequelize from 'sequelize';

const uidgen = new UIDGenerator(1024);

let User = db.User;
let Session = db.Session;

/**
 * 
 */
export const Errors = {
    UNAUTHORIZED: new ErrorHandler(401, "USER_UNAUTHORIZED", "Unauthorized"),
    TOKEN_EXPIRED: new ErrorHandler(401, "USER_TOKEN_EXPIRED", "Token expired"),
    ERROR_UPDATE_TOKEN: new ErrorHandler(500, "USER_ERROR_UPDATE_TOKEN", "An error occured while updating token expiration"),
    ERROR_VERIFY_TOKEN: new ErrorHandler(500, "USER_ERROR_VERIFY_TOKEN", "An error occured while verifying token"),
    LOGIN_NOT_FOUND: new ErrorHandler(404, "LOGIN_NOT_FOUND", "Login was not found"),
    USERID_NOT_FOUND: new ErrorHandler(404, "USERID_NOT_FOUND", "User ID was not found"),
    SESSION_NOT_FOUND: new ErrorHandler(404, "SESSION_NOT_FOUND", "Session was not found"),
    LOGIN_ALREADY_EXISTS: new ErrorHandler(409, "LOGIN_ALREADY_EXISTS", "Login already exists"),
};


const expiresOn = () => {
        return addDate(new Date(), { hours: 1 });
    }
    /**
     * @param  {} row
     * @param  {row.id} =>{return{id
     * @param  {row.login} login
     * @param  {row.name} name
     * @param  {row.firstname} firstname
     * @param  {row.createdAt} createdAt
     * @param  {row.updatedAt} updatedAt
     * @param  {row.type} type
     * @param  {row.get('nb_sessions'} nb_sessions
     * @returns row
     */
const mapRow = (row) => {
        return {
            id: row.id,
            login: row.login,
            name: row.name,
            firstname: row.firstname,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            type: row.type,
            nb_sessions: row.get('nb_sessions'),
            email: row.email,
            phone: row.phone,
            jobtitle: row.jobtitle,
            active: row.active,
        }
    }
    /**
     *
     * @param login
     * @returns {Promise<unknown>}
     */
const getByLogin = (login) => {
    return new Promise((resolve, reject) => {
        User.findOne({ where: { login: login } }).then(row => {
            if (row) {
                resolve(row);
            } else {
                reject(Errors.LOGIN_NOT_FOUND)
            }
        })
    })
}

/**
 * Checks for duplicated login
 * @param {string} login Login to check
 * @param {number} id ID of the user if it is an update
 * @returns {Promise<boolean>}
 */
const checkDuplicatedLogin = (login, id = 0) => {
    return new Promise((resolve, reject) => {
        let where = { login: login };
        if (id) {
            where = {
                ...where,
                id: {
                    [Op.ne]: id
                }
            }
        }
        User.findOne({ where: where }).then(row => {
            if (row) {
                reject(Errors.LOGIN_ALREADY_EXISTS);
            } else {
                resolve(true);
            }
        }).catch(err => {
            console.error(err);
            reject(GENERIC_ERROR);
        })
    })
}

/**
 *
 */
export const cleanSession = () => {
    Session.destroy({
        where: {
            accessTokenExpires: {
                [Op.lt]: new Date()
            }
        }
    }).then(res => {
        console.info(`Cleaned ${res} zombies sessions`);
    }).catch(err => {
        console.error(res);
    })
}

/**
 * Get user by ID
 * @param {number} id User ID
 * @returns {Promise<User>}
 */
const getById = (id) => {
    return new Promise((resolve, reject) => {
        User.findOne({ where: { id: id } }).then(row => {
            if (row) {
                resolve(row);
            } else {
                reject(Errors.USERID_NOT_FOUND)
            }
        })
    })
}

/**
 * Get user session
 * @param {token} token Session token
 * @returns {Promise<User>}
 */
const getBySession = (token) => {
        return new Promise((resolve, reject) => {
            Session.findOne({ where: { accessToken: token }, include: ["user"] }).then(row => {
                if (row)
                    resolve(row);
                else
                    reject(Errors.SESSION_NOT_FOUND);
            }).catch(() => {
                reject(GENERIC_ERROR);
            });
        })
    }
    /**
     *
     * @type {{all: Controller.all, whoami: Controller.whoami, disconnect: Controller.disconnect, updateMe: Controller.updateMe, auth: Controller.auth, updateStatus: Controller.updateStatus, verify: Controller.verify, create: Controller.create, update: Controller.update, remove: Controller.remove}}
     */
export const Controller = {
    /**
     *
     * @param req
     * @param res
     */
    auth: (req, res) => {
        getByLogin(req.body.login)
            .then(row => {
                if (!row.active) {
                    return Errors.UNAUTHORIZED.send(res);
                }
                if (!row.password) {
                    return Errors.UNAUTHORIZED.send(res);
                }
                if (bcrypt.compareSync(req.body.password, row.password)) {
                    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                    Session.create({
                        userId: row.id,
                        ip: ip,
                        accessToken: uidgen.generateSync(),
                        accessTokenExpires: expiresOn()
                    }).then(session => {
                        res.json({
                            accessToken: session.accessToken,
                            accessTokenExpires: session.accessTokenExpires,
                            name: row.name,
                            firstname: row.firstname
                        })
                    })
                } else {
                    return Errors.UNAUTHORIZED.send(res);
                }
            })
            .catch(err => {
                console.error(err);
                err.send(res)
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: "An error occured" })
            });
    },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    verify: (req, res, next) => {
        if (!req.headers.authorization) {
            Errors.UNAUTHORIZED.send(res);
            return;
        }
        Session.findOne({
            where: { accessToken: req.headers.authorization.replace('Bearer ', '') },
            include: ['user']
        }).then(session => {
            if (!session) {
                Errors.UNAUTHORIZED.send(res);
                return;
            }
            if (isBefore(session.accessTokenExpires, new Date())) {
                Errors.TOKEN_EXPIRED.send(res);
                return;
            }
            if (!session.user.active) {
                Errors.UNAUTHORIZED.send(res);
                return;
            }
            req.user = session.user;
            req.session = session;
            session.update({ accessTokenExpires: expiresOn() }).then(() => {
                next()
            }).catch(err => {
                Errors.ERROR_UPDATE_TOKEN.send(res);
            });
        }).catch(err => {
            Errors.ERROR_VERIFY_TOKEN.send(res);
        })
    },

    /**
     *
     * @param req
     * @param res
     */
    whoami: (req, res) => {
        getBySession(req.session.accessToken)
            .then(row => {
                res.json(mapRow(row.user))
            })
            .catch(err => err.send(res));
    },
    /**
     *
     * @param req
     * @param res
     */
    all: (req, res) => {
        User.findAll({
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('sessions.id')), 'nb_sessions']
                ]
            },
            include: [{ model: Session, as: 'sessions', required: false, attributes: [] }],
            group: ["User.id"]
        }).then((rows) => {
            let mapped = rows.map(mapRow);
            res.json(mapped);
        }).catch(err => {
            console.error(err);
            res.status(500).json({ message: "An error occured" });
        })
    },
    /**
     *
     * @param req
     * @param res
     */
    disconnect: (req, res) => {
        getBySession(req.session.accessToken).then(row => {
            row.destroy().then(res.json({ message: "disconnected" }));
        }).catch(err => err.send(res));
    },
    /**
     *
     * @param req
     * @param res
     */
    create: (req, res) => {
        checkDuplicatedLogin(req.body.login).then(() => {
            let pwd = bcrypt.hashSync(req.body.password, 10);
            User.create({...req.body, password: pwd }).then((row) => {
                res.json(row);
            }).catch(err => {
                res.status(500).json({ message: "An error occured" });
            })
        }).catch((err) => {
            err.send(res);
        })
    },

    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     * Remove user
     */
    remove: (req, res) => {
        getById(req.params.id)
            .then(row => {
                return row.destroy()
            })
            .then(() => res.json({ message: "User deleted" }))
            .catch(err => err.send(res));
    },

    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     * Update user
     */
    update: (req, res) => {
        checkDuplicatedLogin(req.body.login, req.params.id)
            .then(() => getById(req.params.id))
            .then(row => {
                let fields = req.body;
                if (req.body.password) {
                    let pwd = bcrypt.hashSync(req.body.password, 10);
                    fields = {...fields, password: pwd };
                } else {
                    delete fields.password;
                }
                return row.update(fields);
            })
            .then(row => {
                return res.json(mapRow(row));
            })
            .catch(err => err.send(res));
    },

    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     * Toggle user status
     */
    updateStatus: (req, res) => {
        getById(req.params.id)
            .then(user => {
                return user.update({ active: req.body.active })
            })
            .then(user => res.json(user))
            .catch(err => err.send(res));
    },

    /**
     * @param {import('./types').Request} req
     * @param {import('./types').Response} res
     * Update my infos
     */
    updateMe: (req, res) => {
        getBySession(req.session.accessToken)
            .then(row => {
                let params = { name: req.body.name, firstname: req.body.firstname };
                if (req.body.password) {
                    if (!row.user.password) {
                        return Errors.UNAUTHORIZED.send(res);
                    }
                    if (bcrypt.compareSync(req.body.password, row.user.password)) {
                        let pwd = bcrypt.hashSync(req.body.new, 10);
                        params = { password: pwd };
                    } else {
                        return Errors.UNAUTHORIZED.send(res);
                    }
                }
                return row.user.update(params);
            })
            .then(row => {
                return res.json(mapRow(row));
            })
            .catch(err => err.send(res));
    }
};