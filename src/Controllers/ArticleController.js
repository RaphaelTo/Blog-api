import Article from '../Models/Article';
import ArticleControllerError from '../Errors/ArticleControllerError';
import mongoose from 'mongoose';

class ArticleController {

    mongoose;

    constructor(mongooseConnection) {
        if(!mongooseConnection.prototype instanceof mongoose.Model) {
            throw new ArticleControllerError('ArticleControllerError: this isnt an mongoose model instance');
        }

        this.mongoose = mongooseConnection;
    }
}

export default ArticleController;