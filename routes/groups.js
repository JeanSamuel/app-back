import express from 'express';
let router = express.Router();
import { Controller } from '../controllers/GroupController';
import acl from './acl';

let controller = new Controller();

router.get('/groups', acl("A"), controller.all);
router.post('/groups', acl("A"), controller.create);
router.put('/groups/:id', acl("A"), controller.update);
router.delete('/groups/:id', acl("A"), controller.remove);
export default router;
