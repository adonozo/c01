import { HealthServiceInterface } from "../interfaces/health-service.interface";

export abstract class AbstractService {
    abstract get HealthService(): HealthServiceInterface;
}
