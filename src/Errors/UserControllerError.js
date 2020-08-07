import ExtendableError from './ExtendableError';

class UserControllerError extends ExtendableError {

    constructor(msg){
        super(msg);
    }
}

export default UserControllerError;