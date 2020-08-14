import { AbstractController } from "./abstract-controller";
import winston from "winston";
import { Logger } from "../utils/logger";
import { Recipe } from "../core/domain/recipe";
import { Request, Response } from "express";
import { StatusCodes } from "./enums/status-codes.enum";
import { RecipeNew } from "../core/domain/recipe-new";

export class RecipesController extends AbstractController {
    private logger = Logger.getLogger('RecipesController');

    protected getLogger(): winston.Logger {
        return this.logger;
    }

    public async allRecipes(request: Request, response: Response): Promise<void> {
        await this.handle(response, async () => {
            const recipes = await this.getRecipes();
            response.status(StatusCodes.OK).send(recipes);
        });
    }

    public async singleRecipe(request: Request, response: Response): Promise<void> {
        await this.handle(response, async () => {
            const recipe = await this.getRecipe(request.params.id);
            response.status(StatusCodes.OK).send(recipe);
        });
    }

    public async updateSingleRecipe(request: Request, response: Response): Promise<void> {
        await this.handle(response, async () => {
            const recipe = await this.updateRecipe(request.params.id, request.body);
            response.status(StatusCodes.OK).send(recipe);
        });
    }

    public async createRecipe(request: Request, response: Response): Promise<void> {
        await this.handle(response, async () => {
            const recipe = await this.postRecipe(request.body);
            response.status(StatusCodes.CREATED).send(recipe);
        });
    }

    public async deleteSingleRecipe(request: Request, response: Response): Promise<void> {
        await this.handle(response, async () => {
            await this.deleteRecipe(request.params.id);
            response.status(StatusCodes.NO_CONTENT).send();
        });
    }

    private async getRecipes(): Promise<Recipe[]> {
        const recipeService = this.service.RecipeService;
        const recipes = await recipeService.getRecipes();
        this.logger.info(`Found ${recipes.length} recipes`);
        return recipes;
    }

    private async getRecipe(id: string): Promise<Recipe> {
        this.logger.info(`Trying to get recipe with ID: ${id}`);
        const recipeService = this.service.RecipeService;
        const recipe = await recipeService.getRecipe(id);
        this.logger.info(`Found recipe: ${recipe.name}`);
        return recipe;
    }

    private async updateRecipe(id: string, recipe: RecipeNew): Promise<Recipe> {
        this.logger.info(`Trying to update recipe with ID: ${id}`);
        const recipeService = this.service.RecipeService;
        const updatedRecipe = await recipeService.updateRecipe(id, recipe);
        this.logger.info(`Updated recipe: ${recipe.name}`);
        return updatedRecipe;
    }

    private async postRecipe(recipe: RecipeNew): Promise<Recipe> {
        this.logger.info(`Inserting new recipe`);
        const recipeService = this.service.RecipeService;
        const createRecipe = await recipeService.createRecipe(recipe);
        this.logger.info(`Created recipe with ID ${createRecipe.id}`);
        return createRecipe;
    }

    private async deleteRecipe(id: string): Promise<void> {
        this.logger.info(`Trying to delete recipe with ID: ${id}`);
        const recipeService = this.service.RecipeService;
        await recipeService.deleteRecipe(id);
        this.logger.info(`Recipe with ID: ${id} deleted`);
    }
}
