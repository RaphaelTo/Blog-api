import ExtendableError from './ExtendableError';

class ConnectionError extends ExtendableError {

    constructor(msg){
        super(msg);
    }
}

export default ConnectionError;