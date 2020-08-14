import { Recipe } from "../../core/domain/recipe";
import { QueryParams } from "../../api/models/query-params";
import { RecipeNew } from "../../core/domain/recipe-new";

export interface IRecipesDao {
    getRecipes(): Promise<Recipe[]>;

    getRecipes(queryParams: QueryParams): Promise<Recipe[]>;

    getRecipe(id: string): Promise<Recipe>;

    saveRecipe(recipe: RecipeNew): Promise<Recipe>;

    updateRecipe(actualRecipe: RecipeNew): Promise<Recipe>;

    deleteRecipe(id: string): Promise<void>;

    recipeExists(id: string): Promise<boolean>;
}
