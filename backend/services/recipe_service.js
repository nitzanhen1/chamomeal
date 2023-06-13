const DButils = require("../data/db_utils");
const user_service = require("./user_service");

async function getDailyMenu(user_id, date) {
    let dailyMenu = await getDailyMenuFromDB(user_id, date)
    if (dailyMenu == null)
        dailyMenu = await generateDailyMenu(user_id, date);
    return await createDailyMenuDict(user_id, dailyMenu);
}

async function createDailyMenuDict(user_id, dailyMenu){
    const recipes_id_array = [dailyMenu['breakfast'], dailyMenu['lunch'], dailyMenu['dinner']];
    let recipes = await getRecipesByIdFromDB(recipes_id_array);
    recipes = await addIsFavorite(user_id, recipes)
    recipes[0].eaten = dailyMenu['breakfast_eaten'];
    recipes[1].eaten = dailyMenu['lunch_eaten'];
    recipes[2].eaten = dailyMenu['dinner_eaten'];
    return {
        breakfast: recipes[0],
        lunch: recipes[1],
        dinner: recipes[2],
        consumed_calories: (recipes[0].eaten ? recipes[0].calories : 0) + (recipes[1].eaten ? recipes[1].calories : 0) + (recipes[2].eaten ? recipes[2].calories : 0),
        total_calories: recipes[0].calories + recipes[1].calories + recipes[2].calories,
        badges: dailyMenu['badges'],
        earned: dailyMenu['earned'],
    }
}

async function generateDailyMenu(user_id, date) {
    try {
        const prefs = await user_service.getPreferences(user_id)
        let generatedMenu = await createMenu(user_id, date, prefs);
        let login_score = prefs['login_score'] + 1
        let result = await DButils.execQuery(`insert into MealPlanHistory values ('${user_id}', '${date}', '${generatedMenu["breakfast"]}', 
                                    '${generatedMenu["lunch"]}', '${generatedMenu["dinner"]}', 0, 0, 0, 0)`);
        if (result['insertId']){
            let result = await user_service.checkLoginBadges(user_id, login_score);
            if (result[0] == true) {
                generatedMenu["badges"] = Object.values(result[1]) //badges
                generatedMenu["earned"] = result[2] //true\false
            }
        }
        return generatedMenu;
    } catch (err) {
        throw err;
    }
}

async function regenerateDailyMenu(user_id, date) {
    try {
        let dailyMenu = await getDailyMenuFromDB(user_id, date);
        const recipes_id_array = [dailyMenu['breakfast'], dailyMenu['lunch'], dailyMenu['dinner']];
        let recipes = await getRecipesByIdFromDB(recipes_id_array);
        let new_score = (await user_service.getUserFromDB(user_id))['score']
        if (dailyMenu != null && recipes != null) {
            new_score -= (dailyMenu['breakfast_eaten'] ? recipes[0]['score'] : 0)
            new_score -= (dailyMenu['lunch_eaten'] ? recipes[1]['score'] : 0)
            new_score -= (dailyMenu['dinner_eaten'] ? recipes[2]['score'] : 0)

            await DButils.execQuery(`update Users set score='${new_score}' where user_id = '${user_id}'`);
            const prefs = await user_service.getPreferences(user_id)
            let newMenu = await createMenu(user_id, date, prefs);
            let result = await user_service.checkEatenBadges(user_id, new_score);
            if (result[0] == true) {
                newMenu["badges"] = Object.values(result[1]) //badges
                newMenu["earned"] = result[2] //true\false
            }
            await DButils.execQuery(`update MealPlanHistory set breakfast='${newMenu["breakfast"]}', lunch='${newMenu["lunch"]}',
                                         dinner='${newMenu["dinner"]}', breakfast_eaten=0, lunch_eaten=0, dinner_eaten=0, 
                                         consumed_calories=0 where user_id = '${user_id}' and menu_date ='${date}'`);
            let newDailyMenu =  await createDailyMenuDict(user_id, newMenu);
            newDailyMenu["new_score"] = new_score;
            return newDailyMenu
        }
        else {
            throw {status: 404, message: "something went wrong"}
        }
    } catch (err) {
        throw err;
    }

}

