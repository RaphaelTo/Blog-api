import CategoryControllerError from '../Errors/CategoryControllerError';
import { successResponse, errorResponse } from '../responseJson';
import mongoose from 'mongoose';
import Category from '../Models/Category';

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

    async getCategoryById(ID) {
        let response;

        try{
            response = successResponse(await this.model.findById(ID));
        }catch (e){
            response = errorResponse(new CategoryController('CategoryControllerError: ID not found'))
        }
        
        return response;
    }

    async createCategory(category) {
        if(!category.name){
            return errorResponse(new CategoryControllerError('CategoryControllerError: Error in the key object'));    
        }
        return successResponse(await this.model.create(category));
    }
}

export default CategoryController;