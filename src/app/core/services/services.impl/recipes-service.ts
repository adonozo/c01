import { IRecipesService } from "../interfaces/recipes-service";
import { Recipe } from "../../domain/recipe";
import { QueryParams } from "../../../api/models/query-params";
import { inject, injectable } from "inversify";
import { IRecipesDao } from "../../../dao/interfaces/recipes-dao.interface";
import { Logger } from "../../../utils/logger";
import { AbstractService } from "./abstract-service";
import * as winston from "winston";
import { TYPES } from "../../../di/types";
import { NotFoundException } from "../interfaces/exceptions/not-found.exception";

@injectable()
export class RecipesService extends AbstractService implements IRecipesService {
    private recipeDao: IRecipesDao;
    private logger = Logger.getLogger('RecipesService');

    public constructor(@inject(TYPES.RecipeDao) recipeDao: IRecipesDao) {
        super();
        this.logger.info('Creating Recipe Service');
        this.recipeDao = recipeDao;
    }

    public get defaultLogger(): winston.Logger {
        return this.logger;
    }

    public async createRecipe(recipe: Recipe): Promise<Recipe> {
        return this.handle(async () => await this.recipeDao.saveRecipe(recipe));
    }

    public async deleteRecipe(id: string): Promise<void> {
        return this.handle(async () => {
            await this.recipeExists(id);
            return this.recipeDao.deleteRecipe(id)
        });
    }

    public async getRecipe(id: string): Promise<Recipe> {
        return this.handle(async () => {
            await this.recipeExists(id);
            return await this.recipeDao.getRecipe(id)
        });
    }

    public getRecipes(): Promise<Recipe[]>;
    public getRecipes(queryParams: QueryParams): Promise<Recipe[]>;
    public async getRecipes(queryParams?: QueryParams): Promise<Recipe[]> {
        if (!queryParams) {
            return this.handle(async () => await this.recipeDao.getRecipes());
        }
        return this.handle(async () => await this.recipeDao.getRecipes(queryParams));
    }

    public async updateRecipe(id: string, recipe: Recipe): Promise<Recipe> {
        return this.handle(async () => {
            await this.recipeExists(id);
            recipe.id = id;
            return await this.recipeDao.updateRecipe(recipe);
        });
    }

    private async recipeExists(id: string): Promise<void> {
        const exists = await this.recipeDao.recipeExists(id);
        if (!exists) {
            throw new NotFoundException(`Recipe ${id} doesn't exists`);
        }
    }
}
