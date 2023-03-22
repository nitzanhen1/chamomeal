const DButils = require("../data/db_utils");
const user_service = require("./user_service");
const recipe_service = require("./recipe_service");
async function search(user_id, query, onlyIngredients, includePrefs, mealTypeFilter){
    if(query==null || query==""){
        return [];
    }
    let recipe_name_query="", meal_type_query="", prefs_query="";
    if(!onlyIngredients){
        recipe_name_query = `or name LIKE '%${query}%'`
    }
    if(mealTypeFilter!=null && (["breakfast","lunch","dinner"].includes(mealTypeFilter))){
        meal_type_query = `and ${mealTypeFilter}=1 `
    }
    if(includePrefs){
        const prefs = await user_service.getPreferences(user_id)
        prefs_query = `and kosher>=${prefs['kosher']} and vegetarian>=${prefs['vegetarian']} and vegan>=${prefs['vegan']} and gluten_free>=${prefs['gluten_free']} and without_lactose>=${prefs['without_lactose']}`
    }
    let ingredients_recipes = await DButils.execQuery(`select recipe_id from IngredientsInRecipe where ingredient_name LIKE '%${query}%'`);
    let ingredients_recipes_ids = ingredients_recipes.map(element => element['recipe_id'])
    if(ingredients_recipes_ids.length==0){
        ingredients_recipes_ids=[0]
    }
    let ing_recipes_ids_join = ingredients_recipes_ids.join()
    let results = await DButils.execQuery(`select distinct * from recipes where (recipe_id in (${ing_recipes_ids_join}) ${recipe_name_query}) ${meal_type_query} ${prefs_query} order by score desc limit 30`);
    results = await recipe_service.addIsFavorite(user_id, results)
    return results;
}

exports.search = search;