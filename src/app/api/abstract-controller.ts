import express = require('express');
import { Service } from "../core/services/facade/service";
import { ServiceType } from "../core/domain/service-type.enum";
import { AbstractService } from "../core/services/facade/abstract-service";
import { ServiceStub } from "../core/services/facade/service.stub";
import * as winston from "winston";
import { Request, Response } from "express";
require ('dotenv').config();

export abstract class AbstractController {
    protected app: express.Application;
    protected service: AbstractService;
    protected readonly apiVersion = '/api/v1';

    public constructor(app: express.Application) {
        this.app = app;
        this.service = AbstractController.createService();
        this.register();
    }

    protected abstract register(): void;

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
        catch (e) {
            this.getLogger().error(`Error in request: ${e.stack}`);
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
