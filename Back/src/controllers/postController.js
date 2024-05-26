
import Posts from '../models/postCriado.js'
import fs from 'fs'

export class PostController {

    async createPost(req, res) {

        const { user_id, categoria } = req.body;

        const file = req.file;

        if (!file || !categoria || !user_id) {
            console.log("Id do user , Foto e Categoria são obrigatórios")
            res.status(400).json("Id do user , Foto e Categoria são obrigatórios")
        }

        try {
            const posts = await Posts.create({
                user_id,
                src: file.path,
                categoria
            });
            console.log("Post Criado com sucesso!")
            return res.status(201).json();
        } catch (error) {
            console.error("Erro ao criar post ", error)
            return res.status(500).json()
        }
    }

    async getAllPost(req, res) {
        try {
            const posts = await Posts.findAll({
                attributes: ['user_id', 'src', 'categoria'],
            });
            console.log("Posts Encontrados")
            return res.status(200).json();
        } catch (error) {
            console.error("Erro ao buscar posts", error);
            return res.status(500).json();
        }
    }

    async removePost(req, res) {
        try {
            const posts = await Posts.findAll(req.params.id)

            if(!posts){
                console.log("Imagem não encontrada")
                res.status(404).json()
            }

            fs.unlink(posts.src)

            await Posts.destroy({where : {posts}});

            console.log("Imagem removida")
                res.status(200).json()

        } catch (error) {
            
        }
    }
}


