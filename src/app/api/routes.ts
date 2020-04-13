import { Logger } from "../utils/logger";
import { HealthController } from "./health-controller";
import { IngredientsController } from "./ingredients-controller";
import { Router } from "express";

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
        this.registerIngredientsRoutes()
    }

    private registerHealthRoutes(): void {
        const healthController = new HealthController(this.routes);
        this.routes.get('/health', (req, res) => healthController.getHealth(req, res));
    }

    private registerIngredientsRoutes(): void {
        const ingredientsController = new IngredientsController(this.Routes);
        this.routes.get('/ingredients',
            (req, res) => ingredientsController.allIngredients(req, res));
        this.routes.get('/ingredients/:id',
            (req, res) => ingredientsController.singleIngredient(req, res));
        this.routes.put('/ingredients/:id',
            (req, res) => ingredientsController.updateSingleIngredient(req, res));
        this.routes.post('/ingredients',
            (req, res) => ingredientsController.newIngredient(req, res));
        this.routes.delete('/ingredients/:id',
            (req, res) => ingredientsController.deleteSingleIngredient(req, res));
    }
}
