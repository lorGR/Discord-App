import express from 'express';
import { register, login } from '../controllers/userCtrl';
const router : express.Router = express.Router();
router
    .post("/register", register)
    .post("/login", login)

export default router;