import { AbstractController } from './abstract-controller';
import { Logger } from "../utils/logger";
import { Request, Response } from "express";
import * as winston from "winston";
import { StatusCodes } from "./enums/status-codes.enum";

export class HealthController extends AbstractController {
    private logger = Logger.getLogger('HealthController');

    public getHealth(request: Request, response: Response): void {
        this.handle(response, () => {
            this.logger.info('Getting system\'s health');
            const healthService = this.service.HealthService;
            const health = healthService.getHealth();
            response.status(StatusCodes.OK).send(health);
        });
    }

    protected getLogger(): winston.Logger {
        return this.logger;
    }
}
