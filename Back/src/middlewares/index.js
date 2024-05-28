
import { Secret, verify } from "jsonwebtoken";


export function AuthMiddlewares(req, res, next){

    const {authorization} = req.headers;            //recebendo o token

    if(!authorization){
        console.log("Token não existe!")
        return res.status(401).json() 
    }

    const [, token] = authorization.split(" ");   // separando o token 

    try {
        
        const secret = process.env.SECRET
        const decoded = verify(token, secret);
        const {id} = decoded

        req.userId = id;
        next();

    } catch (error) {
        console.log("Token invalido")
        return res.status(401).json()
    }


}