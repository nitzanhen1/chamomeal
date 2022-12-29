const DButils = require("../data/db_utils");

async function getDailyMenu(user_id, date){
    let dailyMenu = await DButils.execQuery(`select * from MealPlanHistory where user_id='${user_id}' and menu_date='${date}'`);
    if(dailyMenu.length==0)
        dailyMenu = await generateDailyMenu(user_id, date);
    else
        dailyMenu = dailyMenu[0];
    const recipes_id_array = [dailyMenu['breakfast'],dailyMenu['lunch'],dailyMenu['dinner']];
    let recipes = await getRecipesByIdFromDB(recipes_id_array);
    recipes[0].checked = dailyMenu['breakfast_check'];
    recipes[1].checked = dailyMenu['lunch_check'];
    recipes[2].checked = dailyMenu['dinner_check'];
    let fullDailyMenu = {
            breakfast: [recipes[0]],
            lunch: [recipes[1]],
            dinner: [recipes[2]]
    }
    return fullDailyMenu;
}

async function generateDailyMenu(user_id, date){
    let breakfastRecipesId = await DButils.execQuery(`select recipe_id from Recipes where breakfast=true`);
    let lunchRecipesId = await DButils.execQuery(`select recipe_id from Recipes where lunch=true`);
    let dinnerRecipesId = await DButils.execQuery(`select recipe_id from Recipes where dinner=true`);
    let randomBreakfastId, randomLunchId, randomDinnerId;
    do {
        randomBreakfastId = breakfastRecipesId[Math.floor(Math.random() * breakfastRecipesId.length)]['recipe_id'];
        randomLunchId = lunchRecipesId[Math.floor(Math.random() * lunchRecipesId.length)]['recipe_id'];
        randomDinnerId = dinnerRecipesId[Math.floor(Math.random() * dinnerRecipesId.length)]['recipe_id'];
    }while (randomBreakfastId === randomLunchId || randomBreakfastId === randomDinnerId || randomLunchId === randomDinnerId);
     let generatedMenu = {
        user_id: user_id,
        menu_date: date,
        breakfast: randomBreakfastId,
        lunch: randomLunchId,
        dinner: randomDinnerId,
        breakfast_check: false,
        lunch_check: false,
        dinner_check: false
    }
    await DButils.execQuery(`insert into MealPlanHistory values ('${user_id}','${date}', '${randomBreakfastId}', '${randomLunchId}', '${randomDinnerId}', false, false, false)`);
    return generatedMenu;
}

async function getRecipesByIdFromDB(array_recipes_id){
    array_recipes_id = array_recipes_id.join()
    let recipes = await DButils.execQuery(`select * from Recipes where recipe_id in (${array_recipes_id}) ORDER BY FIELD(recipe_id, ${array_recipes_id})`);
    return recipes;
}


exports.getDailyMenu = getDailyMenu