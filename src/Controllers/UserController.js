import bcrypt from 'bcrypt';
import UserControllerError from "../Errors/UserControllerError";
import { successResponse, errorResponse } from '../responseJson';


class UserController {
    model;

    constructor(modelMongoose = null) {
        if(modelMongoose === null) {
            throw new UserControllerError('UserControllerError: this isnt an mongoose model instance');
        }

        this.model = modelMongoose;
    }

    samePassword(firstPassword, secondPassword) {
        if(typeof firstPassword !== 'string' || typeof secondPassword !== 'string'){
            return false;
        }

        return firstPassword === secondPassword;
    }

    async cryptPassword(passwordToCrypt){
        const crypt = await bcrypt.hash(passwordToCrypt, process.env.SALT);
        return crypt;
    }
}

export default UserController;