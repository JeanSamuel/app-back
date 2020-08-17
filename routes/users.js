import express from 'express';
let router = express.Router();
import {Controller} from '../controllers/UserController';
import acl from './acl';

router.post('/auth', Controller.auth);
//router.use(Controller.verify);
router.get('/me', Controller.whoami);
router.put('/me', Controller.updateMe);
router.get('/users', acl('A'), Controller.all);
router.post('/users', acl('A'), Controller.create);
router.delete('/session', Controller.disconnect);
router.delete('/users/:id', acl('A'), Controller.remove);
router.put('/users/:id', acl('A'), Controller.update);
router.put('/users/:id/status', acl('A'), Controller.updateStatus);
export default router;
