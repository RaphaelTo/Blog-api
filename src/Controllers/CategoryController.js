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

    async getAllCategory() {
        const getAllCategory = await this.model.find({});
        const lengthCategoryZero = '0 category found';

        return successResponse(getAllCategory.length > 0 ? await this.model.find({}) : lengthCategoryZero);
    }
}

export default CategoryController;