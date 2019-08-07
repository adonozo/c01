import { DaoFactoryInterface } from "../../dao/interfaces/dao-factory.interface";
import { HealthServiceInterface } from "../interfaces/health-service.interface";
import { Health } from "../../domain/health";
import { HealthDao } from "../../dao/dao.memory/health-dao";

export class HealthService implements HealthServiceInterface {
    private healthDaoFactory: DaoFactoryInterface<HealthDao>;

    public constructor(healthDaoFactory: DaoFactoryInterface<HealthDao>) {
        this.healthDaoFactory = healthDaoFactory;
    }

    public getHealth(): Health {
        const healthDao = this.healthDaoFactory.create();
        return healthDao.getHealth();
    }
}
