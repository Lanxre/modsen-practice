export default class UserDTO {

    constructor({
        id,
        username,
        password,
        email
    }){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

}