import { Ingredient } from "../../domain/ingredient";
import { QueryParams } from "../../../api/models/query-params";

export interface IIngredientsService {
    getIngredients(): Promise<Ingredient[]>;

    getIngredients(queryParams: QueryParams): Promise<Ingredient[]>;

    getIngredient(id: string): Promise<Ingredient>;

    createIngredient(ingredient: Ingredient): Promise<Ingredient>;

    updateIngredient(id: string, actualIngredient: Ingredient): Promise<Ingredient>;

    deleteIngredient(id: string): Promise<void>;
}
