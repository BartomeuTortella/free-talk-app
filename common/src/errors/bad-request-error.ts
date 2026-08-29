import { CustomError } from "./custom-error.js";


export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);
    }


    generateErrors() {
        return [{ message: this.message }];
    }
}