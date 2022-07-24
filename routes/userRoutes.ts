import express from 'express';
import { register } from '../controllers/userCtrl';
const router : express.Router = express.Router();
router
    .post("/register", register)

export default router;