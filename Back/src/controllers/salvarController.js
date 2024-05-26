import Posts from '../models/postSalvo.js'
import Imagem from '../models/postCriado.js'



export class SalvarController {

    async salvarPost(req, res) {
        const {user_id, categoria, id_post } = req.body;

        if (!user_id || !categoria || !id_post) {
            console.log("Id do usuário e categoria são obrigatórios");
            return res.status(400).json();
        }

        try {
            // Buscando na tabela original
            const image = await Imagem.findOne({ where: { user_id, categoria, id_post } });
            if (!image) {
                console.log('Imagem não encontrada na tabela original')
                return res.status(404).json();
            }

            if (!image.src) {
                console.log("Campo src não encontrado na tabela original")
                return res.status(400).json();
            }

            const srcImagem = image.src;

            // Ler e converter a imagem para base64
            // const imagemBase64 = await this.converterImagemParaBase64(imagemPath);

            // Criar uma nova entrada na tabela de imagens arquivadas
            const posts = await Posts.create({
                user_id,
                src: srcImagem,
                categoria
            });
            console.log("Imagem arquivada com sucesso!")
            return res.status(201).json();
        } catch (error) {
            console.error("Erro ao salvar imagem arquivada", error);
            return res.status(500).json();
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
        const { user_id } = req.params;

        if (!user_id) {
            console.log("Id do user é obrigatório")
            res.status(400).json({})
        }

        const query = { user_id }

        try {
            const posts = await Posts.findAll({ where: query });

            if (posts.leangth === 0) {
                console.log("Nenhum post Salvo")
                return res.status(404).json()
            } else {
                console.log("Post salvo exibido!")
                return posts;
            }


        } catch (error) {
            console.error("Erro ao buscar posts salvos:", error);
            return res.status(500).json();
        }


    }


}