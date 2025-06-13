import { object, number, optional, string, is } from 'valibot';

export enum HttpStatusCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
  ServiceUnavailable = 503,
}

export const ErrorSchema = object({
  statusCode: number(),
  message: optional(string()),
});

export function isHttpError(error: unknown): error is {
  statusCode: HttpStatusCode;
  message?: string;
  errors?: {
    code: string;
    message: string;
  }[];
} {
  return is(ErrorSchema, error);
}
