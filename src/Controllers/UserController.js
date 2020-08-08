import UserControllerError from "../Errors/UserControllerError";
import { successResponse, errorResponse } from '../responseJson';
import mongoose from 'mongoose';

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
        return ''
    }
}

export default UserController;