import { IHealthService } from "../interfaces/health-service.interface";
import { Health } from "../../domain/health";
import { HealthDao } from "../../../dao/dao.memory/health-dao";
import { Logger } from "../../../utils/logger";
import { AbstractService } from "./abstract-service";
import * as winston from "winston";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";

@injectable()
export class HealthService extends AbstractService implements IHealthService {
    private logger = Logger.getLogger('HealthService');
    private readonly healthDao: HealthDao;

    public constructor(@inject(TYPES.HealthDao) healthDao: HealthDao) {
        super();
        this.healthDao = healthDao;
    }

    public get defaultLogger(): winston.Logger {
        return this.logger;
    }

    public getHealth(): Health {
        const health = this.healthDao.getHealth();
        this.logger.info('System health: %j', health);
        return health;
    }
}
