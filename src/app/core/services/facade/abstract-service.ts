import { HealthServiceInterface } from "../interfaces/health-service.interface";
import { IngredientsServiceInterface } from "../interfaces/ingredients-service.interface";

export abstract class AbstractService {
    abstract get HealthService(): HealthServiceInterface;

    abstract get IngredientsService(): IngredientsServiceInterface;
}
