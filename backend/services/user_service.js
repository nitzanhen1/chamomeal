const DButils = require("../data/db_utils");
const moment = require('moment');


async function userMiddleware(req,res,next){
    if (req.session && req.session.user_id) {
        DButils.execQuery("SELECT user_id FROM users").then((users) => {
            if (users.find((x) => x.user_id === req.session.user_id)) {
                req.user_id = req.session.user_id;
                next();
            }
        }).catch(err => next(err));
    } else {
        req.user_id = 1; //TODO: delete!!
        next(); //TODO: delete!!
        //  res.status(419).send({message: "Session expired, please login again", success: false});
    }
}
async function getPreferences(user_id){
    const cols = "gender, date_of_birth, height, weight, physical_activity, kosher, vegetarian, vegan, gluten_free, without_lactose, EER"
    const preferences = await getUserFromDB(user_id, cols);
    return preferences;
}

async function updatePreferences(user_id, preferences ){
    let {gender, date_of_birth, height, weight, physical_activity, kosher, vegetarian, vegan, gluten_free, without_lactose} = preferences;
    const EER = await calculateEER(gender, date_of_birth, height, weight, physical_activity)
    await DButils.execQuery(`update Users set gender='${Number(gender)}', date_of_birth='${date_of_birth}', height='${height}', weight='${weight}',
                 physical_activity='${physical_activity}', kosher='${Number(kosher)}', vegetarian='${Number(vegetarian)}', vegan='${Number(vegan)}',
                 gluten_free='${Number(gluten_free)}', without_lactose='${Number(without_lactose)}', EER='${EER}' where user_id='${user_id}'`);
}

async function calculateEER(gender, date_of_birth, height, weight, physical_activity){
    const age = moment().diff(date_of_birth, 'years');
    let height_in_m = height/100;
    const PA_level = await calculatePALevel(age, gender, physical_activity);
    let EER = 0;
    if(gender && age>=19){ //female aged 19 and older
        EER = 354-(6.91*age)+PA_level*(9.36*weight+726*height_in_m)
    }
    else{
        EER = 662-(9.53*age)+PA_level*(15.91*weight+539.6*height_in_m)
    }
    return EER;
}

async function calculatePALevel(age, gender, physical_activity){
    switch (physical_activity) {
        case ("sedentary"):
            return 1.00;
        case ("low active"):
            return (gender && age>=19 ? 1.12 : 1.11);
        case ("active"):
            return (gender && age>=19 ? 1.27 : 1.25);
        case("very active"):
            return (gender && age>=19 ? 1.45 : 1.48);
        default:
            return 0.00 //TODO: throw error?
    }
}


async function getUserFromDB(user_id, cols="*") {
    let user = await DButils.execQuery(`SELECT ${cols} FROM Users WHERE user_id = '${user_id}'`);
    if(user.length>0) {
        return user[0];
    }
    throw {status: 404, message: "user doesn't exist"};
}

async function getUserDetails(user_id){
    let user = await getUserFromDB(user_id);
    let user_details = {
        name: user['first_name'],
        total_score: user['score'],
        EER: user['EER'],
    }
    return user_details
}


exports.userMiddleware = userMiddleware
exports.updatePreferences = updatePreferences
exports.getUserFromDB = getUserFromDB
exports.getUserDetails = getUserDetails
exports.getPreferences = getPreferences
