import { AbstractController } from './abstract-controller';
import { Logger } from "../utils/logger";
import { Request, Response } from "express";
import * as winston from "winston";

export class HealthController extends AbstractController {
    private logger = Logger.getLogger('HealthController');

    public getHealth(request: Request, response: Response): void {
        this.executeMethod(request, response, () => {
            this.logger.info('Getting system\'s health');
            const healthService = this.service.HealthService;
            const health = healthService.getHealth();
            response.status(200).send(health);
        })
    }

    protected getLogger(): winston.Logger {
        return this.logger;
    }
}
