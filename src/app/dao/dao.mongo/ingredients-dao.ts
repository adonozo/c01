import { AbstractMongo } from "./abstract-mongo";
import { IIngredientsDao } from "../interfaces/ingredients-dao.interface";
import { Logger } from "../../utils/logger";
import { Ingredient } from "../../core/domain/ingredient";
import { QueryParams } from "../../api/models/query-params";
import { NotFoundException } from "../interfaces/exceptions/not-found.exception";
import { MongoException } from "../interfaces/exceptions/mongo.exception";
import { v4 as uuid } from "uuid";
import { IngredientMongo } from "./models/ingredient-mongo";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import { MongoClient } from "./mongo-client";

@injectable()
export class IngredientsDao extends AbstractMongo implements IIngredientsDao {
    private collectionName = 'ingredients';
    private logger = Logger.getLogger('IngredientsDao');

    public constructor(@inject(TYPES.MongoClient) mongoClient: MongoClient) {
        super(mongoClient);
    }

    public getIngredients(): Promise<Ingredient[]>;
    public getIngredients(queryParams: QueryParams): Promise<Ingredient[]>;

    public async getIngredients(queryParams?: QueryParams): Promise<Ingredient[]> {
        if (!queryParams) {
            this.logger.info(`Getting ingredients from: ${this.collectionName}`);
            const ingredients = await this.runQuery<IngredientMongo, IngredientMongo[]>(async collection => {
                return await collection.find().toArray();
            }, this.collectionName);
            return ingredients.map(ingredient => IngredientMongo.toIngredient(ingredient));
        }

        this.logger.info(`Searching ingredients from supplied params`);
        const ingredients = await this.runQuery<IngredientMongo, IngredientMongo[]>(async collection => {
            const regexExpression = `/.*${escape(queryParams.filter)}.*/`;
            const ingredients = await collection.find({ name: { $regex: regexExpression } })
                .skip(queryParams.pageSize * queryParams.page)
                .limit(queryParams.pageSize)
                .toArray();
            return ingredients === null ? ingredients : Promise.resolve([]);
        }, this.collectionName);
        return ingredients.map(ingredient => IngredientMongo.toIngredient(ingredient));
    }

    public async deleteIngredient(id: string): Promise<void> {
        this.logger.info(`Trying to remove ingredient with ID: ${id}`);
        return await this.runQuery<IngredientMongo, void>(async collection => {
            const result = await collection.deleteOne({ id: id });
            if (!result) {
                throw new MongoException(`Error trying to delete ingredient with ID: ${id}`);
            }
        }, this.collectionName);
    }

    public async getIngredient(id: string): Promise<Ingredient> {
        this.logger.info(`Retrieving ingredient ${id}`);
        const ingredient = await this.runQuery<IngredientMongo, IngredientMongo>(async collection => {
            const ingredient = await collection.findOne({ id: id });
            if (!ingredient) {
                throw new NotFoundException(`Ingredient ${id} not found`);
            }
            return ingredient;
        }, this.collectionName);
        return IngredientMongo.toIngredient(ingredient);
    }

    public async ingredientExists(id: string): Promise<boolean> {
        this.logger.info(`Checking if ingredient with ID ${id} exists`);
        return await this.runQuery<IngredientMongo, boolean>(async collection => {
            const result = await collection.findOne({ id: id });
            return result != null;
        }, this.collectionName);
    }

    public async saveIngredient(ingredient: IngredientMongo): Promise<Ingredient> {
        this.logger.info(`Saving ingredient ${ingredient.name}`);
        return await this.runQuery<IngredientMongo, Ingredient>(async collection => {
            ingredient.id = uuid();
            const result = await collection.insertOne(ingredient);
            if (!result || result.insertedCount === 0) {
                this.logger.error(`Error trying to insert an ingredient`);
                throw new MongoException('Error trying to insert a new ingredient');
            }

            this.logger.info(`Created new ingredient with ID: ${ingredient.id}`);
            delete(ingredient._id);
            return ingredient;
        }, this.collectionName);
    }

    public async updateIngredient(actualIngredient: Ingredient): Promise<Ingredient> {
        this.logger.info(`Updating ingredient with ID ${actualIngredient.id}`);
        return await this.runQuery<IngredientMongo, Ingredient>(async collection => {
            const result = await collection.findOneAndUpdate(
                { id: actualIngredient.id },
                { $set: actualIngredient });
            if (!result || !result.value) {
                this.logger.error('Error trying to update the ingredient');
                throw new MongoException('Error trying to update the ingredient');
            }

            this.logger.info(`Ingredient updated: ${actualIngredient.id}`);
            return result.value;
        }, this.collectionName);
    }
}
