import express from 'express';
import {
    authenticate, getUsers, updateUser
} from '../controllers/user.js';

const router = express.Router();

router.post('/auth', authenticate);
router.get('/', getUsers);
router.put('/:id', updateUser);

export default router;