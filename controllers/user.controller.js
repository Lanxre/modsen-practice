import UserDTO from "../dtos/user.dto.js"
import UserService from "../services/user.service.js";
import pkg_jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();


export default class UserController{

    constructor(){
        this.service = new UserService();
    }

    async registerUser(req, res){
        const userDto = new UserDTO(req.body);
        if(await this.service.isExistUser(userDto)){
            res.status(409).send({"message": "User Already Exist"});
        }else{
            const user = await this.service.createUser(userDto);
            const accessToken = pkg_jwt.sign({ sub: user.id }, process.env.jwtSecret , { expiresIn: '15m' });
            res.json({ ...user, accessToken: accessToken });
        }
    }

    async loginUser(req, res){
        const userDto = new UserDTO(req.body);
        const user = await this.service.findUser(userDto)
        if(!user){
            res.status(401).send({"message": 'Unauthorized - wrong password or username'});
        }else{
            const accessToken = pkg_jwt.sign({ sub: user.id }, process.env.jwtSecret , { expiresIn: '15m' });
            res.json({ ...user, accessToken: accessToken });
        }

    }

}
