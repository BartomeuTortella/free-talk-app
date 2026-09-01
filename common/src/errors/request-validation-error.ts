import { type ValidationError } from "express-validator";
import { CustomError } from "./custom-error.js";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request");
  }

  generateErrors() {
    return this.errors
      .filter((error) => error.type === "field")
      .map((error) => {
        return {
          message: error.msg,
          field: error.path,
        };
      });
  }
}