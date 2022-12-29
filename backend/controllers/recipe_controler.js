var express = require("express");
var router = express.Router();
const recipe_service = require("../services/recipe_service");
// const user_service = require("../services/user_service");

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

router.get("/getDailyMenu/:date/:uid", async (req, res, next) =>{
    try{
        const user_id = req.params.uid;
        const date = req.params.date;
        const dailyMenu = await recipe_service.getDailyMenu(user_id, date);
        res.status(200).send(dailyMenu);
    }catch(error){
        next(error);
    }

});

module.exports = router;