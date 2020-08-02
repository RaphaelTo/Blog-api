import ArticleControllerError from '../Errors/ArticleControllerError';
import { successResponse, errorResponse } from '../responseJson';
import mongoose from 'mongoose';

class ArticleController {

    model;

    constructor(modelMongoose) {
        if(!modelMongoose.prototype instanceof mongoose.Model) {
            throw new ArticleControllerError('ArticleControllerError: this isnt an mongoose model instance');
        }

        this.model = modelMongoose;
    }

    async getAllArticle(){
        const getAllArticle = await this.model.find({});
        return successResponse(getAllArticle);
    }

}

export default ArticleController;