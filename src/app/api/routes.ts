import { Logger } from "../utils/logger";
import { HealthController } from "./health-controller";
import { IngredientsController } from "./ingredients-controller";
import { Router } from "express";
import { RecipesController } from "./recipes-controller";

export class Routes {
    private logger = Logger.getLogger('Routes');
    private readonly routes: Router;

    public constructor(routes: Router) {
        this.routes = routes;
        this.registerRoutes();
    }

    public get Routes(): Router {
        return this.routes;
    }

    public registerRoutes(): void {
        this.logger.info('Registering Health Controller');
        this.registerHealthRoutes();

        this.logger.info('Registering Ingredients Controller');
        this.registerIngredientsRoutes();

        this.logger.info('Registering Recipes Controller');
        this.registerRecipeRoutes();
    }

    private registerHealthRoutes(): void {
        const healthController = new HealthController();
        this.routes.get('/health', (req, res) => healthController.getHealth(req, res));
    }

    private registerIngredientsRoutes(): void {
        const ingredientsController = new IngredientsController();
        this.routes.get('/ingredients',
            async (req, res) => await ingredientsController.allIngredients(req, res));
        this.routes.get('/ingredients/:id',
            async (req, res) => await ingredientsController.singleIngredient(req, res));
        this.routes.put('/ingredients/:id',
            async (req, res) => await ingredientsController.updateSingleIngredient(req, res));
        this.routes.post('/ingredients',
            async (req, res) => await ingredientsController.newIngredient(req, res));
        this.routes.delete('/ingredients/:id',
            async (req, res) => await ingredientsController.deleteSingleIngredient(req, res));
        this.routes.get('/ingredients/all/types',
            ((req, res) => ingredientsController.getIngredientTypes(res)));
        this.routes.get('/ingredients/all/units',
            ((req, res) => ingredientsController.getIngredientUnits(res)));
    }

    private registerRecipeRoutes(): void {
        const recipesController = new RecipesController();
        this.routes.get('/recipes',
            async (req, res) => await recipesController.allRecipes(req, res));
        this.routes.get('/recipes/:id',
            async (req, res) => await recipesController.singleRecipe(req, res));
        this.routes.put('/recipes/:id',
            async (req, res) => await recipesController.updateSingleRecipe(req, res));
        this.routes.post('/recipes',
            async (req, res) => await recipesController.createRecipe(req, res));
        this.routes.delete('/recipes/:id',
            async (req, res) => await recipesController.deleteSingleRecipe(req, res));
    }
}
