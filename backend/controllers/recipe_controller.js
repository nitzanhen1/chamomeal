var express = require("express");
var router = express.Router();
const DButils = require("../data/db_utils");
const recipe_service = require("../services/recipe_service");

router.use(async function (req, res, next) {
    if (req.session && req.session.user_id) {
        DButils.execQuery("SELECT user_id FROM users").then((users) => {
            if (users.find((x) => x.user_id === req.session.user_id)) {
                req.user_id = req.session.user_id;
                next();
            }
        }).catch(err => next(err));
    } else {
        req.user_id = 1; //TODO: delete!!
        next(); //TODO: delete!!
        // res.status(419).send({message: "Session expired, please login again", success: false});
    }
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
        const date = req.body.date;
        const meal_type = req.body.meal_type;
        const eaten = req.body.eaten;
        const meal_calories = req.body.meal_calories;
        const meal_score = req.body.meal_score;
        const updated_values = await recipe_service.markAsEaten(user_id, date, meal_type, eaten, meal_calories, meal_score);
        res.status(201).send(updated_values);
    }catch(error){
        next(error);
    }
});

router.post("/replaceRecipeByRandom", async (req, res, next) =>{
    try{
        const user_id = req.user_id;
        const recipe_id = req.recipe_id;
        const date = req.body.date;
        const meal_type = req.body.meal_type;
        const meal_calories = req.body.meal_calories;
        const dailyMenu = await recipe_service.replaceRecipeByRandom(user_id, recipe_id, date, meal_type, meal_calories);
        res.status(201).send(dailyMenu);
    }catch(error){
        next(error);
    }
});

router.post("/addToFavorites", async (req, res, next)=>{
    try{
        const user_id = req.user_id;
        const recipe_id = req.body.recipe_id;
        let success;
        if(req.body.is_favorite){
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

router.get("/getFavoritesRecipes", async (req, res, next)=>{
    try{
        const user_id = req.user_id;
        const favorites_recipes = await recipe_service.getFavoritesRecipes(user_id);
        res.status(200).send(favorites_recipes);
    }catch(error){
        next(error);
    }
});

module.exports = router;