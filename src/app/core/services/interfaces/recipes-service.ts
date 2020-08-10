import { Recipe } from "../../domain/recipe";
import { QueryParams } from "../../../api/models/query-params";

export interface IRecipesService {
    getRecipes(): Promise<Recipe[]>;

    getRecipes(queryParams: QueryParams): Promise<Recipe[]>;

    getRecipe(id: string): Promise<Recipe>;

    createRecipe(recipe: Recipe): Promise<Recipe>;

    updateRecipe(id: string, recipe: Recipe): Promise<Recipe>;

    deleteRecipe(id: string): Promise<void>;

    // TODO implement...
    //insertIngredient(recipeId: string, ingredient: IngredientMetadata): Promise<Recipe>;
}
