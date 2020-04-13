import { AbstractController } from "./abstract-controller";
import { Logger } from "../utils/logger";
import { Ingredient } from "../core/domain/ingredient";
import { Request, Response } from "express";
import * as winston from "winston";

export class IngredientsController extends AbstractController {
    private logger = Logger.getLogger('IngredientsController');

    protected getLogger(): winston.Logger {
        return this.logger;
    }

    public allIngredients(request: Request, response: Response): void {
        this.executePromise(request, response, async () => {
            const result = await this.getIngredients();
            response.status(200).send(result);
        })
    }

    public singleIngredient(request: Request, response: Response): void {
        this.executePromise(request, response, async () => {
            const result = await this.getIngredient(request.params.id);
            response.status(200).send(result);
        })
    }

    public updateSingleIngredient(request: Request, response: Response): void {
        this.executePromise(request, response, async () => {
            await this.updateIngredient(request.params.id, request.body);
            response.status(204).send();
        });
    }

    public newIngredient(request: Request, response: Response): void {
        this.executePromise(request, response, async () => {
            const result = await this.postIngredient(request.body);
            response.status(201).send(result);
        });
    }

    public deleteSingleIngredient(request: Request, response: Response): void {
        this.executePromise(request, response, async() => {
            await this.deleteIngredient(request.params.id);
            response.status(204).send();
        });
    }

    private async getIngredients(): Promise<Ingredient[]> {
        const ingredientsService = this.service.IngredientsService;
        const ingredients = await ingredientsService.getAllIngredients();
        this.logger.info(`Found ${ingredients.length} ingredients`);
        return ingredients;
    }

    private async getIngredient(id: string): Promise<Ingredient> {
        this.logger.info(`Trying to get ingredient with ID: ${id}`);
        const ingredientsService = this.service.IngredientsService;
        const ingredient = await ingredientsService.getIngredient(id);
        this.logger.info(`Found ${ingredient.name}`);
        return ingredient;
    }

    private async updateIngredient(id: string, ingredient: Ingredient): Promise<void> {
        this.logger.info(`Trying to update ingredient with ID: ${id}`);
        const ingredientService = this.service.IngredientsService;
        await ingredientService.updateIngredient(id, ingredient);
        this.logger.info(`Ingredient with ID: ${id} updated`);
    }

    private async deleteIngredient(id: string): Promise<void> {
        this.logger.info(`Trying to delete ingredient with ID: ${id}`);
        const ingredientsService = this.service.IngredientsService;
        await ingredientsService.deleteIngredient(id);
        this.logger.info(`Ingredient with ID ${id} deleted`);
    }

    private async postIngredient(ingredient: Ingredient): Promise<Ingredient> {
        this.logger.info(`Insert new ingredient`);
        const ingredientService = this.service.IngredientsService;
        const newIngredient = await ingredientService.createIngredient(ingredient);
        this.logger.info(`Ingredient created with ID ${ingredient._id}`);
        return newIngredient;
    }
}
