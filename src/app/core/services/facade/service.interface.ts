import { IHealthService } from "../interfaces/health-service.interface";
import { IIngredientsService } from "../interfaces/ingredients-service.interface";

export interface IService {
    HealthService: IHealthService;

    IngredientsService: IIngredientsService;
}
