import { Ingredient } from "../../core/domain/ingredient";
import { QueryParams } from "../../api/models/query-params";

export interface IIngredientsDao {
    getIngredients(): Promise<Ingredient[]>;

    getIngredients(queryParams: QueryParams): Promise<Ingredient[]>;

    getIngredient(id: string): Promise<Ingredient>;

    saveIngredient(ingredient: Ingredient): Promise<Ingredient>;

    updateIngredient(actualIngredient: Ingredient): Promise<Ingredient>;

    deleteIngredient(id: string): Promise<void>;

    ingredientExists(id: string): Promise<boolean>;
}
