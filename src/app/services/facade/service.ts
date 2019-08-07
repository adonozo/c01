import { HealthServiceInterface } from "../interfaces/health-service.interface";
import { HealthService } from "../services.impl/health-service";
import { MemoryFactory } from "../../dao/dao.memory/memory-factory";
import { HealthDao } from "../../dao/dao.memory/health-dao";
import { AbstractService } from "./abstract-service";

export class Service implements AbstractService {
    private readonly healthService: HealthServiceInterface;

    public constructor() {
        this.healthService = Service.setHealthService();
    }

    public get HealthService(): HealthServiceInterface {
        return this.healthService;
    }

    private static setHealthService(): HealthServiceInterface {
        const factory = new MemoryFactory();
        return new HealthService(factory.createDao(HealthDao))
    }
}
