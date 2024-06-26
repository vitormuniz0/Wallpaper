import express from 'express';
import { SalvarController } from '../controllers/salvarController';


const salvarController = new SalvarController();

const router = express.Router();

//buscar posts
router.get("/salvos", (req, res) => {
    const salvos = salvarController.buscarTodosSalvos(req, res);
    res.status(201).json(salvos);
})

//criar post
router.post("/salvarPost", (req, res) => {
    const salvo = salvarController.salvarPost(req, res);
    res.status(201).json(salvo);
})

router.get("/salvoId/:user_id", (req, res) => {
    const salvosId = salvarController.buscarIdSalvo(req, res);
    res.status(201).json(salvosId);
})

export default router;
