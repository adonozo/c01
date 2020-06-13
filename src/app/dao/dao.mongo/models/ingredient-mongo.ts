import { ObjectId } from "bson";
import { Ingredient } from "../../../core/domain/ingredient";

export class IngredientMongo extends Ingredient {
    public _id: ObjectId;

    public static toIngredient(ingredient: IngredientMongo): Ingredient {
        return {
            id: ingredient.id,
            name: ingredient.name,
            description: ingredient.description,
            type: ingredient.type
        }
    }
}
