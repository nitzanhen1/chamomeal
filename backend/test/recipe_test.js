const assert = require('assert');
const request = require('supertest');
const sinon = require('sinon');
const app = require('../main');
const db = require('../data/db_utils');

describe('Recipe Test', () => {

    after(() => {
        // Stop the server after running the tests
        process.exit();
    });

    afterEach(() => {
        sinon.restore();
    });

    app.request.session = {user_id: 1}

    describe('GET /getDailyMenu/:date', () => {

        it('should return the existing daily menu', async () => {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves([{breakfast: 1,lunch: 2,dinner: 3,breakfast_eaten:0,lunch_eaten:0,dinner_eaten:0,badges:"",earned:""}]); // Returns daily menu
            execQueryStub.onCall(2).resolves([{recipe_id: 1},{recipe_id: 2},{recipe_id: 3}]); // Returns the details of the recipes
            execQueryStub.onCall(3).resolves([{recipe_id: 1}]); // Returns favorite recipes

            const response = await request(app).get('/recipes/getDailyMenu/:date').set('params', { date }).send()

            assert.strictEqual(response.status, 200);
        });

        it('should return new daily menu', async () => {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves([]); // no daily menu
            execQueryStub.onCall(2).resolves([{EER:500,kosher:0,vegetarian:0,vegan:0,gluten_free:0,without_lactose:0}]); // user preferences
            execQueryStub.onCall(3).resolves([{recipe_id: 1},{recipe_id: 11},{recipe_id: 111}]); // breakfast
            execQueryStub.onCall(4).resolves([{recipe_id: 2},{recipe_id: 22},{recipe_id: 222}]); // lunch
            execQueryStub.onCall(5).resolves([{recipe_id: 3},{recipe_id: 33},{recipe_id: 333}]); // dinner
            execQueryStub.onCall(6).resolves({insertId: false}); // insert into MealPlanHistory

            execQueryStub.onCall(7).resolves([{recipe_id: 1},{recipe_id: 2},{recipe_id: 3}]); // Returns the details of the recipes
            execQueryStub.onCall(8).resolves([{recipe_id: 1}]); // Returns favorite recipes

            const response = await request(app).get('/recipes/getDailyMenu/:date').set('params', { date }).send()

            assert.strictEqual(response.status, 200);
        });

        it('should return error no EER', async () => {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves([]); // no daily menu
            execQueryStub.onCall(2).resolves([{EER:null,kosher:0,vegetarian:0,vegan:0,gluten_free:0,without_lactose:0}]); // user preferences

            const response = await request(app).get('/recipes/getDailyMenu/:date').set('params', { date }).send()

            assert.strictEqual(response.status, 404);
            assert.deepStrictEqual(response.body.message,  "Need to fill user's preferences");

        });
    });

    describe('POST /regenerateDailyMenu', () => {

        it('should regenerate daily menu', async () => {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves([{breakfast: 1,lunch: 2,dinner: 3,breakfast_eaten:0,lunch_eaten:0,dinner_eaten:0,badges:"",earned:""}]); // Returns daily menu
            execQueryStub.onCall(2).resolves([{recipe_id:1,score:0},{recipe_id:2,score:0},{recipe_id:3,score:0}]); // return recipes
            execQueryStub.onCall(3).resolves([{user_id:1,score:1}]); // return user
            execQueryStub.onCall(4).resolves(); // update Users set score
            execQueryStub.onCall(5).resolves([{EER:500,kosher:0,vegetarian:0,vegan:0,gluten_free:0,without_lactose:0}]); // user preferences
            execQueryStub.onCall(6).resolves([{recipe_id: 1},{recipe_id: 11},{recipe_id: 111}]); // breakfast
            execQueryStub.onCall(7).resolves([{recipe_id: 2},{recipe_id: 22},{recipe_id: 222}]); // lunch
            execQueryStub.onCall(8).resolves([{recipe_id: 3},{recipe_id: 33},{recipe_id: 333}]); // dinner

            execQueryStub.onCall(9).resolves([{user_id:1,'5c':0,'15c':0,'30c':0,'50c':0,'80c':0,'120c':0,'10p':0,'50p':0,'100p':0,'200p':0,'500p':0,'1000p':0,'2l':0,'4l':0,'7l':0,'10l':0,'14l':0,'20l':0}]); // Badges
            execQueryStub.onCall(10).resolves(); // update MealPlanHistory

            execQueryStub.onCall(11).resolves([{recipe_id: 1},{recipe_id: 2},{recipe_id: 3}]); // Returns the details of the recipes
            execQueryStub.onCall(12).resolves([{recipe_id: 1}]); // Returns favorite recipes

            const response = await request(app).post('/recipes/regenerateDailyMenu/:date').set('params', { date }).send();

            assert.strictEqual(response.status, 202);
        });

        it('regenerate daily menu no user', async () => {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves([{breakfast: 1,lunch: 2,dinner: 3,breakfast_eaten:0,lunch_eaten:0,dinner_eaten:0,badges:"",earned:""}]); // Returns daily menu
            execQueryStub.onCall(2).resolves([{recipe_id:1,score:0},{recipe_id:2,score:0},{recipe_id:3,score:0}]); // return recipes
            execQueryStub.onCall(3).resolves([]); // return user

            const response = await request(app).post('/recipes/regenerateDailyMenu/:date').set('params', { date }).send();

            assert.strictEqual(response.status, 404);
            assert.deepStrictEqual(response.body.message,  "user doesn't exist");
        });

    });

    describe('POST /markAsEaten', () => {

        it("daily menu doesn't exist", async () => {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const req = {
                date: date,
                meal_type: "breakfast",
                eaten: true,
                meal_calories: 100
            };

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves([]); // Returns daily menu

            const response = await request(app).post('/recipes/markAsEaten').send(req);

            assert.strictEqual(response.status, 404);
            assert.deepStrictEqual(response.body.message,  "daily menu doesn't exist");
        });

        it('mark as eaten', async () => {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const req = {
                date: date,
                meal_type: "breakfast",
                eaten: true,
                meal_calories: 100
            };

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves([{breakfast: 1,lunch: 2,dinner: 3,breakfast_eaten:0,lunch_eaten:0,dinner_eaten:0,badges:"",earned:""}]); // Returns daily menu
            execQueryStub.onCall(2).resolves([{recipe_id:1,calories:10},{recipe_id:2,calories:10},{recipe_id:3,calories:10}]); // return recipes
            execQueryStub.onCall(3).resolves([{user_id:1,score:1}]); // return user
            execQueryStub.onCall(4).resolves([{user_id:1,'5c':0,'15c':0,'30c':0,'50c':0,'80c':0,'120c':0,'10p':0,'50p':0,'100p':0,'200p':0,'500p':0,'1000p':0,'2l':0,'4l':0,'7l':0,'10l':0,'14l':0,'20l':0}]); // Badges
            execQueryStub.onCall(5).resolves(); // update MealPlanHistory
            execQueryStub.onCall(6).resolves(); // update Users set score

            const response = await request(app).post('/recipes/markAsEaten').send(req);

            assert.strictEqual(response.status, 202);
        });

        it('mark not eaten', async () => {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const req = {
                date: date,
                meal_type: "lunch",
                eaten: false,
                meal_calories: 100
            };

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves([{breakfast: 1,lunch: 2,dinner: 3,breakfast_eaten:1,lunch_eaten:1,dinner_eaten:1,badges:"",earned:""}]); // Returns daily menu
            execQueryStub.onCall(2).resolves([{recipe_id:1,calories:10},{recipe_id:2,calories:10},{recipe_id:3,calories:10}]); // return recipes
            execQueryStub.onCall(3).resolves([{user_id:1,score:1}]); // return user
            execQueryStub.onCall(4).resolves([{user_id:1,'5c':0,'15c':0,'30c':0,'50c':0,'80c':0,'120c':0,'10p':0,'50p':0,'100p':0,'200p':0,'500p':0,'1000p':0,'2l':0,'4l':0,'7l':0,'10l':0,'14l':0,'20l':0}]); // Badges
            execQueryStub.onCall(5).resolves(); // update MealPlanHistory
            execQueryStub.onCall(6).resolves(); // update Users set score

            const response = await request(app).post('/recipes/markAsEaten').send(req);

            assert.strictEqual(response.status, 202);
        });

    });

    describe('POST /replaceRecipeById', () => {

        it("replace recipe by id replacement_score=0", async () => {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const req = {
                recipe_id:4,
                date: date,
                meal_type: "breakfast",
                replacement_score:0,
                meal_calories: 100
            };

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves(); // update MealPlanHistory
            execQueryStub.onCall(2).resolves([{breakfast: 1,lunch: 2,dinner: 3,breakfast_eaten:0,lunch_eaten:0,dinner_eaten:0,badges:"",earned:""}]); // Returns daily menu
            execQueryStub.onCall(3).resolves([{recipe_id: 1},{recipe_id: 2},{recipe_id: 3}]); // Returns the details of the recipes
            execQueryStub.onCall(4).resolves([{recipe_id: 1}]); // Returns favorite recipes

            const response = await request(app).post('/recipes/replaceRecipeById').send(req);

            assert.strictEqual(response.status, 202);
        });

        it("replace recipe by id", async () => {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const req = {
                recipe_id:4,
                date: date,
                meal_type: "breakfast",
                replacement_score:1,
                meal_calories: 100
            };

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves(); // update MealPlanHistory

            //checkReplaceBadges
            execQueryStub.onCall(2).resolves([{replace_score:1}]);
            execQueryStub.onCall(3).resolves(); //update Users set replace_score
            execQueryStub.onCall(4).resolves([{user_id:1,'5c':0,'15c':0,'30c':0,'50c':0,'80c':0,'120c':0,'10p':0,'50p':0,'100p':0,'200p':0,'500p':0,'1000p':0,'2l':0,'4l':0,'7l':0,'10l':0,'14l':0,'20l':0}]); // Badges

            // getDailyMenu
            execQueryStub.onCall(5).resolves([{breakfast: 4,lunch: 2,dinner: 3,breakfast_eaten:0,lunch_eaten:0,dinner_eaten:0,badges:"",earned:""}]); // Returns daily menu
            execQueryStub.onCall(6).resolves([{recipe_id: 4},{recipe_id: 2},{recipe_id: 3}]); // Returns the details of the recipes
            execQueryStub.onCall(7).resolves([{recipe_id: 1}]); // Returns favorite recipes

            const response = await request(app).post('/recipes/replaceRecipeById').send(req);

            assert.strictEqual(response.status, 202);
        });

    });

    describe('POST /replaceRecipeByRandom', () => {

        it("replace Recipe By Random", async () => {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const req = {
                recipe_id: 1,
                meal_type: "breakfast",
                date: date
            };

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            //getPreferences
            execQueryStub.onCall(1).resolves([{replace_score:0,EER:500,kosher:0,vegetarian:0,vegan:0,gluten_free:0,without_lactose:0}]); // user preferences
            //getRecipesIdsArrayByFilters
            execQueryStub.onCall(2).resolves([{recipe_id: 4},{recipe_id: 44},{recipe_id: 444}]); //
            //replaceRecipeById
            execQueryStub.onCall(3).resolves(); // update MealPlanHistory
                // getDailyMenu
            execQueryStub.onCall(4).resolves([{breakfast: 4,lunch: 2,dinner: 3,breakfast_eaten:0,lunch_eaten:0,dinner_eaten:0,badges:"",earned:""}]); // Returns daily menu
            execQueryStub.onCall(5).resolves([{recipe_id: 4},{recipe_id: 2},{recipe_id: 3}]); // Returns the details of the recipes
            execQueryStub.onCall(6).resolves([{recipe_id: 1}]); // Returns favorite recipes

            const response = await request(app).post('/recipes/replaceRecipeByRandom').send(req);

            assert.strictEqual(response.status, 202);
        });

    });

    describe('POST /getSustainableRecipes', () => {

        it("no Sustainable Recipes", async () => {
            const req = {
                recipe_id: 1,
                meal_type: "breakfast",
                meal_calories: 100,
                meal_score: 2
            };

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            //getPreferences
            execQueryStub.onCall(1).resolves([{replace_score:0,EER:500,kosher:0,vegetarian:0,vegan:0,gluten_free:0,without_lactose:0}]); // user preferences
            //getRecipesIdsArrayByFilters (length=0 / length>0)
            execQueryStub.resolves([]); //recipes_ids_dict

            const response = await request(app).post('/recipes/getSustainableRecipes').send(req);

            assert.strictEqual(response.status, 200);
        });

        it("get Sustainable Recipes", async () => {
            const req = {
                recipe_id: 1,
                meal_type: "breakfast",
                meal_calories: 100,
                meal_score: 2
            };

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            //getPreferences
            execQueryStub.onCall(1).resolves([{replace_score:0,EER:500,kosher:0,vegetarian:0,vegan:0,gluten_free:0,without_lactose:0}]); // user preferences
            //getRecipesIdsArrayByFilters (length=0 / length>0)
            execQueryStub.onCall(2).resolves([{recipe_id:11},{recipe_id:12},{recipe_id:13}]); //recipes_ids_dict
            //getRecipesByIdFromDB
            execQueryStub.onCall(3).resolves([{recipe_id:11,score:10},{recipe_id:12,score:9},{recipe_id:13,score:9}]); //recipes
            //addIsFavorite
            execQueryStub.onCall(4).resolves([{recipe_id:11},{recipe_id:12},{recipe_id:13}]); //recipes_id

            const response = await request(app).post('/recipes/getSustainableRecipes').send(req);

            assert.strictEqual(response.status, 200);
        });

    });

    describe('POST /addToFavorites', () => {

        it('should add a recipe to favorites', async () => {
            const req = {
                recipe_id:1,
                is_favorite: true,
            };

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves([]); // checks if recipe already exists in favorites
            execQueryStub.onCall(2).resolves();

            const response = await request(app).post('/recipes/addToFavorites').send(req);

            assert.strictEqual(response.status, 201);
            assert.deepStrictEqual(response.body.message,  "recipe added to favorites successfully");
            assert.deepStrictEqual(response.body.success,  true);
        });

        it('should update recipe in favorites', async () => {
            const req = {
                recipe_id:1,
                is_favorite: true,
            };

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves([{recipe_id: 1}]); // checks if recipe already exists in favorites
            execQueryStub.onCall(2).resolves();

            const response = await request(app).post('/recipes/addToFavorites').send(req);

            assert.strictEqual(response.status, 201);
            assert.deepStrictEqual(response.body.message,  "recipe added to favorites successfully");
            assert.deepStrictEqual(response.body.success,  true);
        });

        it('should remove recipe from favorites', async () => {
            const req = {
                recipe_id:1,
                is_favorite: false,
            };

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves();

            const response = await request(app).post('/recipes/addToFavorites').send(req);

            assert.strictEqual(response.status, 201);
            assert.deepStrictEqual(response.body.message,  "recipe removed from favorites successfully");
            assert.deepStrictEqual(response.body.success,  true);
        });
    });

    describe('GET /getFavorites', () => {

        it('should return the favorite recipes', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves([{recipe_id: 1}]); // Returns the user's favorite recipes
            execQueryStub.onCall(2).resolves([{recipe_id: 1}]); // Returns the details of the recipes

            const response = await request(app).get('/recipes/getFavorites')

            assert.strictEqual(response.status, 200);
        });

        it('no favorite recipes', async () => {

            const execQueryStub = sinon.stub(db, 'execQuery');
            execQueryStub.onCall(0).resolves([{user_id:1}]); // User authentication
            execQueryStub.onCall(1).resolves([]); // There are no favorite recipes

            const response = await request(app).get('/recipes/getFavorites')

            assert.strictEqual(response.status, 200);
        });
    });
});
