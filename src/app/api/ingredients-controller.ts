import { AbstractController } from "./abstract-controller";
import { Logger } from "../utils/logger";
import { Ingredient } from "../core/domain/ingredient";
import * as winston from "winston";

export class IngredientsController extends AbstractController {
    private logger = Logger.getLogger('IngredientsController');

    protected getLogger(): winston.Logger {
        return this.logger;
    }

    public register(): void {
        const logger = Logger.getLogger('IngredientsController');
        logger.info('Registering Ingredients Controller');
        this.app.get(`${this.apiVersion}/ingredients`, async (req, res) => {
            this.executePromise(req, res, async () => {
                const result = await this.getIngredients();
                res.status(200).send(result);
            })
        });

        this.app.get(`${this.apiVersion}/ingredients/:id`, async (req, res) => {
            this.executePromise(req, res, async () => {
                const result = await this.getIngredient(req.params.id);
                res.status(200).send(result);
            })
        });

        this.app.patch(`${this.apiVersion}/ingredients/:id`, async (req, res) => {
            this.executePromise(req, res, async () => {
                await this.updateIngredient(req.params.id, req.body);
                res.status(204).send();
            });
        });

        this.app.delete(`${this.apiVersion}/ingredients/:id`, async (req, res) => {
            this.executePromise(req, res, async() => {
                await this.deleteIngredient(req.params.id);
                res.status(204).send();
            });
        });

        this.app.post(`${this.apiVersion}/ingredients`, async (req, res) => {
            this.executePromise(req, res, async () => {
                const result = await this.postIngredient(req.body);
                res.status(201).send(result);
            });
        })
    }

    public async getIngredients(): Promise<Ingredient[]> {
        const ingredientsService = this.service.IngredientsService;
        const ingredients = await ingredientsService.getAllIngredients();
        this.logger.info(`Found ${ingredients.length} ingredients`);
        return ingredients;
    }

    public async getIngredient(id: string): Promise<Ingredient> {
        this.logger.info(`Trying to get ingredient with ID: ${id}`);
        const ingredientsService = this.service.IngredientsService;
        const ingredient = await ingredientsService.getIngredient(id);
        this.logger.info(`Found ${ingredient.name}`);
        return ingredient;
    }

    public async updateIngredient(id: string, ingredient: Ingredient): Promise<void> {
        this.logger.info(`Trying to update ingredient with ID: ${id}`);
        const ingredientService = this.service.IngredientsService;
        await ingredientService.updateIngredient(id, ingredient);
        this.logger.info(`Ingredient with ID: ${id} updated`);
    }

    public async deleteIngredient(id: string): Promise<void> {
        this.logger.info(`Trying to delete ingredient with ID: ${id}`);
        const ingredientsService = this.service.IngredientsService;
        await ingredientsService.deleteIngredient(id);
        this.logger.info(`Ingredient with ID ${id} deleted`);
    }

    public async postIngredient(ingredient: Ingredient): Promise<Ingredient> {
        this.logger.info(`Insert new ingredient`);
        const ingredientService = this.service.IngredientsService;
        const newIngredient = await ingredientService.createIngredient(ingredient);
        this.logger.info(`Ingredient created with ID ${ingredient._id}`);
        return newIngredient;
    }
}
