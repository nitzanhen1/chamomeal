const assert = require('assert');
const request = require('supertest');
const sinon = require('sinon');
const app = require('../main');
const db = require('../data/db_utils');



describe('Search Test', () => {

    after(() => {
        // Stop the server after running the tests
        process.exit();
    });

    afterEach(() => {
        sinon.restore();
    });

    app.request.session = { user_id: 1 }

    describe('GET /search', () => {

        const recipe1 = {"recipe_id": 1};
        const recipe2 = {"recipe_id": 2};

        const req1 = {
            searchQuery: "pasta",
            onlyIngredients: 0,
            without_lactose: 0,
            gluten_free: 0,
            vegan: 0,
            vegetarian: 0,
            kosher: 0,
            breakfast: 1,
            lunch: 1,
            dinner: 1
        }

        const req2 = {
            searchQuery: "pasta",
            onlyIngredients: 1,
            without_lactose: 0,
            gluten_free: 0,
            vegan: 0,
            vegetarian: 0,
            kosher: 0,
            breakfast: 1,
            lunch: 1,
            dinner: 1
        }

        const req3 = {
            searchQuery: "",
            onlyIngredients: 1,
            without_lactose: 0,
            gluten_free: 0,
            vegan: 0,
            vegetarian: 0,
            kosher: 0,
            breakfast: 1,
            lunch: 1,
            dinner: 1
        }


        it('should return search results 1', async () => {

            const searchResults1 = [{recipe_id: 1, isFavorite: true},{recipe_id: 2, isFavorite: false}]

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([recipe1]);
            execQueryStub.onCall(2).resolves([recipe2]);
            execQueryStub.onCall(3).resolves([recipe2]);
            execQueryStub.onCall(4).resolves([recipe1]);

            const response = await request(app).get('/search').query(req1).send();
            assert.strictEqual(response.status, 200);
            assert.deepStrictEqual(response.body, searchResults1);
        });

        it('should return search results 2', async () => {

            const searchResults2 = [{recipe_id: 2, isFavorite: false}]

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([recipe2]);
            execQueryStub.onCall(2).resolves([recipe2]);
            execQueryStub.onCall(3).resolves([]);

            const response = await request(app).get('/search').query(req2).send();
            assert.strictEqual(response.status, 200);
            assert.deepStrictEqual(response.body, searchResults2);
        });

        it('should return empty search results ', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);
            execQueryStub.onCall(1).resolves([]);
            execQueryStub.onCall(2).resolves([]);
            execQueryStub.onCall(3).resolves([]);

            const response = await request(app).get('/search').query(req1).send();
            assert.strictEqual(response.status, 200);
            assert.deepStrictEqual(response.body, []);
        });


        it('should return empty search results if query empty', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]);

            const response = await request(app).get('/search').query(req3).send();
            assert.strictEqual(response.status, 200);
            assert.deepStrictEqual(response.body, []);
        });


    });
});


