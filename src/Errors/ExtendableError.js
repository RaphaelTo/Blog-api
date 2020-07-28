export default class ExtendableError extends Error {
    
    message;
    stack;
    name;

    constructor(message) {
      super();
      this.message = message; 
      this.stack = (new Error()).stack;
      this.name = this.constructor.name;
    }  
}  