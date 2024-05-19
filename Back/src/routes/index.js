import express from "express";
import {UserController} from '../controllers/index'

const userController = new UserController();

const router = express.Router();

// Rota para buscar todos usuarios
router.get('/users', async (req, res) => {
    try {
        const users = await userController.getAllUser(req, res);
        res.json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro interno do servidor!' });
    }
});

// Rota para criar usuario
router.post("/createUser", (req, res) => {
    const newUser = userController.createUser(req, res);
    res.status(201).json(newUser);
})

// Rota para atualizar usuario
router.put("/user/:id", (req, res) => {
    const updateUser = userController.updateUser(req, res);
    res.json(updateUser);
})

// Rota para deletar usuario
router.delete("/user/:id", (req, res) => {
    const deleteUser = userController.deleteUser(req, res);
    res.json(deleteUser);
})

export default router;