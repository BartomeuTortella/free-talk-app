import { CustomError } from "./custom-error.js";


export class NotFoundError extends CustomError {
    
    statusCode = 404;

    constructor() {
        super('Not found');
    }


    generateErrors() {
        return [{ message: 'Not found' }];
    }
}