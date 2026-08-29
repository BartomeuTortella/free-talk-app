import type { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error.js';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ errors: err.generateErrors() });
    }

    res.status(500).json({ errors: [{ message: 'Internal Server error' }] });

    next();
}