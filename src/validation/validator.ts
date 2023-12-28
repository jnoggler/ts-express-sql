import {Schema} from 'zod';
import {Request, Response, NextFunction} from 'express';

export const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const formattedErrors = result.error.format();
        console.log(formattedErrors);
        res.status(400).send(formattedErrors);
    }
    next();
};