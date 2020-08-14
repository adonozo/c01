import { AbstractController } from "./abstract-controller";
import { Logger } from "../utils/logger";
import { Ingredient } from "../core/domain/ingredient";
import { Request, Response } from "express";
import * as winston from "winston";
import { StatusCodes } from "./enums/status-codes.enum";
import { IngredientType } from "../core/domain/enums/ingredient-type.enum";
import { EnumUtils } from "../core/utils/enum-utils";
import { IngredientUnit } from "../core/domain/enums/ingredient-unit.enum";

export class IngredientsController extends AbstractController {
    private logger = Logger.getLogger('IngredientsController');

    protected getLogger(): winston.Logger {
        return this.logger;
    }

    public async allIngredients(request: Request, response: Response): Promise<void> {
        await this.handle(response, async () => {
            const result = await this.getIngredients();
            response.status(StatusCodes.OK).send(result);
        });
    }

    public async singleIngredient(request: Request, response: Response): Promise<void> {
        await this.handle(response, async () => {
            const result = await this.getIngredient(request.params.id);
            response.status(StatusCodes.OK).send(result);
        })
    }

    public async updateSingleIngredient(request: Request, response: Response): Promise<void> {
        await this.handle(response, async () => {
            const result = await this.updateIngredient(request.params.id, request.body);
            response.status(StatusCodes.NO_CONTENT).send(result);
        });
    }

    public async newIngredient(request: Request, response: Response): Promise<void> {
        await this.handle(response, async () => {
            const result = await this.postIngredient(request.body);
            response.status(StatusCodes.CREATED).send(result);
        });
    }

    public async deleteSingleIngredient(request: Request, response: Response): Promise<void> {
        await this.handle(response, async () => {
            await this.deleteIngredient(request.params.id);
            response.status(StatusCodes.NO_CONTENT).send();
        });
    }

    public getIngredientTypes(response: Response): void {
        const ingredients = EnumUtils.enumToArray(IngredientType);
        response.status(StatusCodes.OK).send(ingredients);
    }

    public getIngredientUnits(response: Response): void {
        const units = EnumUtils.enumToArray(IngredientUnit);
        response.status(StatusCodes.OK).send(units);
    }

    private async getIngredients(): Promise<Ingredient[]> {
        const ingredientsService = this.service.IngredientsService;
        const ingredients = await ingredientsService.getIngredients();
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
        this.logger.info(`Ingredient created with ID ${ingredient.id}`);
        return newIngredient;
    }
}
