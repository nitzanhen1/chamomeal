var express = require("express");
var router = express.Router();
const search_service = require("../services/search_service");
const user_service = require("../services/user_service");
const logger = require("../logger")

router.use(async function (req, res, next) {
    await user_service.userMiddleware(req,res,next);
});
router.get("/", async (req, res, next) =>{
    // logger.http({label: 'POST /search', message:'request', user_id: req.user_id, controller: 'search', meta:{searchQuery: req.query.searchQuery}})
    try{
        const user_id = req.user_id;
        let {searchQuery, onlyIngredients, without_lactose, gluten_free, vegan, vegetarian, kosher, breakfast, lunch, dinner} = req.query;
        onlyIngredients = (onlyIngredients==='true' || onlyIngredients==='1')
        without_lactose = (without_lactose==='true' || without_lactose==='1')
        gluten_free = (gluten_free==='true' || gluten_free==='1')
        vegan = (vegan==='true' || vegan==='1')
        vegetarian = (vegetarian==='true' || vegetarian==='1')
        kosher = (kosher==='true' || kosher==='1')
        breakfast = (breakfast==='true' || breakfast==='1')
        lunch = (lunch==='true' || lunch==='1')
        dinner = (dinner==='true' || dinner==='1')
        const recipes = await search_service.search(user_id, searchQuery, onlyIngredients, without_lactose, gluten_free, vegan, vegetarian, kosher, breakfast, lunch, dinner)
        res.status(200).send(recipes);
        logger.http({label: 'POST /search', message:'success', user_id: req.user_id, controller: 'search', meta:{ status: 200, body: '', results: recipes.length, searchQuery: req.query.searchQuery }});
    }catch(error){
        logger.http({label: 'POST /search', message:'error', user_id: req.user_id, controller: 'search', meta: {error: error, searchQuery: req.query.searchQuery}});
        next(error);
    }

});

module.exports = router;