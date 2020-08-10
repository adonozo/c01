import { IngredientMetadata } from "./ingredient-metadata";

export class Recipe {
    public id: string;
    public name: string;
    public description: string;
    ingredients: IngredientMetadata[];
}
