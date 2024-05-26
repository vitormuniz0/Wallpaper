import express from 'express';
import { AuthController } from '../controllers/authController';

const authController = new AuthController;

const router = express.Router();

router.post("/auth" , async (req, res) => {
    const auth = await authController.authenticate(req,res);
})

export default router;