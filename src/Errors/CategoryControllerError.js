import ExtendableError from './ExtendableError';

class CategoryControllerError extends ExtendableError {

    constructor(msg){
        super(msg);
    }
}

export default CategoryControllerError;