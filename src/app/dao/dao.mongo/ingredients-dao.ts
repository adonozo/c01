import { AbstractMongo } from "./abstract-mongo";
import { IngredientsDaoInterface } from "../interfaces/ingredients-dao.interface";
import { DaoFactoryInterface } from "../interfaces/dao-factory.interface";
import { Logger } from "../../utils/logger";
import { Ingredient } from "../../core/domain/ingredient";
import { QueryParams } from "../../core/domain/api-rest/query-params";
import { ObjectId } from "bson";
import { NotFoundException } from "../interfaces/exceptions/not-found.exception";
import { MongoException } from "../interfaces/exceptions/mongo.exception";

export class IngredientsDao extends AbstractMongo
    implements IngredientsDaoInterface, DaoFactoryInterface<IngredientsDao> {
    private collectionName = 'ingredients';
    private ingredientsLogger = Logger.getLogger('IngredientsDao');

    public create(): IngredientsDao {
        this.ingredientsLogger.info(`Creating ingredients dao`);
        return new IngredientsDao();
    }

    public getAllIngredients(): Promise<Ingredient[]> {
        this.ingredientsLogger.info(`Getting ingredients from: ${this.collectionName}`);
        return this.executeQuery<Ingredient[]>(collection => {
            return collection.find<Ingredient>({}).toArray();
        }, this.collectionName);
    }

    public deleteIngredient(id: string): Promise<void> {
        this.ingredientsLogger.info(`Trying to remove ingredient with ID: ${id}`);
        const deleteAction = (error: Error): void => {
            if (error) {
                this.ingredientsLogger.error(`Error trying to delete the ingredient: ${error.stack}`);
                throw new MongoException('Error trying to insert a new ingredient');
            }
            this.ingredientsLogger.info(`Ingredient with ID: ${id} removed`);
        };
        return this.executeVoidQuery<Ingredient[]>(collection => {
            return collection.deleteOne({ _id: new ObjectId(id) }, deleteAction);
        }, this.collectionName);
    }

    public getIngredient(id: string): Promise<Ingredient> {
        this.ingredientsLogger.info(`Retrieving ingredient ${id}`);
        return this.executeQuery<Ingredient>(async collection => {
            const ingredient = await collection.findOne({ _id: new ObjectId(id) });
            if (ingredient !== null) {
                return ingredient;
            }
            throw new NotFoundException(`Ingredient ${id} not found`);
        }, this.collectionName);
    }

    public getIngredients(queryParams: QueryParams): Promise<Ingredient[]> {
        this.ingredientsLogger.info(`Searching ingredients for supplied params`);
        return this.executeQuery<Ingredient[]>(async collection => {
            const regexExpression = new RegExp(escape(queryParams.filter));
            const ingredients = await collection.find({ name: regexExpression })
                .skip(queryParams.pageSize * queryParams.page)
                .limit(queryParams.pageSize);
            return ingredients === null ? ingredients : Promise.resolve([]);
        }, this.collectionName);
    }

    public async ingredientExists(id: string): Promise<boolean> {
        this.ingredientsLogger.info(`Checking if ingredient with ID ${id} exists`);
        const ingredientFound = await this.executeQuery(collection => {
            return collection.findOne({ _id: new ObjectId(id) });
        }, this.collectionName);
        return ingredientFound !== null;
    }

    public saveIngredient(ingredient: Ingredient): Promise<Ingredient> {
        this.ingredientsLogger.info(`Saving ingredient ${ingredient.name}`);
        return this.executeQuery(async collection => {
            await collection.insertOne(ingredient, error => {
                if (error) {
                    this.ingredientsLogger.error(`Error trying to insert an ingredient: ${error.stack}`);
                    throw new MongoException('Error trying to insert a new ingredient');
                }
            });
            this.ingredientsLogger.info(`Created new ingredient with ID: ${ingredient._id}`);
            return ingredient;
        }, this.collectionName);
    }

    public updateIngredient(actualIngredient: Ingredient): Promise<void> {
        this.ingredientsLogger.info(`Updating ingredient with ID ${actualIngredient._id}`);
        const updateAction = (error: Error): void => {
            if (error) {
                this.ingredientsLogger.error(`Error trying to update the ingredient: ${error.stack}`);
                throw new MongoException('Error trying to update the ingredient');
            }
            this.ingredientsLogger.info(`Ingredient with ID: ${actualIngredient._id} updated`);
        };
        return this.executeVoidQuery(collection => {
            return collection.findOneAndReplace(
                { _id: new ObjectId(actualIngredient._id) },
                actualIngredient,
                updateAction)
        }, this.collectionName);
    }
}
