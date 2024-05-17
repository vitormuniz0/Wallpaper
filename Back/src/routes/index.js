import express from "express";
import userController from "../controllers/index.js"

const router = express.Router;

// Rota para buscar todos usuarios
router.get("/users", (req , res) =>{
    const users = userController.getAllUser(req,res);
    res.json(task);
})

// Rota para criar usuario
router.post("/users", (req , res) =>{
    const newUser= userController.createUser(req,res);
    res.status(201).json(newUser);
})

// Rota para criar usuario
router.put("/users/:id", (req , res) =>{
    const updateUser= userController.updateUser(req,res);
    res.json(updateUser);
})

// Rota para criar usuario
router.delete("/users/:id", (req , res) =>{
    const deleteUser= userController.deleteUser(req,res);
    res.json(deleteUser);
})

export default router;