const DButils = require("../data/db_utils");
const user_service = require("./user_service");

async function getDailyMenu(user_id, date) {
    let dailyMenu = await getDailyMenuFromDB(user_id, date)
    if (dailyMenu == null) {
        let today = new Date().toISOString().slice(0, 10).replace('T', ' ')
        if(new Date(today)>new Date(date)){
            return {};
        }
        dailyMenu = await generateDailyMenu(user_id, date);
    }
    const recipes_id_array = [dailyMenu['breakfast'], dailyMenu['lunch'], dailyMenu['dinner']];
    let recipes = await getRecipesByIdFromDB(recipes_id_array);
    recipes[0].eaten = dailyMenu['breakfast_eaten'];
    recipes[1].eaten = dailyMenu['lunch_eaten'];
    recipes[2].eaten = dailyMenu['dinner_eaten'];
    return {
            breakfast: recipes[0],
            lunch: recipes[1],
            dinner: recipes[2],
            consumed_calories: dailyMenu['consumed_calories'],
            total_calories: recipes[0].calories+recipes[1].calories+recipes[2].calories
    }
}

async function generateDailyMenu(user_id, date) {
    const prefs = await user_service.getPreferences(user_id)
    let prefs_query = `kosher>=${prefs['kosher']} and vegetarian>=${prefs['vegetarian']} and vegan>=${prefs['vegan']} and gluten_free>=${prefs['gluten_free']} and without_lactose>=${prefs['without_lactose']}`
    if(prefs['EER']!=null) {
        let EER = prefs['EER'];
        let breakfast_calories = ((Math.floor(Math.random() * (32 - 28 + 1)) + 28) / 100) * EER;
        let lunch_calories = ((Math.floor(Math.random() * (42 - 38 + 1)) + 38) / 100) * EER;
        let dinner_calories = EER - breakfast_calories - lunch_calories;

        let breakfast_recipes_ids = await getRecipesIdsArrayByFilters("breakfast", breakfast_calories, prefs_query);
        let lunch_recipes_ids = await getRecipesIdsArrayByFilters("lunch", lunch_calories, prefs_query);
        let dinner_recipes_ids = await getRecipesIdsArrayByFilters("dinner", dinner_calories, prefs_query);
        let random_breakfast_id, random_lunch_id, random_dinner_id;
        do {
            random_breakfast_id = breakfast_recipes_ids[Math.floor(Math.random() * breakfast_recipes_ids.length)];
            random_lunch_id = lunch_recipes_ids[Math.floor(Math.random() * lunch_recipes_ids.length)];
            random_dinner_id = dinner_recipes_ids[Math.floor(Math.random() * dinner_recipes_ids.length)];
        } while (random_breakfast_id == random_lunch_id || random_breakfast_id == random_dinner_id || random_lunch_id == random_dinner_id);
        let generatedMenu = {
            user_id: user_id,
            menu_date: date,
            breakfast: random_breakfast_id,
            lunch: random_lunch_id,
            dinner: random_dinner_id,
            breakfast_eaten: false,
            lunch_eaten: false,
            dinner_eaten: false,
            consumed_calories: 0,
        }
        await DButils.execQuery(`insert into MealPlanHistory values ('${user_id}','${date}', '${random_breakfast_id}', '${random_lunch_id}', '${random_dinner_id}', 0, 0, 0, 0)`);
        return generatedMenu;
    }
    throw {status: 404, message: "Need to fill user's preferences"};
}

async function getRecipesByIdFromDB(array_recipes_id){
    let recipes = [];
    if(array_recipes_id.length>0) {
        const recipes_id_join = array_recipes_id.join()
        recipes = await DButils.execQuery(`select * from Recipes where recipe_id in (${recipes_id_join}) ORDER BY FIELD(recipe_id, ${recipes_id_join})`);
    }
    if(array_recipes_id.length>recipes.length){ //only if there are two or more recipes with the same id
        let duplicate_recipes = [];
        let index = 0;
        for(let i=0; i<array_recipes_id.length; i++){
            if((index < recipes.length) && (array_recipes_id[i] == recipes[index]['recipe_id'])) {
                duplicate_recipes.push(recipes[index])
                index++;
            }
            else {
                for (let j = 0; j < recipes.length; j++) {
                    if (array_recipes_id[i] == recipes[j]['recipe_id']) {
                        duplicate_recipes.push(recipes[j])
                        break;
                    }
                }
            }
        }
        recipes = duplicate_recipes;
    }
    return recipes;
}

async function markAsEaten(user_id, date, meal_type, eaten, meal_calories, meal_score) {
    const meal_type_eaten = meal_type + '_eaten';
    let dailyMenu = await getDailyMenuFromDB(user_id, date);
    if (dailyMenu != null) {
        let new_consumed_calories = dailyMenu['consumed_calories']
        let new_score = (await user_service.getUserFromDB(user_id))['score']
        if ((!dailyMenu[meal_type_eaten]) && (eaten)) {
            new_consumed_calories += meal_calories
            new_score += meal_score;
        } else if ((dailyMenu[meal_type_eaten]) && (!eaten)) {
            new_consumed_calories -= meal_calories;
            new_score -= meal_score;
        }
        await DButils.execQuery(`update MealPlanHistory set ${meal_type_eaten}='${Number(eaten)}', consumed_calories='${new_consumed_calories}' where user_id='${user_id}' and menu_date='${date}'`);
        await DButils.execQuery(`update Users set score='${new_score}' where user_id='${user_id}'`);

        let updated_values = {
            "new_consumed_calories": new_consumed_calories,
            "new_score": new_score,
        }

        await user_service.checkBadges(user_id, new_score).then(async (result) => {
            if (result[0] == true) {
                updated_values["badges"] = Object.values(result[1]) //badges
                updated_values["earned"] = result[2] //true\false
            }
        })

        return updated_values;
    } else {
        throw {status: 404, message: "daily menu doesn't exist"};
    }
}

