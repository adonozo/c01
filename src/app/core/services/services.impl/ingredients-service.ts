import { IngredientsServiceInterface } from "../interfaces/ingredients-service.interface";
import { DaoFactoryInterface } from "../../../dao/interfaces/dao-factory.interface";
import { IngredientsDaoInterface } from "../../../dao/interfaces/ingredients-dao.interface";
import { Logger } from "../../../utils/logger";
import { Ingredient } from "../../domain/ingredient";
import { QueryParams } from "../../domain/api-rest/query-params";
import { AbstractService } from "./abstract-service";
import * as winston from "winston";
import { NotFoundException } from "../interfaces/exceptions/not-found.exception";
import { ObjectId } from "bson";

export class IngredientsService extends AbstractService implements IngredientsServiceInterface {
    private ingredientsDaoFactory: DaoFactoryInterface<IngredientsDaoInterface>;
    private ingredientsDao: IngredientsDaoInterface;
    private logger = Logger.getLogger('IngredientsService');

    public constructor(ingredientsDaoFactory: DaoFactoryInterface<IngredientsDaoInterface>) {
        super();
        this.logger.info('Creating Ingredients Service');
        this.ingredientsDaoFactory = ingredientsDaoFactory;
        this.ingredientsDao = this.ingredientsDaoFactory.create();
    }

    public get defaultLogger(): winston.Logger {
        return this.logger;
    }

    public getAllIngredients(): Promise<Ingredient[]> {
        return this.handle(() => this.ingredientsDao.getAllIngredients());
    }

    public createIngredient(ingredient: Ingredient): Promise<Ingredient> {
        return this.handle(() => this.ingredientsDao.saveIngredient(ingredient));
    }

    public deleteIngredient(id: string): Promise<void> {
        return this.handle(async () => {
            await this.ingredientExists(id);
            return this.ingredientsDao.deleteIngredient(id);
        });
    }

    public getIngredient(id: string): Promise<Ingredient> {
        return this.handle(async () => {
            await this.ingredientExists(id);
            return this.ingredientsDao.getIngredient(id);
        });
    }

    public getIngredients(queryParams: QueryParams): Promise<Ingredient[]> {
        return this.handle(() => this.ingredientsDao.getIngredients(queryParams));
    }

    public updateIngredient(id: string, actualIngredient: Ingredient): Promise<void> {
        return this.handle(async () => {
            await this.ingredientExists(id);
            actualIngredient._id = new ObjectId(id);
            return this.ingredientsDao.updateIngredient(actualIngredient);
        });
    }

    private async ingredientExists(id: string): Promise<void> {
        const exists = await this.ingredientsDao.ingredientExists(id);
        if (!exists) {
            throw new NotFoundException('Ingredient was not found');
        }
    }
}
