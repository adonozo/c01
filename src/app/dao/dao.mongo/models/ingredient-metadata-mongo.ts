import { IngredientUnit } from "../../../core/domain/enums/ingredient-unit.enum";
import { IngredientMetadata } from "../../../core/domain/ingredient-metadata";

export class MongoIngredientMetadata {
    id: string;
    quantity: number;
    unit: IngredientUnit;

    public static toMongoIngredient(ingredient: IngredientMetadata | MongoIngredientMetadata): MongoIngredientMetadata {
        const result = new MongoIngredientMetadata();
        if (MongoIngredientMetadata.isMongoIngredient(ingredient)) {
            result.id = ingredient.id;
        } else {
            result.id = ingredient.ingredient.id;
        }

        result.quantity = ingredient.quantity;
        result.unit = ingredient.unit;
        return result;
    }

    public static isMongoIngredient(ingredient: IngredientMetadata | MongoIngredientMetadata):
        ingredient is MongoIngredientMetadata {
        return (ingredient as MongoIngredientMetadata).id !== undefined;
    }
}
