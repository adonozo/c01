import { ServiceType } from "../core/domain/enums/service-type.enum";
import { IService } from "../core/services/facade/service.interface";
import { ServiceStub } from "../core/services/facade/service.stub";
import * as winston from "winston";
import { Response } from "express";
import { StatusCodes } from "./enums/status-codes.enum";
import container from "../di/container";
import { TYPES } from "../di/types";
import { ErrorResponse } from "./models/error-response";
import { Service } from "../core/services/facade/service";
require ('dotenv').config();

export abstract class AbstractController {
    protected service: IService;

    public constructor() {
        this.service = AbstractController.createService();
    }

    protected abstract getLogger(): winston.Logger;

    protected handle<T>(response: Response, method: () => T): void {
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
                response.status(StatusCodes.NOT_FOUND).send(ErrorResponse.getNotFoundError());
                break;
            default:
                this.getLogger().error(`Error in request: ${exception.stack}`);
                response.status(StatusCodes.INTERNAL_ERROR).send(ErrorResponse.getInternalError());
        }
    }

    private static createService(): IService {
        const serviceType = process.env.SERVICE;
        if (serviceType === ServiceType.impl) {
            return container.get<Service>(TYPES.Service);
        } else {
            return new ServiceStub();
        }
    }
}
