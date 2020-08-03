import CategoryControllerError from '../Errors/CategoryControllerError';
import { successResponse, errorResponse } from '../responseJson';
import mongoose from 'mongoose';

class CategoryController {
    model;

    constructor(modelMongoose) {
        if(!modelMongoose.prototype instanceof mongoose.Model) {
            throw new CategoryControllerError('CategoryControllerError: this isnt an mongoose model instance');
        }

        this.model = modelMongoose;
    }

    getAllCategory() {
        return successResponse({})
    }
}

export default CategoryController;