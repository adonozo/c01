import { ObjectId } from "bson";
import { IngredientType } from "./ingredient-type.enum";

export interface Ingredient {
    _id: ObjectId;
    name: string;
    description: string;
    type: IngredientType;
}
