import { StatusCodes } from "../enums/status-codes.enum";

export class ErrorResponse {
    status: number;
    error: string;
    message: string;

    public static getNotFoundError(): ErrorResponse {
        return {
            status: StatusCodes.NOT_FOUND,
            error: 'Not Found',
            message: 'The item was not found'
        }
    }

    public static getInternalError(): ErrorResponse {
        return {
            status: StatusCodes.INTERNAL_ERROR,
            error: 'Internal Service Error',
            message: 'API error.'
        }
    }
}
