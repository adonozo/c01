import { Recipe } from "../../domain/recipe";
import { QueryParams } from "../../../api/models/query-params";
import { RecipeNew } from "../../domain/recipe-new";

export interface IRecipesService {
    getRecipes(): Promise<Recipe[]>;

    getRecipes(queryParams: QueryParams): Promise<Recipe[]>;

    getRecipe(id: string): Promise<Recipe>;

    createRecipe(recipe: RecipeNew): Promise<Recipe>;

    updateRecipe(id: string, recipe: RecipeNew): Promise<Recipe>;

    deleteRecipe(id: string): Promise<void>;
}
