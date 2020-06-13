import { IService } from "./service.interface";
import { IHealthService } from "../interfaces/health-service.interface";
import { HealthServiceStub } from "../services.stub/health-service.stub";
import { IIngredientsService } from "../interfaces/ingredients-service.interface";
import { IngredientsServiceStub } from "../services.stub/ingredients-service.stub";

export class ServiceStub implements IService {

    public get HealthService(): IHealthService {
        return new HealthServiceStub();
    }

    public get IngredientsService(): IIngredientsService {
        return new IngredientsServiceStub();
    }
}
