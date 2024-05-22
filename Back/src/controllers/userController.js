import Users from '../models/users.js';
import pkg from 'bcryptjs';
const { hash } = pkg;

export class UserController {

    // CRIAR USER
    async createUser(req, res) {

        // vendo se o usuario existe primeiro

        // pegando o corpo da requisição para validar se está passando todos os parametros 
        const { nome, email, senha } = req.body;


        if (!nome, !email, !senha) {
            console.log("Nome, email, e senha é Obrigatório")
            return res.status(400).json({ error: "Nome, email, e senha é Obrigatório" });
        }


        const userExists = await Users.findOne({ where: { email } });
        // verificando se existe o user
        if (userExists) {
            console.log("Usuario já Existe!")
            return res.status(400).send()
        }
        // hash da senha
        const has_password = await hash(senha, 8);
        try {
            // se não existir ele vai criar user no banco 
            const user = await Users.create({
                nome,
                email,
                senha: has_password,
            });
            console.log("Usuario Criado")
            return res.status(201).send();
        } catch (error) {
            // se der algum erro irá mostrar
            console.error("Erro ao criar usuário ", error)
            return res.status(500).json()
        }
    }

    // BUSCAR TODOS
    async getAllUser(req, res) {
        try {
            const users = await Users.findAll({
                attributes: ['id', 'nome', 'email'],
            });
            return res.status(200).json({ users });
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
            // Include error details in the response
            return res.status(500).json({ error: error.message || "Internal Server Error" });
        }
    }

    // atualizar user
    async updateUser(req, res) {


        try {
            // validando a presenca dos campos obrigatórios 
            const { nome, email, senha } = req.body;
            const { id } = req.params;

            if (!nome, !email, !senha) {
                console.log("Nome, email, e senha é Obrigatório")
                return res.status(400).json({ message: "Nome, email, e senha é Obrigatório" });
            }

            const updateData = { nome, email, senha };
            // verificando se o usuario a ser atualizado existe
            const [updatedCount, [updatedUser]] = await Users.update(updateData, {
                where: { id },
                returning: true,
            });

            if (updatedCount === 0) {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            } else {
                const updatedUser = await Users.findOne({ where: { id } });
                return res.status(200).json({ message: "Usuário atualizado com sucesso!", user: updatedUser || {} });
            }
        } catch (error) {
            console.error("Erro ao tentar atualizar o usuário:", error);
            return res.status(500).json({ message: "Erro ao atualizar usuário" });
        }
    }
    // excluir user
    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            await Users.destroy({ where: { id } })
            return { message: "Usuario Excluido com sucesso!" };
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            return res.status(500).json({ error: 'Erro ao excluir usuário!' });
        }
    }
}

