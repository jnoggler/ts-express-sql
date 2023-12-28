import { Request, Response, NextFunction } from 'express';

import config from '../config';
import { BaseError } from './errors';

/**
 * Error handler middleware.
 * You can add custom error handling logic here.
 */
export function handleError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    req.log.error(err);
    res
    .status(
      err instanceof BaseError
        ? err.httpStatusCode
        : 500,
    )
    .send(
      config.nodeEnv !== 'production'
        ? {
            name: err.name,
            message: err.message,
            stack: err.stack,
            details: err instanceof BaseError ? err.details : undefined,
          }
        : 'Internal Server Error',
    );
  }