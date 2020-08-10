import { AbstractMongo } from "./abstract-mongo";
import { IRecipesDao } from "../interfaces/recipes-dao.interface";
import { Recipe } from "../../core/domain/recipe";
import { QueryParams } from "../../api/models/query-params";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import { MongoClient } from "./mongo-client";
import { Logger } from "../../utils/logger";
import { RecipeMongo } from "./models/recipe-mongo";
import { NotFoundException } from "../interfaces/exceptions/not-found.exception";
import { IngredientMongo } from "./models/ingredient-mongo";
import { MongoException } from "../interfaces/exceptions/mongo.exception";
import { v4 as uuid } from "uuid";

@injectable()
export class RecipesDao extends AbstractMongo implements IRecipesDao {
    private collectionName = 'recipes';
    private logger = Logger.getLogger('RecipesDao');
    
    public constructor(@inject(TYPES.MongoClient) mongoClient: MongoClient) {
        super(mongoClient);
    }
    
    public async deleteRecipe(id: string): Promise<void> {
        this.logger.info(`Trying to delete recipe with ID: ${id}`);
        await this.runQuery<IngredientMongo, void>(async collection => {
            const result = await collection.deleteOne({ id: id });
            if (!result) {
                throw new MongoException(`Error trying to delete recipe with ID: ${id}`);
            }
        }, this.collectionName);
    }

    public async getRecipe(id: string): Promise<Recipe> {
        this.logger.info(`Getting recipe with ID: ${id}`);
        const recipe = await this.runQuery<RecipeMongo, RecipeMongo>(async collection => {
            const recipe = await collection.findOne({ id: id });
            if (!recipe) {
                throw new NotFoundException(`Recipe with ID ${id} not found`);
            }

            return recipe;
        }, this.collectionName);
        this.logger.info(`Found: ${recipe.name}`);
        return RecipeMongo.toRecipe(recipe);
    }

    public getRecipes(): Promise<Recipe[]>;
    public getRecipes(queryParams: QueryParams): Promise<Recipe[]>;

    public async getRecipes(queryParams?: QueryParams): Promise<Recipe[]> {
        if (!queryParams) {
            this.logger.info('Getting all recipes');
            const recipes = await this.runQuery<RecipeMongo, RecipeMongo[]>(async collection => {
                return await collection.find().toArray();
            }, this.collectionName);
            return recipes.map(RecipeMongo.toRecipe);
        }

        this.logger.info('Searching recipes with supplied params');
        const recipes = await this.runQuery<RecipeMongo, RecipeMongo[]>(async collection => {
            const regexExpression = `/.*${escape(queryParams.filter)}.*/`;
            const recipes = await collection.find({ name: { $regex: regexExpression } })
                .skip(queryParams.pageSize * queryParams.page)
                .limit(queryParams.pageSize)
                .toArray();
            return recipes === null ? recipes : Promise.resolve([]);
        }, this.collectionName);
        return recipes.map(RecipeMongo.toRecipe);
    }

    public async recipeExists(id: string): Promise<boolean> {
        this.logger.info(`Checking if recipe with ID: ${id} exists.`);
        return await this.runQuery<RecipeMongo, boolean>(async collection => {
            const result = await collection.findOne({ id: id });
            return !!result;
        }, this.collectionName);
    }

    public async saveRecipe(recipe: Recipe): Promise<Recipe> {
        this.logger.info(`Saving recipe: ${recipe.name}`);
        const mongoRecipe = await this.runQuery<RecipeMongo, RecipeMongo>(async collection => {
            recipe.id = uuid();
            const mongoRecipe = RecipeMongo.toRecipeMongo(recipe)
            const result = await collection.insertOne(mongoRecipe);
            if (!result || result.insertedCount == 0) {
                this.logger.error(`Error trying to insert a recipe`);
                throw new MongoException('Error trying to insert a new recipe');
            }

            return mongoRecipe;
        }, this.collectionName);
        this.logger.info(`Created recipe: ${mongoRecipe.name}`);
        return RecipeMongo.toRecipe(mongoRecipe);
    }

    public async updateRecipe(actualRecipe: Recipe): Promise<Recipe> {
        this.logger.info(`Updating recipe with ID: ${actualRecipe.id}`);
        const result = await this.runQuery<RecipeMongo, RecipeMongo>(async collection => {
            const result = await collection.findOneAndUpdate(
                { id: actualRecipe.id },
                { $set: {
                        name: actualRecipe.name,
                        description: actualRecipe.description
                    }
                });
            if (!result || !result.value) {
                this.logger.error('Error trying to update the recipe');
                throw new MongoException('Error trying to update the recipe');
            }

            const updatedRecipe = await collection.findOne({ id: actualRecipe.id });
            if (!updatedRecipe) {
                throw new NotFoundException('Error trying to update the recipe');
            }

            return updatedRecipe;
        }, this.collectionName);
        this.logger.info(`Updated recipe: ${actualRecipe.id}`);
        return RecipeMongo.toRecipe(result);
    }
    
}
