import * as winston from "winston";
import { NotFoundException } from "../interfaces/exceptions/not-found.exception";
import { ServiceException } from "../interfaces/exceptions/service.exception";

export abstract class AbstractService {

    abstract get defaultLogger(): winston.Logger;

    protected handle<T>(method: () => T): T {
        try {
            return method();
        } catch (error) {
            this.defaultLogger.error(`Error on service layer: ${error.stack}`);
            throw AbstractService.mapError(error);
        }
    }

    private static mapError(error: Error): Error {
        switch (error.name) {
            case "NotFound":
                return new NotFoundException('Element was not found');
            default:
                return new ServiceException('Unknown error');
        }
    }
}
