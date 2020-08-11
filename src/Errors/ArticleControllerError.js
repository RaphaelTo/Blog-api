import ExtendableError from './ExtendableError';

class ArticleControllerError extends ExtendableError {

    constructor(msg){
        super(msg);
    }
}

export default ArticleControllerError;