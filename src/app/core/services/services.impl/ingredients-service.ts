import { IIngredientsService } from "../interfaces/ingredients-service.interface";
import { IIngredientsDao } from "../../../dao/interfaces/ingredients-dao.interface";
import { Logger } from "../../../utils/logger";
import { Ingredient } from "../../domain/ingredient";
import { QueryParams } from "../../../api/models/query-params";
import { AbstractService } from "./abstract-service";
import * as winston from "winston";
import { NotFoundException } from "../interfaces/exceptions/not-found.exception";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";

@injectable()
export class IngredientsService extends AbstractService implements IIngredientsService {
    private ingredientsDao: IIngredientsDao;
    private logger = Logger.getLogger('IngredientsService');

    public constructor(@inject(TYPES.IngredientsDao) ingredientsDao: IIngredientsDao) {
        super();
        this.logger.info('Creating Ingredients Service');
        this.ingredientsDao = ingredientsDao;
    }

    public get defaultLogger(): winston.Logger {
        return this.logger;
    }

    public getIngredients(): Promise<Ingredient[]>
    public getIngredients(queryParams: QueryParams): Promise<Ingredient[]>

    public async getIngredients(queryParams?: QueryParams): Promise<Ingredient[]> {
        if (!queryParams) {
            return this.handle(async () => await this.ingredientsDao.getIngredients());
        }

        return this.handle(async () => await this.ingredientsDao.getIngredients(queryParams));
    }

    public async createIngredient(ingredient: Ingredient): Promise<Ingredient> {
        return this.handle(async () => await this.ingredientsDao.saveIngredient(ingredient));
    }

    public async deleteIngredient(id: string): Promise<void> {
        return this.handle(async () => {
            await this.ingredientExists(id);
            return this.ingredientsDao.deleteIngredient(id);
        });
    }

    public async getIngredient(id: string): Promise<Ingredient> {
        return this.handle(async () => {
            await this.ingredientExists(id);
            return this.ingredientsDao.getIngredient(id);
        });
    }

    public async updateIngredient(id: string, actualIngredient: Ingredient): Promise<Ingredient> {
        return this.handle(async () => {
            await this.ingredientExists(id);
            actualIngredient.id = id;
            return await this.ingredientsDao.updateIngredient(actualIngredient);
        });
    }

    private async ingredientExists(id: string): Promise<void> {
        const exists = await this.ingredientsDao.ingredientExists(id);
        if (!exists) {
            throw new NotFoundException('Ingredient was not found');
        }
    }
}
