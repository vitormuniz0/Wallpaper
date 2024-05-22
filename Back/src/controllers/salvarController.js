import { where } from 'sequelize';
import Posts from '../models/postSalvo.js'


export class SalvarController {

    async salvarPost(req, res) {

        const { user_id, postSalvo, categoria } = req.body;

        if (!postSalvo || !categoria || !user_id) {
            console.log("Id do user , Foto e Categoria são obrigatórios")
            res.status(400).json({})
        }

        try {
            const posts = await Posts.create({
                user_id,
                postSalvo,
                categoria
            });
            console.log("Post Salvo sucesso!")
            return res.status(201).json({ message: "Post Salvo com sucesso!", posts });
        } catch (error) {
            console.error("Erro ao salvar post ", error)
            return res.status(500).json({})
        }
    }

    async buscarTodosSalvos(req, res) {
        try {
            const posts = await Posts.findAll({
                attributes: ['user_id', 'postSalvo', 'categoria'],
            });
            console.log("Posts Salvos Buscados")
            return res.status(200).json({ message: "Posts Salvos!", posts });
        } catch (error) {
            console.error("Erro ao buscar posts Salvos", error);
            return res.status(500).json();
        }
    }

    async buscarIdSalvo(req, res) {
        const { user_id, postSalvo, categoria } = req.body;

        if (!postSalvo || !categoria || !user_id) {
            console.log("Id do user , Foto e Categoria são obrigatórios")
            res.status(400).json({})
        }

        const query = {
            user_id
        }

        try {
            const posts = await Posts.findAll({
                where: query
            });

            if (posts.leangth === 0) {
                console.log("Nenhum post Salvo")
                return res.status(404).json({ error: "Nenhum post Salvo" })
            }

            return res.status(200).json({ posts });

        } catch (error) {
            console.error("Erro ao buscar posts salvos:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }


    }


}