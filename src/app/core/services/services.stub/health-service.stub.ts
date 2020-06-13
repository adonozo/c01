import { IHealthService } from "../interfaces/health-service.interface";
import { Health } from "../../domain/health";

export class HealthServiceStub implements IHealthService {
    public getHealth(): Health {
        return {
            id: '88b70200-43fb-4fb1-9105-2a7dcfe5f968',
            version: '1.0.0'
        };
    }
}
