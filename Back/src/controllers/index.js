import Users from '../models/users.js';
import pkg from 'bcryptjs';
const { hash } = pkg;

export class UserController {

    validateUserData(nome, email, senha) {
        if (!nome || !email || !senha) {
            return {
                nome: 'Nome é obrigatório!',
                email: 'Email é obrigatório!',
                senha: 'Senha é obrigatória!',
            };
        }
    }


    // CRIAR USER
    async createUser(req, res) {

        // vendo se o usuario existe primeiro

        // pegando o corpo da requisição para validar se está passando todos os parametros 
        const { nome, email, senha } = req.body;

        // chamando a funcao
        const validationErrors = this.validateUserData(nome, email, senha);


        if (validationErrors) {
            return res.status(400).json({ message: "Nome, email, e senha é Obrigatório" });
        }

        try {
            const userExists = await Users.findOne({ where: { email } });
            // verificando se existe o user
            if (userExists) {
                console.log("Usuario já Existe!")
                return res.status(400).json({ error: "Este Usuário já existe" })
            }
            // hash da senha
            const has_password = await hash(senha, 8);

            // se não existir ele vai criar user no banco 
            const user = await Users.create({
                nome,
                email,
                senha: has_password,
            });
            return res.status(201).json({ message: "Usuario criado com sucesso!", user });
        } catch (error) {
            // se der algum erro irá mostrar
            console.error("Erro ao criar usuário ", error)
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    }

    // BUSCAR TODOS
    async getAllUser(req, res) {
        try {
            const users = await Users.findAll({
                attributes: ['id', 'nome', 'email'],
            });
            const sanitizedUsers = users.map((user) => {
                return { id: user.id, nome: user.nome, email: user.email };
            });

            return res.status(200).json({ message: "Usuários encontrados!", users: sanitizedUsers });
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    // atualizar user
    async updateUser(req, res) {


        try {
            // validando a presenca dos campos obrigatórios 
            const { nome, email, senha } = req.body;
            const { id } = req.params;
            const validationErrors = this.validateUserData(nome, email, senha);

            if (validationErrors) {
                return res.status(400).json({ message: "Nome, email, e senha é Obrigatório", errors: validationErrors });
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

