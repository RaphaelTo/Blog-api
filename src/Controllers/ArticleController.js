import Article from '../Models/Article';
import ArticleControllerError from '../Errors/ArticleControllerError';
import mongoose from 'mongoose';

class ArticleController {

    model;

    constructor(modelMongoose) {
        if(!modelMongoose.prototype instanceof mongoose.Model) {
            throw new ArticleControllerError('ArticleControllerError: this isnt an mongoose model instance');
        }

        this.model = modelMongoose;
    }


}

export default ArticleController;