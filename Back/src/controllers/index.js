import User from '../models/index.js';

class userController{
    // criar user
    async createUser(userData){
        const user = await User.create(userData);
        return {message: "Usuario criado com sucesso!" , user}
    }

    // buscar todos
    async getAllUser(){
        const users = await User.findAll();
        return users;
    }

    // atualizar user
    async updateUser(id , updateData){
        await User.update(updateData, {where: {xx}});
        return { message: "Usuario atualizado com sucesso!" };
    }

     // excluir user
    async deleteUser(id){
        await User.destroy({where: {xx}})
        return { message: "Usuario Excluido com sucesso!"};
    }
}

export default new userController;