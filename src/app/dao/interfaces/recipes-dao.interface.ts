import { Recipe } from "../../core/domain/recipe";
import { QueryParams } from "../../api/models/query-params";

export interface IRecipesDao {
    getRecipes(): Promise<Recipe[]>;

    getRecipes(queryParams: QueryParams): Promise<Recipe[]>;

    getRecipe(id: string): Promise<Recipe>;

    saveRecipe(recipe: Recipe): Promise<Recipe>;

    updateRecipe(actualRecipe: Recipe): Promise<Recipe>;

    deleteRecipe(id: string): Promise<void>;

    recipeExists(id: string): Promise<boolean>;

    // ToDo this must be in services
    //insertIngredient(recipeId: string, ingredient: IngredientMetadata): Promise<Recipe>;
}
