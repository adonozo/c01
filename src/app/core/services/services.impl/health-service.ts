import { DaoFactoryInterface } from "../../../dao/interfaces/dao-factory.interface";
import { HealthServiceInterface } from "../interfaces/health-service.interface";
import { Health } from "../../domain/health";
import { HealthDao } from "../../../dao/dao.memory/health-dao";
import { Logger } from "../../../utils/logger";
import { AbstractService } from "./abstract-service";
import * as winston from "winston";

export class HealthService extends AbstractService implements HealthServiceInterface {
    private healthDaoFactory: DaoFactoryInterface<HealthDao>;
    private logger = Logger.getLogger('HealthService');

    public constructor(healthDaoFactory: DaoFactoryInterface<HealthDao>) {
        super();
        this.healthDaoFactory = healthDaoFactory;
    }

    public get defaultLogger(): winston.Logger {
        return this.logger;
    }

    public getHealth(): Health {
        const healthDao = this.healthDaoFactory.create();
        const health = healthDao.getHealth();
        this.logger.info('System health: %j', health);
        return health;
    }
}
