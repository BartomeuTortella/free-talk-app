import { CustomError } from "./custom-error.js";


export class DatabaseConnectionError extends CustomError {

    statusCode = 500;

    constructor() {
        super('Database connection error');
    }


    generateErrors() {
        return [{ message: 'Database connection error' }];
    }
}