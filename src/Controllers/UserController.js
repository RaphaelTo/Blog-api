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
        if(typeof passwordToCrypt !== 'string'){
            throw new UserControllerError('UserControllerError: the params isnt a string')
        }

        return await bcrypt.hash(passwordToCrypt, process.env.SALT);
    }

    async comparePasswordWithCrypt(passwordCrypted, passwordDB){
        if(typeof passwordCrypted !== 'string' || typeof passwordDB !== 'string'){
            throw new UserControllerError('UserControllerError: the params isnt a string')
        }
        return await bcrypt.compare(passwordCrypted, passwordDB);
    }
}

export default UserController;