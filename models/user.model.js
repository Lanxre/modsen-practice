export default class User{

    constructor({
        id,
        username,
        password,
        email,
        role_id
    }){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role_id = role_id;
    }

};