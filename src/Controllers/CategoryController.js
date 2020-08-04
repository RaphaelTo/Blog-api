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

    async getCategoryById(ID) {
        let response;

        try{
            response = successResponse(await this.model.findById(ID));
        }catch (e){
            response = errorResponse(new CategoryController('CategoryControllerError: ID not found'))
        }
        
        return response;
    }

    async createCategory() {
        if(this.model.name === undefined){
            return errorResponse(new CategoryControllerError('CategoryControllerError: Error in the key object'));
        }
        return successResponse(await this.model.save());
    }

    async deleteCategoryById(ID) {
        const deleteCat = await this.model.findByIdAndRemove(ID);
        if(!deleteCat){
            return errorResponse(new CategoryControllerError('CategoryControllerError: ID doesnt exist'));
        }
        return successResponse(deleteCat);
    }

    async updateCategoryById(ID, newCat) {
        const { name } = newCat;
        if(name === undefined) {
            return errorResponse(new CategoryControllerError('CategoryControllerError: key has incorrect'))
        }

        const updateCat = await this.model.findByIdAndUpdate(ID, newCat);
        if(!updateCat) {
            return errorResponse(new CategoryControllerError('CategoryControllerError: ID doesnt exist'))
        }

        return {};
    }
}

export default CategoryController;