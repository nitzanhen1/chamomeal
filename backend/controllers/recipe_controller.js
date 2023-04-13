var express = require("express");
var router = express.Router();
const recipe_service = require("../services/recipe_service");
const user_service = require("../services/user_service");

router.use(async function (req, res, next) {
    await user_service.userMiddleware(req,res,next);
});

router.get("/getDailyMenu/:date", async (req, res, next) =>{
    try{
        const user_id = req.user_id;
        const date = req.params.date;
        const dailyMenu = await recipe_service.getDailyMenu(user_id, date);
        res.status(200).send(dailyMenu);
    }catch(error){
        next(error);
    }

});

router.post("/markAsEaten", async (req, res, next) =>{
    try{
        const user_id = req.user_id;
        const {date, meal_type, eaten, meal_calories, meal_score} = req.body;
        const updated_values = await recipe_service.markAsEaten(user_id, date, meal_type, eaten, meal_calories, meal_score);
        res.status(202).send(updated_values);
    }catch(error){
        next(error);
    }
});

router.post("/replaceRecipeById", async (req, res, next) =>{
    try{
        const user_id = req.user_id;
        const {recipe_id, date, meal_type, replacement_score} = req.body;
        // replacement score is the diff between old and new recipe
        const newDailyMenu = await recipe_service.replaceRecipeById(user_id, recipe_id, date, meal_type, replacement_score)
        res.status(202).send(newDailyMenu);
    }catch(error){
        next(error);
    }
});

router.post("/replaceRecipeByRandom", async (req, res, next) =>{
    try{
        const user_id = req.user_id;
        const {recipe_id, date, meal_type, meal_calories} = req.body;
        const newDailyMenu = await recipe_service.replaceRecipeByRandom(user_id, recipe_id, date, meal_type, meal_calories);
        res.status(202).send(newDailyMenu);
    }catch(error){
        next(error);
    }
});

router.post("/getSustainableRecipes", async (req, res, next) =>{
    try{
        const user_id = req.user_id;
        const {recipe_id, meal_type, meal_calories, meal_score} = req.body;
        const sustainable_recipes = await recipe_service.getSustainableRecipes(user_id, recipe_id, meal_type, meal_calories, meal_score);
        res.status(200).send(sustainable_recipes);
    }catch(error){
        next(error);
    }
});

router.post("/addToFavorites", async (req, res, next)=>{
    try{
        const user_id = req.user_id;
        const {recipe_id, is_favorite} = req.body;
        if(is_favorite){
            await recipe_service.addToFavorites(user_id, recipe_id);
            res.status(201).send({message: "recipe added to favorites successfully", success: true});
        }
        else{
            await recipe_service.deleteFromFavorites(user_id, recipe_id);
            res.status(201).send({message: "recipe removed from favorites successfully", success: true});
        }
    }catch(error){
        next(error);
    }
});

router.get("/getFavorites", async (req, res, next)=>{
    try{
        const user_id = req.user_id;
        const favorites_recipes = await recipe_service.getFavoritesRecipes(user_id);
        res.status(200).send(favorites_recipes);
    }catch(error){
        next(error);
    }
});

module.exports = router;