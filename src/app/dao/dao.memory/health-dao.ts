import { HealthDaoInterface } from "../interfaces/health-dao.interface";
import { Health } from "../../core/domain/health";
import { DaoFactoryInterface } from "../interfaces/dao-factory.interface";

export class HealthDao implements HealthDaoInterface, DaoFactoryInterface<HealthDao> {
    public create(): HealthDao {
        return new HealthDao();
    }

    public getHealth(): Health {
        return {
            id: '79b70200-43fb-4fb1-9105-2a7dcfe5f968',
            version: '0.0.1'
        };
    }
}
