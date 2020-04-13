import { ServiceType } from "../core/domain/service-type.enum";
import { AbstractService } from "../core/services/facade/abstract-service";
import { ServiceStub } from "../core/services/facade/service.stub";
import * as winston from "winston";
import { Request, Response, Router } from "express";
import { Service } from "../core/services/facade/service";
require ('dotenv').config();

export abstract class AbstractController {
    protected routes: Router;
    protected service: AbstractService;
    protected readonly apiVersion = '/api/v1';

    public constructor(routes: Router) {
        this.routes = routes;
        this.service = AbstractController.createService();
    }

    protected abstract getLogger(): winston.Logger;

    protected executePromise<T>(request: Request, response: Response, method: () => Promise<T>): void {
        method().catch(error => {
            this.getLogger().error(`Error in request: ${error.stack}`);
            response.status(500).send({ error: 'Internal server error' });
        })
    }

    protected executeMethod<T>(request: Request, response: Response, method: () => T): void {
        try {
            method()
        }
        catch (exception) {
            this.getLogger().error(`Error in request: ${exception.stack}`);
            response.status(500).send({ error: 'Internal server error' });
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
}
