import { ServiceType } from "../core/domain/service-type.enum";
import { AbstractService } from "../core/services/facade/abstract-service";
import { ServiceStub } from "../core/services/facade/service.stub";
import * as winston from "winston";
import { Request, Response, Router } from "express";
import { Service } from "../core/services/facade/service";
import { ErrorResponse } from "./interfaces/error-response.interface";
import { StatusCodes } from "./enums/status-codes.enum";
require ('dotenv').config();

export abstract class AbstractController {
    protected routes: Router;
    protected service: AbstractService;

    public constructor(routes: Router) {
        this.routes = routes;
        this.service = AbstractController.createService();
    }

    protected abstract getLogger(): winston.Logger;

    protected executePromise<T>(request: Request, response: Response, method: () => Promise<T>): void {
        method().catch(exception => {
            this.handleException(response, exception);
        })
    }

    protected executeMethod<T>(request: Request, response: Response, method: () => T): void {
        try {
            method()
        }
        catch (exception) {
            this.handleException(response, exception);
        }
    }

    private handleException(response: Response, exception: Error): void {
        switch (exception.name) {
            case 'NotFound':
                this.getLogger().info(`Element not found`);
                response.status(StatusCodes.NOT_FOUND).send(AbstractController.getNotFoundError());
                break;
            default:
                this.getLogger().error(`Error in request: ${exception.stack}`);
                response.status(StatusCodes.INTERNAL_ERROR).send(AbstractController.getInternalError());
        }
    }

    private static createService(): AbstractService {
        const serviceType = process.env.SERVICE;
        if (serviceType === ServiceType.impl) {
            return Service.getInstance();
        } else {
            return new ServiceStub();
        }
    }

    private static getNotFoundError(): ErrorResponse {
        return {
            status: StatusCodes.NOT_FOUND,
            error: 'Not Found',
            message: 'The item was not found'
        }
    }

    private static getInternalError(): ErrorResponse {
        return {
            status: StatusCodes.INTERNAL_ERROR,
            error: 'Internal Service Error',
            message: 'API error.'
        }
    }
}
