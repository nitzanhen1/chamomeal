var express = require("express");
var router = express.Router();
const recipe_service = require("../services/recipe_service");
const user_service = require("../services/user_service");
const logger = require("../logger")

router.use(async function (req, res, next) {
    await user_service.userMiddleware(req,res,next);
});

router.get("/getDailyMenu/:date", async (req, res, next) =>{
    // logger.http({label: 'GET /getDailyMenu', message:'request', user_id: req.user_id, controller: 'recipe', meta:{date: req.params.date}})
    try{
        const user_id = req.user_id;
        const date = req.params.date;
        const dailyMenu = await recipe_service.getDailyMenu(user_id, date);
        res.status(200).send(dailyMenu);
        logger.http({label: 'GET /getDailyMenu', message:'success', user_id: req.user_id, controller: 'recipe', meta:{ status: 200, body: {breakfast: dailyMenu['breakfast']['recipe_id'],lunch: dailyMenu['lunch']['recipe_id'],dinner: dailyMenu['dinner']['recipe_id'], total_calories: dailyMenu['total_calories']}, date: req.params.date }});
    }catch(error){
        logger.http({label: 'GET /getDailyMenu', message:'error', user_id: req.user_id, controller: 'recipe', meta: {error: error, date: req.params.date}});
        next(error);
    }

});

router.post("/regenerateDailyMenu/:date", async (req, res, next) =>{
    // logger.http({label: 'POST /regenerateDailyMenu', message:'request', user_id: req.user_id, controller: 'recipe', meta:{date: req.params.date}})
    try{
        const user_id = req.user_id;
        const date = req.params.date;
        const dailyMenu = await recipe_service.regenerateDailyMenu(user_id, date);
        res.status(202).send(dailyMenu);
        logger.http({label: 'POST /regenerateDailyMenu', message:'success', user_id: req.user_id, controller: 'recipe', meta:{ status: 200, body: {breakfast: dailyMenu['breakfast']['recipe_id'],lunch: dailyMenu['lunch']['recipe_id'],dinner: dailyMenu['dinner']['recipe_id'], total_calories: dailyMenu['total_calories']}, date: req.params.date }});
    }catch(error){
        logger.http({label: 'POST /regenerateDailyMenu', message:'error', user_id: req.user_id, controller: 'recipe', meta: {error: error, date: req.params.date}});
        next(error);
    }

});

router.post("/markAsEaten", async (req, res, next) =>{
    // logger.http({label: 'POST /markAsEaten', message:'request', user_id: req.user_id, controller: 'recipe', meta:{date: req.body.date, meal_type: req.body.meal_type}})
    try{
        const user_id = req.user_id;
        const {date, meal_type, eaten, meal_calories, meal_score} = req.body;
        const updated_values = await recipe_service.markAsEaten(user_id, date, meal_type, eaten, meal_calories, meal_score);
        res.status(202).send(updated_values);
        logger.http({label: 'POST /markAsEaten', message:'success', user_id: req.user_id, controller: 'recipe', meta:{ status: 202, body: '', date: req.body.date, meal_type: req.body.meal_type }});
    }catch(error){
        logger.http({label: 'POST /markAsEaten', message:'error', user_id: req.user_id, controller: 'recipe', meta: {error: error, date: req.body.date, meal_type: req.body.meal_type}});
        next(error);
    }
});

router.post("/replaceRecipeById", async (req, res, next) =>{
    // logger.http({label: 'POST /replaceRecipeById', message:'request', user_id: req.user_id, controller: 'recipe', meta:{from: req.body.from, recipe_id: req.body.recipe_id}})
    try{
        const user_id = req.user_id;
        const {recipe_id, date, meal_type, replacement_score} = req.body;
        // replacement score is the diff between old and new recipe
        const newDailyMenu = await recipe_service.replaceRecipeById(user_id, recipe_id, date, meal_type, replacement_score)
        res.status(202).send(newDailyMenu);
        logger.http({label: 'POST /replaceRecipeById', message:'success', user_id: req.user_id, controller: 'recipe', meta:{ status: 202, body: '', from: req.body.from, recipe_id: req.body.recipe_id}});
    }catch(error){
        logger.http({label: 'POST /replaceRecipeById', message:'error', user_id: req.user_id, controller: 'recipe', meta: {error: error, from: req.body.from, recipe_id: req.body.recipe_id}});
        next(error);
    }
});

