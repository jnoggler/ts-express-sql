export class BaseError extends Error {
  public details: object;

  public httpStatusCode: number;

  constructor(
    httpStatusCode: number,
    name: string,
    message: string,
    details?: object,
  ) {
    super(message);

    this.httpStatusCode = httpStatusCode;
    this.name = name;
    this.details = details || {};

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError);
    }
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string, details?: object) {
    super(400, 'BAD_REQUEST_ERROR', message, details);
  }
}
