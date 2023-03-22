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
        const {query, onlyIngredientsFilter, includePrefsFilter, mealTypeFilter} = req.query;
        const includePrefs = (includePrefsFilter!=null) ?  (includePrefsFilter === 'true') : false;
        const onlyIngredients = (onlyIngredientsFilter!=null) ?  (onlyIngredientsFilter === 'true') : false;
        const recipes = await search_service.search(user_id, query, onlyIngredients, mealTypeFilter, includePrefs)
        res.status(200).send(recipes);
    }catch(error){
        next(error);
    }

});

module.exports = router;