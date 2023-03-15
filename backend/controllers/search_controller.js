var express = require("express");
var router = express.Router();
const search_service = require("../services/search_service");
const user_service = require("../services/user_service");

router.use(async function (req, res, next) {
    await user_service.userMiddleware(req,res,next);
});
router.get("/search", async (req, res, next) =>{
    try{
        const user_id = req.user_id;
        const {searchQuery, onlyIngredientsFilter, includePrefsFilter, sortByScoreFilter} = req.query;
        const query = searchQuery || "";
        const onlyIngredients = onlyIngredientsFilter || true;
        const includePrefs = includePrefsFilter || false;
        const sortByScore = sortByScoreFilter || false;
        const recipes = await search_service.search(user_id, query, onlyIngredients, includePrefs, sortByScore)
        res.status(200).send(recipes);
    }catch(error){
        next(error);
    }

});