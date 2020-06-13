import { IngredientType } from "./enums/ingredient-type.enum";

export class Ingredient {
    public id: string;
    public name: string;
    public description: string;
    public type: IngredientType;
}
