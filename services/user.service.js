import db from "../database/db.js"
import User from "../models/user.model.js";

export default class UserService{
    
    fields = ['username', 'password', 'email'];

    async createUser(userDto){

        const sql = `INSERT INTO users (${this.fields.join(', ')}) ` +
        `values ($1, $2, $3) RETURNING *`;

        const userResult = await db.query(sql,
            [userDto.username, userDto.password, userDto.email]
        );
        const user = new User(userResult.rows[0]);
        
        return user;
    }

    async isExistUser(userDto){
        const sql = `select exists(select 1 from users where username=$1);`;

        const userResult = await db.query(sql,
            [userDto.username]
        );
        
        return userResult.rows[0].exists
    }

    async findUser(userDto){
        const sql = `select exists(select 1 from users where username=$1 and password=$2);`;

        const userResult = await db.query(sql,
            [userDto.username, userDto.password]
        );
        
        if(userResult.rows[0].exists){
            const sql = `SELECT * FROM users where username = $1`;
            const userResult = await db.query(sql,
                [userDto.username]
            );

            return new User(userResult.rows[0]);
        }

        return userResult.rows[0].exists;
    }

    async findUserByToken(token){
        const sql = `select * from users where id=$1`;

        const userResult = await db.query(sql,
            [token.sub]
        );
        
        if(userResult.rows[0]){
            return new User(userResult.rows[0]);
        }

        return !userResult.rows[0];
    }
}