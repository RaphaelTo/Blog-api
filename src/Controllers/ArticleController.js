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

    async createArticle(){
        const { title, abstract, content, Category } = this.model;

        if(!title || !abstract || !content || !Category){
            return errorResponse(new ArticleControllerError('ArticleControllerError: Error on the "key" object'))
        }
        const add = await this.model.save();
        return successResponse(add);
    }

    async deleteArticleById(ID) {
        const deleteArticle = await this.model.findByIdAndRemove(ID);
        if(!deleteArticle){
            return errorResponse(new ArticleControllerError('ArticleControllerError: ID doesnt exist'))
        }

        return successResponse(deleteArticle);
    }

    async updateArticleById(ID, body) {
        const updateArticle = this.model.findByIdAndUpdate(ID, body);
        if(!updateArticle) {
            return errorResponse(new ArticleControllerError('ArticleControllerError: ID doesnt exist'))
        }
        return {}
    }

}

export default ArticleController;