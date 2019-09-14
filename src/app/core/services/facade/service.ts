import { HealthServiceInterface } from "../interfaces/health-service.interface";
import { HealthService } from "../services.impl/health-service";
import { MemoryFactory } from "../../../dao/dao.memory/memory-factory";
import { HealthDao } from "../../../dao/dao.memory/health-dao";
import { AbstractService } from "./abstract-service";
import { IngredientsServiceInterface } from "../interfaces/ingredients-service.interface";
import { MongoFactory } from "../../../dao/dao.mongo/mongo-factory";
import { IngredientsService } from "../services.impl/ingredients-service";
import { IngredientsDao } from "../../../dao/dao.mongo/ingredients-dao";
import { Logger } from "../../../utils/logger";

export class Service implements AbstractService {
    private static instance: Service;
    private readonly healthService: HealthServiceInterface;
    private readonly ingredientsService: IngredientsServiceInterface;
    private readonly memoryFactory = new MemoryFactory();
    private readonly mongoFactory = new MongoFactory();
    private logger = Logger.getLogger('Service Implementation');

    private constructor() {
        this.logger.info('Creating service implementation');
        this.healthService = this.setHealthService();
        this.ingredientsService = this.setIngredientsService();
    }

    public static getInstance(): Service {
        if (!this.instance) {
            this.instance =  new Service();
        }
        return this.instance;
    }

    public get HealthService(): HealthServiceInterface {
        return this.healthService;
    }

    private setHealthService(): HealthServiceInterface {
        this.logger.info('Creating Health Service');
        return new HealthService(this.memoryFactory.createDao(HealthDao))
    }

    public get IngredientsService(): IngredientsServiceInterface {
        return this.ingredientsService;
    }

    private setIngredientsService(): IngredientsServiceInterface {
        this.logger.info('Creating Ingredients Service');
        return new IngredientsService(this.mongoFactory.createDao(IngredientsDao));
    }
}
