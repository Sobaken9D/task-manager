// Ошибки для бекенда
export class BadRequestError extends Error {
  public readonly statusCode: number = 400;
  constructor(message: string = 'You send bad request to server.') {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends Error {
  public readonly statusCode: number = 401;
  constructor(message: string = 'You unauthorized.') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  public readonly statusCode: number = 403;
  constructor(message: string = 'You do not have permission to perform this action.') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends Error {
  public readonly statusCode: number = 404;
  constructor(message: string = 'Resource not found.') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  public readonly statusCode: number = 409;
  constructor(message: string = 'Resource already exists.') {
    super(message);
    this.name = 'ConflictError';
  }
}


export class InternalServerError extends Error {
  public readonly statusCode: number = 500;
  constructor(message: string = 'Internal Server Error.') {
    super(message);
    this.name = 'InternalServerError';
  }
}

// Ошибки для фронтенда

export class ApiError extends Error {
  public readonly statusCode?: number;

  constructor(message: string = "Unknown Api Error.", statusCode?: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}