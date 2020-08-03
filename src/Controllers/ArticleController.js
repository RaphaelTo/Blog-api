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
        const lengthArticleZero = '0 article found';

        return successResponse(getAllArticle.length <= 0 ? lengthArticleZero : getAllArticle);
    }

    async getArticleById(ID) {
        let response;

        try{
            const getUserById = await this.model.findById(ID);
            response = successResponse(getUserById);
        }catch (e) {
            response = errorResponse(new ArticleControllerError('ArticleControllerError: ID not found'))
        }

        return response;
    }

}

export default ArticleController;