async function createMenu(user_id, date, prefs) {
    if (prefs['EER'] != null) {
        let prefs_query = `kosher>=${prefs['kosher']} and vegetarian>=${prefs['vegetarian']} and vegan>=${prefs['vegan']} and gluten_free>=${prefs['gluten_free']} and without_lactose>=${prefs['without_lactose']}`
        let EER = prefs['EER'];
        let breakfast_calories = ((Math.floor(Math.random() * (32 - 28 + 1)) + 28) / 100) * EER;
        let lunch_calories = ((Math.floor(Math.random() * (42 - 38 + 1)) + 38) / 100) * EER;
        let dinner_calories = EER - breakfast_calories - lunch_calories;

        let breakfast_recipes_ids = await getRecipesIdsArrayByFilters("breakfast", breakfast_calories, prefs_query, 10);
        let random_breakfast_id = (breakfast_recipes_ids.length > 0) ? breakfast_recipes_ids[Math.floor(Math.random() * breakfast_recipes_ids.length)] : 1967;

        prefs_query += ` and recipe_id <> ${random_breakfast_id}`;
        let lunch_recipes_ids = await getRecipesIdsArrayByFilters("lunch", lunch_calories, prefs_query, 10);
        let random_lunch_id = (lunch_recipes_ids.length > 0) ? lunch_recipes_ids[Math.floor(Math.random() * lunch_recipes_ids.length)] : 991;

        prefs_query += ` and recipe_id <> ${random_lunch_id}`;
        let dinner_recipes_ids = await getRecipesIdsArrayByFilters("dinner", dinner_calories, prefs_query, 10);
        let random_dinner_id = (dinner_recipes_ids.length > 0) ? dinner_recipes_ids[Math.floor(Math.random() * dinner_recipes_ids.length)] : 871;

        let menu = {
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
        return menu;
    }
    throw {status: 404, message: "Need to fill user's preferences"};
}

async function getRecipesByIdFromDB(array_recipes_id) {
    try {
        let recipes = [];
        if (array_recipes_id.length > 0) {
            const recipes_id_join = array_recipes_id.join()
            recipes = await DButils.execQuery(`select * from Recipes where recipe_id in (${recipes_id_join})
                                               ORDER BY FIELD(recipe_id, ${recipes_id_join})`);
        }
        if (array_recipes_id.length > recipes.length) { //only if there are two or more recipes with the same id
            let duplicate_recipes = [];
            let index = 0;
            for (let i = 0; i < array_recipes_id.length; i++) {
                if ((index < recipes.length) && (array_recipes_id[i] == recipes[index]['recipe_id'])) {
                    duplicate_recipes.push(recipes[index])
                    index++;
                } else {
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
    }catch (err){
        throw {status: 404, message: err}
    }
}

async function markAsEaten(user_id, date, meal_type, eaten, meal_calories, meal_score) {
    const meal_type_eaten = meal_type + '_eaten';
    let dailyMenu = await getDailyMenuFromDB(user_id, date);
    if (dailyMenu != null) {
        let recipes_id = [dailyMenu['breakfast'], dailyMenu['lunch'], dailyMenu['dinner']]
        let recipes = await getRecipesByIdFromDB(recipes_id);
        let new_consumed_calories = recipes[0]['calories']*dailyMenu['breakfast_eaten']+ recipes[1]['calories']*dailyMenu['lunch_eaten']+ recipes[2]['calories']*dailyMenu['dinner_eaten']
        // let new_consumed_calories = dailyMenu['consumed_calories']
        let new_score = (await user_service.getUserFromDB(user_id))['score']
        if ((!dailyMenu[meal_type_eaten]) && (eaten)) {
            new_consumed_calories += meal_calories
            new_score += meal_score;
        } else if ((dailyMenu[meal_type_eaten]) && (!eaten)) {
            new_consumed_calories = (new_consumed_calories-meal_calories)>0 ? (new_consumed_calories-meal_calories) : 0;
            new_score = (new_score-meal_score)>0 ? (new_score-meal_score) : 0;
        }

        let updated_values = {
            "new_consumed_calories": new_consumed_calories,
            "new_score": new_score,
        }

        let result = await user_service.checkEatenBadges(user_id, new_score);
        if (result[0] == true) {
            updated_values["badges"] = Object.values(result[1]) //badges
            updated_values["earned"] = result[2] //true\false
        }

        await DButils.execQuery(`update MealPlanHistory set ${meal_type_eaten}='${Number(eaten)}', consumed_calories='${new_consumed_calories}' where user_id='${user_id}' and menu_date='${date}'`);
        await DButils.execQuery(`update Users set score='${new_score}' where user_id='${user_id}'`);

        return updated_values;
    } else {
        throw {status: 404, message: "daily menu doesn't exist"};
    }
}

async function replaceRecipeById(user_id, recipe_id, date, meal_type, replacement_score) {
    try {
        await DButils.execQuery(`update MealPlanHistory set ${meal_type}='${recipe_id}' where user_id = '${user_id}' and menu_date = '${date}'`);
        let updatedValues = {}
        if (replacement_score >0){
            let result = await user_service.checkReplaceBadges(user_id, replacement_score);
            if (result[0] == true) {
                updatedValues["badges"] = Object.values(result[1]) //badges
                updatedValues["earned"] = result[2] //true\false
            }
        }
        let dailyMenu = await getDailyMenu(user_id, date)
        updatedValues["dailyMenu"] = dailyMenu
        return updatedValues
    }
    catch (err){
        throw err;
    }
}

async function replaceRecipeByRandom(user_id, recipe_id, date, meal_type) {
    try {
        const prefs = await user_service.getPreferences(user_id)
        let prefs_query = `recipe_id<>${recipe_id} and kosher>=${prefs['kosher']} and vegetarian>=${prefs['vegetarian']} and vegan>=${prefs['vegan']} and gluten_free>=${prefs['gluten_free']} and without_lactose>=${prefs['without_lactose']}`
        const EER = prefs['EER']
        let percentage =  (meal_type=='lunch' ? 38 : 28);
        let calories = ((Math.floor(Math.random() * ((percentage+4) - percentage + 1)) + percentage) / 100) * EER;
        let recipes_ids = await getRecipesIdsArrayByFilters(meal_type, calories, prefs_query, 10);
        let random_recipe_id = (recipes_ids.length>0) ? recipes_ids[Math.floor(Math.random() * recipes_ids.length)] : 991;
        return await replaceRecipeById(user_id, random_recipe_id, date, meal_type);
    }
    catch (err){
        throw err;
    }
}

async function getSustainableRecipes(user_id, recipe_id, meal_type, meal_score) {
    try {
        let gt = ((meal_score==10) ? ">=" : ">")
        const prefs = await user_service.getPreferences(user_id)
        let prefs_query = `recipe_id<>${recipe_id} and score ${gt} ${meal_score} and kosher>=${prefs['kosher']} and vegetarian>=${prefs['vegetarian']} and vegan>=${prefs['vegan']} and gluten_free>=${prefs['gluten_free']} and without_lactose>=${prefs['without_lactose']}`
        const EER = prefs['EER']
        let percentage =  (meal_type=='lunch' ? 38 : 28);
        let calories = ((Math.floor(Math.random() * ((percentage+4) - percentage + 1)) + percentage) / 100) * EER;
        let recipes_ids = await getRecipesIdsArrayByFilters(meal_type, calories, prefs_query, 20);
        if(recipes_ids.length==0){
            return [];}
        let random_recipe_id, random_index;
        let sustainable_recipes_ids = [];
        for(let i=0 ; i<3 ; i++){
            if(recipes_ids.length>0) {
                random_index = Math.floor(Math.random() * recipes_ids.length);
                random_recipe_id = recipes_ids[random_index];
                const elementsBefore = recipes_ids.slice(0, random_index)
                const elementsAfter = recipes_ids.slice(random_index + 1);
                recipes_ids = elementsBefore.concat(elementsAfter);
                sustainable_recipes_ids.push(random_recipe_id);
            }
        }
        let sustainable_recipes =  await getRecipesByIdFromDB(sustainable_recipes_ids)
        sustainable_recipes.sort(function (a,b){return b["score"] - a["score"]});
        sustainable_recipes = await addIsFavorite(user_id, sustainable_recipes);
        return sustainable_recipes;
    }
    catch (err){
        throw err;
    }
}

async function getRecipesIdsArrayByFilters(meal_type, meal_calories, preferences, maxLoop){
    let threshold = 50;
    let loop = 0;
    let recipes_ids_dict = [];
    do{
        recipes_ids_dict = await DButils.execQuery(`select recipe_id from Recipes where ${meal_type}=1 and calories between ${meal_calories - threshold} and ${meal_calories} and ${preferences}`);
        threshold+=20;
        loop+=1;
    } while(recipes_ids_dict.length<3 && loop < maxLoop)
    if (recipes_ids_dict.length==0){return [];}
    return recipes_ids_dict.map(element => element['recipe_id'])
}

async function getFavoritesRecipes(user_id) {
        let favorites_id_array = await getFavoritesIds(user_id);
        let favoriteRecipes =  await getRecipesByIdFromDB(favorites_id_array);
        return favoriteRecipes.map(element => ({...element, isFavorite: true}))
}

async function getFavoritesIds(user_id){
    try {
        const recipes_id = await DButils.execQuery(`select recipe_id from Favorites where user_id = '${user_id}' order by added_date desc`);
        let recipes_id_array = [];
        recipes_id.map((element) => recipes_id_array.push(element.recipe_id));
        return recipes_id_array;
    } catch (err){
        throw {status: 404, message: err};
    }
}

async function addIsFavorite(user_id, recipes_array){
    const favoriteRecipesIds = await getFavoritesIds(user_id);
    return recipes_array.map(element => ({...element, isFavorite: (favoriteRecipesIds.includes(element["recipe_id"]))}))

}

async function addToFavorites(user_id, recipe_id) {
    try {
        let local_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let favorite_recipe = await DButils.execQuery(`select recipe_id from favorites where user_id='${user_id}' and recipe_id='${recipe_id}'`);
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
exports.addIsFavorite = addIsFavorite
exports.deleteFromFavorites = deleteFromFavorites
exports.replaceRecipeByRandom = replaceRecipeByRandom
exports.getSustainableRecipes = getSustainableRecipes
exports.replaceRecipeById = replaceRecipeById
exports.regenerateDailyMenu = regenerateDailyMenu