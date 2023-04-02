const DButils = require("../data/db_utils");
const recipe_service = require("./recipe_service");
async function search(user_id, searchQuery, onlyIngredients, without_lactose, gluten_free, vegan, vegetarian, kosher, breakfast, lunch, dinner){
    if(searchQuery==null || searchQuery==""){
        return [];
    }
    let recipe_name_query="", meal_type_query="", prefs_query="";
    if(without_lactose!=null && gluten_free!=null && vegan!=null && vegetarian!=null && kosher!=null) {
        prefs_query = `and kosher>=${kosher} and vegetarian>=${vegetarian} and vegan>=${vegan} and gluten_free>=${gluten_free} and without_lactose>=${without_lactose}`
    }
    if(breakfast!=null && lunch!=null && dinner!=null) {
        meal_type_query = await getMealTypeQuery(breakfast, lunch, dinner);
    }
    if(!onlyIngredients){
        recipe_name_query = `or name LIKE '%${searchQuery}%'`
    }
    let ingredients_recipes = await DButils.execQuery(`select recipe_id from IngredientsInRecipe where ingredient_name LIKE '%${searchQuery}%'`);
    let ingredients_recipes_ids = ingredients_recipes.map(element => element['recipe_id'])
    if(ingredients_recipes_ids.length==0){
        ingredients_recipes_ids=[0]
    }
    let ing_recipes_ids_join = ingredients_recipes_ids.join()
    let results = await DButils.execQuery(`select distinct * from recipes where (recipe_id in (${ing_recipes_ids_join}) ${recipe_name_query}) ${prefs_query} ${meal_type_query} order by score desc limit 30`);
    results = await recipe_service.addIsFavorite(user_id, results)
    return results;
}

async function getMealTypeQuery(breakfast, lunch, dinner){
    const meal_number = Number(breakfast)+Number(lunch)+Number(dinner);
    switch (meal_number) {
        case (1):
            if(breakfast)
                return "and breakfast=1";
            else if(lunch)
                return "and lunch=1";
            else
                return "and dinner=1";
        case (2):
            if(!breakfast)
                return "and (lunch=1 or dinner=1)";
            else if(!lunch)
                return "and (breakfast=1 or dinner=1)";
            else
                return "and (breakfast=1 or lunch=1)";
        default:
            return "";
    }

}

exports.search = search;