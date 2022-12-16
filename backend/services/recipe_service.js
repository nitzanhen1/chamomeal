const DButils = require("../data/db_utils");

async function getRandomRecipe(user_id) {
    user_watch = await DButils.execQuery(`SELECT * from Recipes`);
    return user_watch;
}

exports.getRandomRecipe = getRandomRecipe