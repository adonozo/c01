import { expect } from 'chai';
import { IngredientsDao } from "../../app/dao/dao.memory/ingredients-dao";
import { IngredientsService } from "../../app/core/services/services.impl/ingredients-service";
import { QueryParams } from "../../app/api/models/query-params";
import { Ingredient } from "../../app/core/domain/ingredient";
import { NotFoundException } from "../../app/core/services/interfaces/exceptions/not-found.exception";

describe('IngredientsService', () => {
    const defaultId = 'f5f9551c-3b1b-4903-b125-c6f0b5da13d6';
    const defaultIngredient = (id: string): Ingredient => {
        return {
            id: id,
            name: 'Updated Ingredient',
            description: 'Dummy description',
            type: 'Vegetable'
        }
    };
    let service: IngredientsService;

    beforeEach(() => {
        const dao = new IngredientsDao();
        service = new IngredientsService(dao);
    });

    it('should return a non empty Ingredients array', async () => {
        const ingredients = await service.getIngredients();
        expect(ingredients.length).to.be.greaterThan(0);
    });

    it('should return a non empty Ingredients array on query params', async () => {
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
        const serviceCall = (): Promise<Ingredient> => service.updateIngredient(defaultId, updatedIngredient);
        expect(await serviceCall).to.not.throw(Error)
    });

    it('should remove an ingredient', async () => {
        const ingredients = await service.getIngredients();
        const ingredientsCount = ingredients.length;
        await service.deleteIngredient(defaultId);
        const actualIngredients = await  service.getIngredients();
        const actualLength = actualIngredients.length;
        expect(actualLength).to.be.equal(ingredientsCount - 1);
    });

    it('should throw a Not Found error when the ingredient is not found', async () => {
        try {
            await service.getIngredient('507f1f77bcf86cd799439097');
            expect.fail('Expected error was not thrown');
        } catch (e) {
            expect(e).to.be.instanceOf(NotFoundException);
        }
    });
});
