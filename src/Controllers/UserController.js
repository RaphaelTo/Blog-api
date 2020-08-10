import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserControllerError from "../Errors/UserControllerError";
import {errorResponse, successResponse} from '../responseJson';


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
        if(typeof paramUser.username !== 'string' || typeof paramUser.password !== 'string'){
            throw new UserControllerError('UserControllerError: params isnt type string')
        }

        const getAccount = await this.model.find({username: paramUser.username});
        if(getAccount.length === 0){
            return errorResponse('Username not found');
        }

        const decrypt = await this.comparePasswordWithCrypt(paramUser.password, getAccount[0].password);
        if(!decrypt){
            return errorResponse('Error password')
        }

        return successResponse(await this.createToken(paramUser.username));
    }

    async createUser() {
        let {username, password} = this.model;
        if(!username || !password) {
            return errorResponse(new UserControllerError('UserControllerError: password or username cant be undefined or null'))
        }
        this.model.password = await this.cryptPassword(password);
        return successResponse(await this.model.save());
    }

    async updatePasswordUserByID(ID, password){

    }
}

export default UserController;