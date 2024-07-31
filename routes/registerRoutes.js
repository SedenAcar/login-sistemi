import express from 'express';
import * as registerController from '../controllers/registerController.js';

const router = express.Router();

router.post('/', registerController.createUser);

export default router;