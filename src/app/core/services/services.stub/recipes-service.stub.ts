import { IRecipesService } from "../interfaces/recipes-service";
import { Recipe } from "../../domain/recipe";
import { QueryParams } from "../../../api/models/query-params";
import { RecipeNew } from "../../domain/recipe-new";

export class RecipesServiceStub implements IRecipesService {
    public deleteRecipe(): Promise<void> {
        return Promise.resolve();
    }

    public getRecipe(): Promise<Recipe> {
        return Promise.resolve({
            id: '188461a3-33e8-40b6-82c7-3d0699a7f8fa',
            name: 'Soup',
            description: 'Quick soup',
            ingredients: []
        });
    }

    public getRecipes(): Promise<Recipe[]>;
    public getRecipes(queryParams: QueryParams): Promise<Recipe[]>;
    public getRecipes(): Promise<Recipe[]> {
        return Promise.resolve([]);
    }

    public createRecipe(recipe: RecipeNew): Promise<Recipe> {
        return Promise.resolve(recipe);
    }

    public updateRecipe(id: string, recipe: RecipeNew): Promise<Recipe> {
        return Promise.resolve(recipe);
    }
}