async function replaceRecipeById(user_id, recipe_id, date, meal_type) {
    try {
        await DButils.execQuery(`update MealPlanHistory set ${meal_type}='${recipe_id}' where user_id = '${user_id}' and menu_date = '${date}'`);
        return getDailyMenu(user_id, date)
    }
    catch (err){
        throw err;
    }
}

async function replaceRecipeByRandom(user_id, recipe_id, date, meal_type, meal_calories) {
    try {
        const prefs = await user_service.getPreferences(user_id)
        let prefs_query = `kosher>=${prefs['kosher']} and vegetarian>=${prefs['vegetarian']} and vegan>=${prefs['vegan']} and gluten_free>=${prefs['gluten_free']} and without_lactose>=${prefs['without_lactose']}`
        let recipes_ids = await getRecipesIdsArrayByFilters(meal_type, meal_calories, prefs_query);
        let random_recipe_id;
        do {
            random_recipe_id = recipes_ids[Math.floor(Math.random() * recipes_ids.length)];
        } while (recipe_id == random_recipe_id);
        return replaceRecipeById(user_id, random_recipe_id, date, meal_type);
    }
    catch (err){
        throw err;
    }
}
async function getSustainableRecipes(user_id, recipe_id, meal_type, meal_calories, meal_score) {
    try {
        let gt = ((meal_score==10) ? ">=" : ">")
        const prefs = await user_service.getPreferences(user_id)
        let prefs_query = `score ${gt} ${meal_score} and kosher>=${prefs['kosher']} and vegetarian>=${prefs['vegetarian']} and vegan>=${prefs['vegan']} and gluten_free>=${prefs['gluten_free']} and without_lactose>=${prefs['without_lactose']}`
        let recipes_ids = await getRecipesIdsArrayByFilters(meal_type, meal_calories, prefs_query);
        let random_recipe_id, random_index;
        let sustainable_recipes = [];
        do {
            random_index = Math.floor(Math.random() * recipes_ids.length);
            random_recipe_id = recipes_ids[random_index];
            const elementsBefore = recipes_ids.slice(0, random_index)
            const elementsAfter = recipes_ids.slice(random_index+1);
            recipes_ids = elementsBefore.concat(elementsAfter);
            if (recipe_id != random_recipe_id){
                sustainable_recipes.push(random_recipe_id);
            }
        } while (sustainable_recipes.length < 3);
        return getRecipesByIdFromDB(sustainable_recipes);
    }
    catch (err){
        throw err;
    }
}

async function getRecipesIdsArrayByFilters(meal_type, calories, preferences){
    let threshold = 50;
    let recipes_ids_dict = [];
    do{
        recipes_ids_dict = await DButils.execQuery(`select recipe_id from Recipes where ${meal_type}=1 and calories between ${calories - threshold} and ${calories + threshold} and ${preferences}`);
        threshold+=20;
    } while(recipes_ids_dict.length<4)
    return recipes_ids_dict.map(element => element['recipe_id'])
}

async function getFavoritesRecipes(user_id) {
    try {
        const recipes_id = await DButils.execQuery(`select recipe_id from Favorites where user_id='${user_id}' order by added_date desc`);
        let recipes_id_array = [];
        recipes_id.map((element) => recipes_id_array.push(element.recipe_id));
        let favoriteRecipes =  await getRecipesByIdFromDB(recipes_id_array);
        return favoriteRecipes.map(element => ({...element, isFavorite: true}))
    }
    catch (err){
        throw {status: 404, message: err};
    }
}

async function addToFavorites(user_id, recipe_id) {
    try {
        let local_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let favorite_recipe = await DButils.execQuery(`select * from favorites where user_id='${user_id}' and recipe_id='${recipe_id}'`);
        if (favorite_recipe.length===0)
            await DButils.execQuery(`insert into favorites values ('${user_id}', '${recipe_id}', '${local_time}')`);
        else
            await DButils.execQuery(`update favorites set added_date='${local_time}' where user_id='${user_id}' and recipe_id='${recipe_id}'`);
    }
    catch (err){
        throw {status: 404, message: err};
    }
}
async function deleteFromFavorites(user_id, recipe_id) {
    try {
        await DButils.execQuery(`delete from favorites where user_id='${user_id}' and recipe_id='${recipe_id}'`);
    }
    catch (err){
        throw {status: 404, message: err};
    }
}

async function getDailyMenuFromDB(user_id, date) {
    let dailyMenu = await DButils.execQuery(`select * from MealPlanHistory where user_id = '${user_id}'and menu_date = '${date}'`);
    if(dailyMenu.length === 0)
        return null;
    else
        return dailyMenu[0];
}

exports.getDailyMenu = getDailyMenu
exports.markAsEaten = markAsEaten
exports.getFavoritesRecipes = getFavoritesRecipes
exports.addToFavorites = addToFavorites
exports.deleteFromFavorites = deleteFromFavorites
exports.replaceRecipeByRandom = replaceRecipeByRandom
exports.getSustainableRecipes = getSustainableRecipes
exports.replaceRecipeById = replaceRecipeById