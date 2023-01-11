const DButils = require("../data/db_utils");
const moment = require('moment');

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



exports.updatePreferences = updatePreferences
