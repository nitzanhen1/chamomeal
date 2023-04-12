const DButils = require("../data/db_utils");
const moment = require('moment');
const bcrypt = require("bcryptjs");


async function userMiddleware(req, res, next) {
    if (req.session && req.session.user_id) {
        DButils.execQuery("select user_id from users").then((users) => {
            if (users.find((x) => x.user_id === req.session.user_id)) {
                req.user_id = req.session.user_id;
                next();
            }
        }).catch(err => next(err));
    } else {
         res.status(419).send({message: "Session expired, please login again", success: false});
    }
}

async function getPreferences(user_id) {
    const cols = "gender, year_of_birth, height, weight, physical_activity, kosher, vegetarian, vegan, gluten_free, without_lactose, EER, login_score"
    const preferences = await getUserFromDB(user_id, cols);
    return preferences;
}

async function updatePreferences(user_id, preferences) {
    let {
        gender,
        year_of_birth,
        height,
        weight,
        physical_activity,
        kosher,
        vegetarian,
        vegan,
        gluten_free,
        without_lactose
    } = preferences;
    const EER = await calculateEER(gender, year_of_birth, height, weight, physical_activity)
    await DButils.execQuery(`update Users set gender='${Number(gender)}', year_of_birth='${year_of_birth}', height='${height}', weight='${weight}',
                 physical_activity='${physical_activity}', kosher='${Number(kosher)}', vegetarian='${Number(vegetarian)}', vegan='${Number(vegan)}',
                 gluten_free='${Number(gluten_free)}', without_lactose='${Number(without_lactose)}', EER='${EER}' where user_id='${user_id}'`);
}

async function calculateEER(gender, year_of_birth, height, weight, physical_activity) {
    const age = moment().year() - year_of_birth
    let height_in_m = height / 100;
    const PA_level = await calculatePALevel(age, gender, physical_activity);
    let EER = 0;
    if (gender && age >= 19) { //female aged 19 and older
        EER = 354 - (6.91 * age) + PA_level * (9.36 * weight + 726 * height_in_m)
    } else {
        EER = 662 - (9.53 * age) + PA_level * (15.91 * weight + 539.6 * height_in_m)
    }
    return EER;
}

async function calculatePALevel(age, gender, physical_activity) {
    switch (physical_activity) {
        case ("sedentary"):
            return 1.00;
        case ("low active"):
            return (gender && age >= 19 ? 1.12 : 1.11);
        case ("active"):
            return (gender && age >= 19 ? 1.27 : 1.25);
        case("very active"):
            return (gender && age >= 19 ? 1.45 : 1.48);
        default:
            return 0.00 //TODO: throw error?
    }
}


async function getUserFromDB(user_id, cols = "*") {
    let user = await DButils.execQuery(`SELECT ${cols} FROM Users WHERE user_id = '${user_id}'`);
    if (user.length > 0) {
        return user[0];
    }
    throw {status: 404, message: "user doesn't exist"};
}

async function getGlobalDetails(user_id) {
    let user = await getUserFromDB(user_id);
    let user_details = {
        first_name: user['first_name'],
        total_score: user['score'],
        EER: user['EER'],
        kosher: user['kosher'],
        vegetarian: user['vegetarian'],
        vegan: user['vegan'],
        gluten_free: user['gluten_free'],
        without_lactose: user['without_lactose']
    }
    let badges = await getBadgesFromDB(user_id);
    user_details['badges'] = Object.values(badges)
    return user_details
}

async function checkBadges(user_id, new_score, score_key, char_type) {
    console.log(new_score)
    let badges = await getBadgesFromDB(user_id)
    for (let i = 0; i < score_key.length - 1; i++) {
        let col = score_key[i] + char_type
        console.log(col)
        if (new_score >= score_key[i]) {
            if (badges[col] == false) { //earned new badge
                console.log('earned')
                await DButils.execQuery(`update badges set ${col}= 1 where user_id='${user_id}'`);
                badges[col] = 1
                let earned = true //notify frontend to alert user
                return [true, badges, earned];
            }
        } else {
            if (badges[col] == true) { //TODO test if other badges type enter this condition
                console.log('lost', char_type) //should be always 'p'
                await DButils.execQuery(`update badges set ${col}= 0 where user_id='${user_id}'`);
                badges[col] = 0
                let earned = false //badge lost no need to notify user
                return [true, badges, earned];
            } else { // no change needed
                console.log('no change')
                return false;
            }
        }
    }
}

async function checkEatenBadges(user_id, eaten_score) {
    let score_key = [10, 50, 100, 200, 500, 1000]
    let char_type = 'p'
    return checkBadges(user_id, eaten_score, score_key, char_type)
}

async function checkLoginBadges(user_id, login_score) {
    await DButils.execQuery(`update Users set login_score =${login_score} where user_id = ${user_id}`);
    let score_key = [2, 4, 7, 10, 14, 20]
    let char_type = 'l'
    return checkBadges(user_id, login_score, score_key, char_type)
}

async function checkReplaceBadges(user_id, replace_score) {
    // TODO think how to get the replace score?
    await DButils.execQuery(`update Users set replace_score =${replace_score} where user_id = ${user_id}`);
    let score_key = [5, 15, 30, 50, 80, 120]
    let char_type = 'c'
    return checkBadges(user_id, replace_score, score_key, char_type)
}

async function getBadgesFromDB(user_id, cols = "*") {
    let badges = await DButils.execQuery(`SELECT ${cols} FROM badges WHERE user_id = '${user_id}'`);
    if (badges.length > 0) {
        badges = badges[0]
        delete badges['user_id']
        return badges;
    }
    throw {status: 404, message: "badges doesn't exist for user"};
}


async function updatePassword(user_id, old_pass, new_pass) {
    let DB_pass = await DButils.execQuery(`SELECT password FROM Users WHERE user_id = '${user_id}'`);
    // check that user_id exists
    if (DB_pass.length > 0) {
        DB_pass = DB_pass[0];
        // check that the old password is correct
        if (bcrypt.compareSync(old_pass, DB_pass.password)) {
            //old password ok, encrypt new pass
            let hash_password = bcrypt.hashSync(new_pass, parseInt(process.env.bcrypt_saltRounds));
            await DButils.execQuery(
                `UPDATE Users SET password = '${hash_password}' WHERE user_id = '${user_id}'`
            );
            return
        }
    }
    throw {status: 404, message: "password incorrect"};
}

async function getUserDetails(user_id) {
    let user = await getUserFromDB(user_id);
    let user_details = {
        first_name: user['first_name'],
        last_name: user['last_name'],
        email: user['email'],
    }
    return user_details
}

async function updateUserDetails(user_id, details) {
    let {first_name, last_name, email} = details;
    await DButils.execQuery(`update Users set 
    first_name='${first_name}', last_name='${last_name}', email='${email}' where user_id='${user_id}'`);
}



exports.userMiddleware = userMiddleware
exports.updatePreferences = updatePreferences
exports.updateUserDetails = updateUserDetails
exports.getUserFromDB = getUserFromDB
exports.getGlobalDetails = getGlobalDetails
exports.getUserDetails = getUserDetails
exports.getPreferences = getPreferences
exports.checkEatenBadges = checkEatenBadges;
exports.checkLoginBadges = checkLoginBadges;
exports.checkReplaceBadges = checkReplaceBadges;
exports.updatePassword = updatePassword;
