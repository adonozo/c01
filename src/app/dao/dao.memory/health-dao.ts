import { IHealthDao } from "../interfaces/health-dao.interface";
import { Health } from "../../core/domain/health";
import { injectable } from "inversify";

@injectable()
export class HealthDao implements IHealthDao {
    public getHealth(): Health {
        return {
            id: '79b70200-43fb-4fb1-9105-2a7dcfe5f968',
            version: '0.0.1'
        };
    }
}
