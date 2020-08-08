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
}

export default UserController;