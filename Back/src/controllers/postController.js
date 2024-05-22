import Posts from '../models/postCriado.js'


export class PostController {

    async createPost(req, res) {

        const { user_id , post, categoria } = req.body;

        if (!post|| !categoria || !user_id) {
            console.log("Id do user , Foto e Categoria são obrigatórios")
            res.status(400).json()
        }

        try {
            const posts = await Posts.create({
                user_id,
                post,
                categoria
            });
            console.log("Post Criado com sucesso!")
            return res.status(201).json({ message: "Post criado com sucesso!", posts });
        } catch (error) {
            console.error("Erro ao criar post ", error)
            return res.status(500).json()
        }
    }

    async getAllPost(req, res) {
        try {
            const posts = await Posts.findAll({
                attributes: ['user_id' ,'post', 'categoria'],
            });
        
            return res.status(200).json({ message: "Usuários encontrados!", posts });
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }


}