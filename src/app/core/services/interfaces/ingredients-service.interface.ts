import { Ingredient } from "../../domain/ingredient";
import { QueryParams } from "../../domain/api-rest/query-params";

export interface IngredientsServiceInterface {
    getIngredients(): Promise<Ingredient[]>;

    getIngredients(queryParams: QueryParams): Promise<Ingredient[]>;

    getIngredient(id: string): Promise<Ingredient>;

    createIngredient(ingredient: Ingredient): Promise<Ingredient>;

    updateIngredient(id: string, actualIngredient: Ingredient): Promise<void>;

    deleteIngredient(id: string): Promise<void>;
}
