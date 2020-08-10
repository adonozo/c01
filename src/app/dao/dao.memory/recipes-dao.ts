import { IRecipesDao } from "../interfaces/recipes-dao.interface";
import { Recipe } from "../../core/domain/recipe";
import { QueryParams } from "../../api/models/query-params";
import { NotFoundException } from "../interfaces/exceptions/not-found.exception";
import { v4 as uuid } from "uuid";

export class RecipesDao implements IRecipesDao {
    private recipes: Recipe[];

    public constructor() {
        this.recipes = RecipesDao.getDummyRecipes();
    }

    public deleteRecipe(id: string): Promise<void> {
        try {
            const index = this.recipes.findIndex(recipe => recipe.id === id);
            this.recipes = this.recipes.slice(index, 1);
            return Promise.resolve();
        } catch (exception) {
            throw new NotFoundException('Ingredient not found');
        }
    }

    public getRecipe(id: string): Promise<Recipe> {
        const recipe = this.recipes.find(recipe => recipe.id === id);
        if (recipe) {
            return Promise.resolve(recipe);
        }

        throw new NotFoundException('Ingredient not found');
    }

    public getRecipes(): Promise<Recipe[]>;
    public getRecipes(queryParams: QueryParams): Promise<Recipe[]>;

    public getRecipes(queryParams?: QueryParams): Promise<Recipe[]> {
        if (!queryParams) {
            return Promise.resolve(this.recipes);
        }

        const filter = queryParams.filter;
        const result = this.recipes.filter(recipe => recipe.name.toLowerCase().match(filter));
        return Promise.resolve(result);
    }

    public recipeExists(id: string): Promise<boolean> {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        return Promise.resolve(index >= 0);
    }

    public saveRecipe(recipe: Recipe): Promise<Recipe> {
        recipe.id = uuid();
        return Promise.resolve(recipe);
    }

    public updateRecipe(actualRecipe: Recipe): Promise<Recipe> {
        const index = this.recipes.findIndex(recipe => recipe.id === actualRecipe.id);
        this.recipes[index] = actualRecipe;
        return Promise.resolve(actualRecipe);
    }

    private static getDummyRecipes(): Recipe[] {
        return [
            {
                id: '188461a3-33e8-40b6-82c7-3d0699a7f8fa',
                name: 'Soup',
                description: 'Quick soup',
                ingredients: []
            },
            {
                id: '2c4a6919-03b5-459a-bdee-11abe8e93800',
                name: 'Salad',
                description: 'Quick salad',
                ingredients: []
            }
        ]
    }
}
