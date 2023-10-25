export const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  TIMEOUT: 408,
  CONFLICT: 409,
  CLIENT_CLOSED_REQUEST: 499,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  METHOD_NOT_SUPPORTED: 405,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
} as const;

export type API_ERROR_CODE_KEY = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

/**
 * Custom error class
 */
export class ApiError extends Error {
  readonly statusCode: API_ERROR_CODE_KEY;

  constructor(statusCode: API_ERROR_CODE_KEY, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

type CreateError = (
  message?: string,
  errorCode?: API_ERROR_CODE_KEY,
  extra?: unknown,
) => { message; errorCode; extra: unknown };

export const createError: CreateError = (
  message = "Something went wrong",
  errorCode = ERROR_CODES.BAD_REQUEST,
  extra?,
) => {
  return { message, errorCode, extra };
};