router.post("/replaceRecipeByRandom", async (req, res, next) =>{
    // logger.http({label: 'POST /replaceRecipeByRandom', message:'request', user_id: req.user_id, controller: 'recipe', meta:{recipe_id: req.body.recipe_id}})
    try{
        const user_id = req.user_id;
        const {recipe_id, date, meal_type} = req.body;
        const newDailyMenu = await recipe_service.replaceRecipeByRandom(user_id, recipe_id, date, meal_type);
        res.status(202).send(newDailyMenu);
        logger.http({label: 'POST /replaceRecipeByRandom', message:'success', user_id: req.user_id, controller: 'recipe', meta:{ status: 202, body: '', recipe_id: req.body.recipe_id}});
    }catch(error){
        logger.http({label: 'POST /replaceRecipeByRandom', message:'error', user_id: req.user_id, controller: 'recipe', meta: {error: error, recipe_id: req.body.recipe_id}});
        next(error);
    }
});

router.post("/getSustainableRecipes", async (req, res, next) =>{
    // logger.http({label: 'POST /getSustainableRecipes', message:'request', user_id: req.user_id, controller: 'recipe', meta:{meal_score: req.body.meal_score}})
    try{
        const user_id = req.user_id;
        const {recipe_id, meal_type, meal_score} = req.body;
        const sustainable_recipes = await recipe_service.getSustainableRecipes(user_id, recipe_id, meal_type, meal_score);
        res.status(200).send(sustainable_recipes);
        const meta_recipes = sustainable_recipes.map(recipe => ({ recipe_id: recipe.recipe_id, score: recipe.score }));
        logger.http({label: 'POST /getSustainableRecipes', message:'success', user_id: req.user_id, controller: 'recipe', meta:{ status: 200, body: meta_recipes, meal_score: req.body.meal_score}});
    }catch(error){
        logger.http({label: 'POST /getSustainableRecipes', message:'error', user_id: req.user_id, controller: 'recipe', meta: {error: error, meal_score: req.body.meal_score}});
        next(error);
    }
});

router.post("/addToFavorites", async (req, res, next)=>{
    // logger.http({label: 'POST /addToFavorites', message:'request', user_id: req.user_id, controller: 'recipe', meta:{recipe_id: req.body.recipe_id, is_favorite: req.body.is_favorite}})
    try{
        const user_id = req.user_id;
        const {recipe_id, is_favorite} = req.body;
        if(is_favorite){
            await recipe_service.addToFavorites(user_id, recipe_id);
            res.status(201).send({message: "recipe added to favorites successfully", success: true});
            logger.http({label: 'POST /addToFavorites', message:'success', user_id: req.user_id, controller: 'recipe', meta:{ status: 201, body: 'added',recipe_id: req.body.recipe_id}});
        }
        else{
            await recipe_service.deleteFromFavorites(user_id, recipe_id);
            res.status(201).send({message: "recipe removed from favorites successfully", success: true});
            logger.http({label: 'POST /addToFavorites', message:'success', user_id: req.user_id, controller: 'recipe', meta:{ status: 201, body: 'removed',recipe_id: req.body.recipe_id}});
        }
    }catch(error){
        logger.http({label: 'POST /addToFavorites', message:'error', user_id: req.user_id, controller: 'recipe', meta: {error: error, recipe_id: req.body.recipe_id}});
        next(error);
    }
});

router.get("/getFavorites", async (req, res, next)=>{
    // logger.http({label: 'GET /getFavorites', message:'request', user_id: req.user_id, controller: 'recipe', meta:{}})
    try{
        const user_id = req.user_id;
        const favorites_recipes = await recipe_service.getFavoritesRecipes(user_id);
        res.status(200).send(favorites_recipes);
        logger.http({label: 'GET /getFavorites', message:'success', user_id: req.user_id, controller: 'recipe', meta:{ status: 200, body: ''}});
    }catch(error){
        logger.http({label: 'GET /getFavorites', message:'error', user_id: req.user_id, controller: 'recipe', meta: {error: error, }});
        next(error);
    }
});

module.exports = router;