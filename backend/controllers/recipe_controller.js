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
        //res.sendStatus(401);
        res.status(419).send({message: "Session expired, please login again", success: false});
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
        const new_consumed_calories = await recipe_service.markAsEaten(user_id, date, meal_type, eaten, meal_calories);
        res.status(201).send({'new_consumed_calories': new_consumed_calories});
    }catch(error){
        next(error);
    }
});

module.exports = router;