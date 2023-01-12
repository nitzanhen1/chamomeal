var express = require("express");
var router = express.Router();
const recipe_service = require("../services/recipe_service");

router.get("/", (req, res) => res.send("im here"));

router.get("/random", async (req, res, next) => {
    try {
        // let user_id = -1;
        // if(req.session && req.session.user_id){
        //     user_id = req.session.user_id;
        // }
        const random_recipes = await recipe_service.getRandomRecipe();
        res.status(200).send(random_recipes);
    }
    catch (error) {
        next(error);
    }
});

router.get("/random", async (req, res, next) => {
    try {
        // let user_id = -1;
        // if(req.session && req.session.user_id){
        //     user_id = req.session.user_id;
        // }
        const random_recipes = await recipe_service.getRandomRecipe();
        res.status(200).send(random_recipes);
    }
    catch (error) {
        next(error);
    }
});

router.get("/getDailyMenu/:date", async (req, res, next) =>{
    try{
        const user_id = 1;
        const date = req.params.date;
        const dailyMenu = await recipe_service.getDailyMenu(user_id, date);
        res.status(200).send(dailyMenu);
    }catch(error){
        next(error);
    }

});

router.post("/markAsEaten", async (req, res, next) =>{
    try{
        const user_id = 1;
        const date = req.body.date;
        const meal_type = req.body.meal_type;
        const eaten = req.body.eaten;
        const meal_calories = req.body.meal_calories;
        const new_consumed_calories = await recipe_service.markAsEaten(user_id, date, meal_type, eaten, meal_calories);
        res.status(201).send({'new_consumed_calories': new_consumed_calories});
    }catch(error){
        next(error);
    }
});

module.exports = router;