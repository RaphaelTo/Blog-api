import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        return await bcrypt.hash(passwordToCrypt, salt);
    }

    async comparePasswordWithCrypt(password, passwordDB){
        if(typeof password !== 'string' || typeof passwordDB !== 'string'){
            throw new UserControllerError('UserControllerError: the params isnt a string')
        }
        return await bcrypt.compare(password, passwordDB);
    }

    async createToken(email){
        if(typeof email !== 'string') {
            throw new UserControllerError('UserControllerError: the params isnt a string');
        }
        return await jwt.sign({email: email}, process.env.SECRETTOKEN, {algorithm: 'HS256', expiresIn: '24h'});
    }

    async connection(paramUser) {
        const getAccount = await this.model.find({username: paramUser.username});
        if(getAccount.length === 0){
            return errorResponse('Username not found');
        }
        return getAccount;
    }
}

export default UserController;