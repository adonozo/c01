import { AbstractController } from './abstract-controller';
import { Logger } from "../utils/logger";
import { Health } from "../core/domain/health";
import * as winston from "winston";

export class HealthController extends AbstractController {
    private logger = Logger.getLogger('HealthController');

    public register(): void {
        const logger = Logger.getLogger('HealthController');
        logger.info('Registering Health Controller');
        this.app.get('/api/v1/health', (req, res): void => {
            this.executeMethod(req, res, () => {
                const health = this.getHealth();
                res.status(200).send(health);
            });
        });
    }

    public getHealth(): Health {
        this.logger.info('Getting system\'s health');
        const healthService = this.service.HealthService;
        return healthService.getHealth();
    }

    protected getLogger(): winston.Logger {
        return this.logger;
    }
}
