import chai from "chai";
import { IngredientsDao } from "../../app/dao/dao.memory/ingredients-dao";
import { IngredientsService } from "../../app/core/services/services.impl/ingredients-service";
import { QueryParams } from "../../app/core/domain/api-rest/query-params";
import { ObjectID } from "bson";
import { Ingredient } from "../../app/core/domain/ingredient";
import { IngredientType } from "../../app/core/domain/ingredient-type.enum";

const expect = chai.expect;

describe('IngredientsService', () => {
    const defaultId = '507f1f77bcf86cd799439011';
    const defaultIngredient = (id: string): Ingredient => {
        return {
            _id: new ObjectID(id),
            name: 'Updated Ingredient',
            description: 'Dummy description',
            type: IngredientType.vegetable
        }
    };
    let service: IngredientsService;

    beforeEach(() => {
        const dao = new IngredientsDao();
        service = new IngredientsService(dao);
    });

    it('should return a non empty Ingredients array', async () => {
        const ingredients = await service.getAllIngredients();
        expect(ingredients.length).to.be.greaterThan(0);
    });

    it('should return a non empty Ingredients array', async () => {
        const params = QueryParams.defaultParams;
        const ingredients = await service.getIngredients(params);
        expect(ingredients.length).to.be.greaterThan(0);
    });

    it('should return a valid Ingredients object', async () => {
        const ingredient = await service.getIngredient(defaultId);
        expect(ingredient).to.have.any.keys('id', 'name', 'description', 'type');
    });

    it('should not throw an error updating an Ingredient', async () => {
        const updatedIngredient: Ingredient = defaultIngredient(defaultId);
        const serviceCall = (): Promise<void> => service.updateIngredient(defaultId, updatedIngredient);
        expect(await serviceCall).to.not.throw(Error)
    });

    it('should remove an ingredient', async () => {
        const ingredients = await service.getAllIngredients();
        const ingredientsCount = ingredients.length;
        await service.deleteIngredient(defaultId);
        const actualIngredients = await  service.getAllIngredients();
        const actualLength = actualIngredients.length;
        expect(actualLength).to.be.equal(ingredientsCount - 1);
    });

    it('should throw a Not Found error when the ingredient is not found', async () => {
        try {
            await service.getIngredient('507f1f77bcf86cd799439097');
            expect.fail('Expected error was not thrown');
        } catch (e) {
            expect(e.name).to.be.equal('NotFound');
        }
    });
});
