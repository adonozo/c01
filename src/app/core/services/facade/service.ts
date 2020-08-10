import { IHealthService } from "../interfaces/health-service.interface";
import { IService } from "./service.interface";
import { IIngredientsService } from "../interfaces/ingredients-service.interface";
import { Logger } from "../../../utils/logger";
import { TYPES } from "../../../di/types";
import { inject, injectable } from "inversify";
import { IRecipesService } from "../interfaces/recipes-service";

@injectable()
export class Service implements IService {
    private readonly healthService: IHealthService;
    private readonly ingredientsService: IIngredientsService;
    private readonly recipeService: IRecipesService;
    private logger = Logger.getLogger('Service Implementation');

    public constructor(
        @inject(TYPES.HealthService) healthService: IHealthService,
        @inject(TYPES.IngredientsService) ingredientsService: IIngredientsService,
        @inject(TYPES.RecipeService) recipeService: IRecipesService
    ) {
        this.logger.info('Creating service implementation');
        this.healthService = healthService;
        this.ingredientsService = ingredientsService;
        this.recipeService = recipeService;
    }

    public get HealthService(): IHealthService {
        return this.healthService;
    }

    public get IngredientsService(): IIngredientsService {
        return this.ingredientsService;
    }

    public get RecipeService(): IRecipesService {
        return this.recipeService;
    }
}
