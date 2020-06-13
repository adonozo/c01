import * as winston from "winston";
import { NotFoundException } from "../interfaces/exceptions/not-found.exception";
import { ServiceException } from "../interfaces/exceptions/service.exception";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractService {

    abstract get defaultLogger(): winston.Logger;

    protected handle<T>(method: () => T): T {
        try {
            return method();
        } catch (error) {
            throw this.mapError(error);
        }
    }

    private mapError(error: Error): Error {
        switch (error.name) {
            case 'NotFound':
                this.defaultLogger.info(`The element was not found`);
                return new NotFoundException('The element was not found');
            default:
                this.defaultLogger.error(`Error on service layer: ${error.stack}`);
                return new ServiceException('Unknown error');
        }
    }
}
