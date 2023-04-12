var express = require("express");
var router = express.Router();
const search_service = require("../services/search_service");
const user_service = require("../services/user_service");

router.use(async function (req, res, next) {
    await user_service.userMiddleware(req,res,next);
});
router.get("/", async (req, res, next) =>{
    try{
        const user_id = req.user_id;
        let {searchQuery, onlyIngredients, without_lactose, gluten_free, vegan, vegetarian, kosher, breakfast, lunch, dinner} = req.query;
        onlyIngredients =  (onlyIngredients == 'true');
        breakfast = (breakfast == 'true');
        lunch = (lunch == 'true');
        dinner = (dinner == 'true');
        const recipes = await search_service.search(user_id, searchQuery, onlyIngredients, without_lactose, gluten_free, vegan, vegetarian, kosher, breakfast, lunch, dinner)
        res.status(200).send(recipes);
    }catch(error){
        next(error);
    }

});

module.exports = router;