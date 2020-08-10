import { IHealthService } from "../interfaces/health-service.interface";
import { IIngredientsService } from "../interfaces/ingredients-service.interface";
import { IRecipesService } from "../interfaces/recipes-service";

export interface IService {
    HealthService: IHealthService;

    IngredientsService: IIngredientsService;

    RecipeService: IRecipesService;
}
