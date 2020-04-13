import { Ingredient } from "../../core/domain/ingredient";
import { QueryParams } from "../../core/domain/api-rest/query-params";

export interface IngredientsDaoInterface {
    getIngredients(): Promise<Ingredient[]>;

    getIngredients(queryParams: QueryParams): Promise<Ingredient[]>;

    getIngredient(id: string): Promise<Ingredient>;

    saveIngredient(ingredient: Ingredient): Promise<Ingredient>;

    updateIngredient(actualIngredient: Ingredient): Promise<void>;

    deleteIngredient(id: string): Promise<void>;

    ingredientExists(id: string): Promise<boolean>;
}
