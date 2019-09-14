import { AbstractService } from "./abstract-service";
import { HealthServiceInterface } from "../interfaces/health-service.interface";
import { HealthServiceStub } from "../services.stub/health-service.stub";
import { IngredientsServiceInterface } from "../interfaces/ingredients-service.interface";
import { IngredientsServiceStub } from "../services.stub/ingredients-service.stub";

export class ServiceStub implements AbstractService {

    public get HealthService(): HealthServiceInterface {
        return new HealthServiceStub();
    }

    public get IngredientsService(): IngredientsServiceInterface {
        return new IngredientsServiceStub();
    }
}
