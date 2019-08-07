import express = require('express');
import { Service } from "../services/facade/service";
import { ServiceType } from "../domain/service-type.enum";
import { AbstractService } from "../services/facade/abstract-service";
import { ServiceStub } from "../services/facade/service.stub";
require ('dotenv').config();

export abstract class AbstractController {
    protected app: express.Application;
    protected service: AbstractService;

    public constructor(app: express.Application) {
        this.app = app;
        this.service = AbstractController.createService();
        this.register();
    }

    protected abstract register(): void;

    private static createService(): AbstractService {
        const serviceType = process.env.SERVICE;
        switch (serviceType) {
            case ServiceType.impl:
                return new Service();
            default:
                return new ServiceStub();
        }
    }
}
