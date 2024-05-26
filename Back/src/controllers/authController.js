import { where } from 'sequelize';
import Users from '../models/users.js';
import pkg from 'bcrypt';
import webToken from 'jsonwebtoken'
import dotenv from 'dotenv';

const {sign} = webToken; 
const { compare} = pkg;


export class AuthController {

    async authenticate(req , res){
        try {
            
            const {email , senha } = req.body;

            if(!email , !senha){
                console.log("Nome e  email é Obrigatório")
                return res.status(400).json()
            }

            const user = await Users.findOne({where: {email}})

            if(!user){
                console.log("Usuário não existe!")
                return res.status(400).json()
            }

            const isValuePassword = await compare(senha , user.senha);

            if (!isValuePassword) {
                console.log("Senha  Invalida")
                return res.json()
            }

            const secret = process.env.SECRET;

            const token = sign({id: user.id}, secret , {expiresIn: "1d"})

            const {id, email: userEmail} = user;

            return res.json({ user: { id, email: userEmail }, token })

        } catch (error) {
            console.error("Erro durante autenticação:", error);
            return res.status(500).json();
        }
    }
}