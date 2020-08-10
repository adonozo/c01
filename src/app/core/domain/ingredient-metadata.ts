import { Ingredient } from "./ingredient";
import { IngredientUnit } from "./enums/ingredient-unit.enum";

export interface IngredientMetadata {
    quantity: number;
    unit: IngredientUnit;
    ingredient: Ingredient;
}
