const DButils = require("../data/db_utils");
const user_service = require("./user_service");

async function getDailyMenu(user_id, date) {
    let dailyMenu = await getDailyMenuFromDB(user_id, date)
    if (dailyMenu == null)
        dailyMenu = await generateDailyMenu(user_id, date);
    const recipes_id_array = [dailyMenu['breakfast'], dailyMenu['lunch'], dailyMenu['dinner']];
    let recipes = await getRecipesByIdFromDB(recipes_id_array);
    recipes[0].eaten = dailyMenu['breakfast_eaten'];
    recipes[1].eaten = dailyMenu['lunch_eaten'];
    recipes[2].eaten = dailyMenu['dinner_eaten'];
    let fullDailyMenu = {
        breakfast: recipes[0],
        lunch: recipes[1],
        dinner: recipes[2],
        consumed_calories: dailyMenu['consumed_calories'],
        total_calories: recipes[0].calories + recipes[1].calories + recipes[2].calories
    }
    return fullDailyMenu;
}

async function generateDailyMenu(user_id, date) {
    const user = await user_service.getUserFromDB(user_id);
    let preferences = `kosher>=${user['kosher']} and vegetarian>=${user['vegetarian']} and vegan>=${user['vegan']} and gluten_free>=${user['gluten_free']} and without_lactose>=${user['without_lactose']}`

    let breakfastRecipesId = await DButils.execQuery(`select recipe_id from Recipes where breakfast=1 and ${preferences}`);
    let lunchRecipesId = await DButils.execQuery(`select recipe_id from Recipes where lunch=1 and  ${preferences}`);
    let dinnerRecipesId = await DButils.execQuery(`select recipe_id from Recipes where dinner=1 and ${preferences}`);
    let randomBreakfastId, randomLunchId, randomDinnerId;
    do {
        randomBreakfastId = breakfastRecipesId[Math.floor(Math.random() * breakfastRecipesId.length)]['recipe_id'];
        randomLunchId = lunchRecipesId[Math.floor(Math.random() * lunchRecipesId.length)]['recipe_id'];
        randomDinnerId = dinnerRecipesId[Math.floor(Math.random() * dinnerRecipesId.length)]['recipe_id'];
    } while (randomBreakfastId === randomLunchId || randomBreakfastId === randomDinnerId || randomLunchId === randomDinnerId);
    let generatedMenu = {
        user_id: user_id,
        menu_date: date,
        breakfast: randomBreakfastId,
        lunch: randomLunchId,
        dinner: randomDinnerId,
        breakfast_eaten: false,
        lunch_eaten: false,
        dinner_eaten: false,
        consumed_calories: 0,
    }
    await DButils.execQuery(`insert into MealPlanHistory values ('${user_id}','${date}', '${randomBreakfastId}', '${randomLunchId}', '${randomDinnerId}', 0, 0, 0, 0)`);
    return generatedMenu;
}

async function getRecipesByIdFromDB(array_recipes_id) {
    array_recipes_id = array_recipes_id.join()
    let recipes = await DButils.execQuery(`select * from Recipes where recipe_id in (${array_recipes_id}) ORDER BY FIELD(recipe_id, ${array_recipes_id})`);
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

async function getDailyMenuFromDB(user_id, date) {
    let dailyMenu = await DButils.execQuery(`select * from MealPlanHistory where user_id = '${user_id}'and menu_date = '${date}'`);
    if (dailyMenu.length == 0)
        return null;
    else
        return dailyMenu[0];
}

exports.getDailyMenu = getDailyMenu
exports.markAsEaten = markAsEaten