import {Schema} from 'zod';
import {Request, Response, NextFunction} from 'express';
import { BadRequestError } from '../error/errors';

export const validateBody = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const formattedErrors = result.error.format();
        throw new BadRequestError('Invalid request body', formattedErrors);
    } else {
        next();
    }
};