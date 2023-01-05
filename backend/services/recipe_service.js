const DButils = require("../data/db_utils");

async function getDailyMenu(user_id, date){
    let dailyMenu = await DButils.execQuery(`select * from MealPlanHistory where user_id='${user_id}' and menu_date='${date}'`);
    if(dailyMenu.length==0)
        dailyMenu = await generateDailyMenu(user_id, date);
    else
        dailyMenu = dailyMenu[0];
    const recipes_id_array = [dailyMenu['breakfast'],dailyMenu['lunch'],dailyMenu['dinner']];
    let recipes = await getRecipesByIdFromDB(recipes_id_array);
    recipes[0].eaten = dailyMenu['breakfast_eaten'];
    recipes[1].eaten = dailyMenu['lunch_eaten'];
    recipes[2].eaten = dailyMenu['dinner_eaten'];
    let fullDailyMenu = {
            breakfast: [recipes[0]],
            lunch: [recipes[1]],
            dinner: [recipes[2]],
            consumed_calories: dailyMenu['consumed_calories']
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
        breakfast_eaten: false,
        lunch_eaten: false,
        dinner_eaten: false,
        consumed_calories: 0,
    }
    await DButils.execQuery(`insert into MealPlanHistory values ('${user_id}','${date}', '${randomBreakfastId}', '${randomLunchId}', '${randomDinnerId}', 0, 0, 0, 0)`);
    return generatedMenu;
}

async function getRecipesByIdFromDB(array_recipes_id){
    array_recipes_id = array_recipes_id.join()
    let recipes = await DButils.execQuery(`select * from Recipes where recipe_id in (${array_recipes_id}) ORDER BY FIELD(recipe_id, ${array_recipes_id})`);
    return recipes;
}

async function markAsEaten(user_id, date, meal_type, eaten, meal_calories){
    const meal_type_eaten = meal_type+'_eaten';
    let dailyMenu = await DButils.execQuery(`select * from MealPlanHistory where user_id='${user_id}' and menu_date='${date}'`);
    if(dailyMenu.length!=0) {
        dailyMenu = dailyMenu[0]
        let new_consumed_calories =  dailyMenu['consumed_calories']
        if((!dailyMenu[meal_type_eaten])&&(eaten)){
            new_consumed_calories+=meal_calories
        }
        else if((dailyMenu[meal_type_eaten])&&(!eaten)){
            console.log("minus")
            new_consumed_calories-=meal_calories;
        }
        await DButils.execQuery(`update MealPlanHistory set ${meal_type_eaten}='${Number(eaten)}', consumed_calories='${new_consumed_calories}' where user_id='${user_id}' and menu_date='${date}'`);
        return new_consumed_calories;
    }
    else{
        //Exception
    }


}


exports.getDailyMenu = getDailyMenu
exports.markAsEaten = markAsEaten