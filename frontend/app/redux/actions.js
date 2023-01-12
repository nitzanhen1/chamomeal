import axios from "axios";

export const GET_DAILY_MENU = 'GET_DAILY_MENU';
export const MARK_AS_EATEN = 'MARK_AS_EATEN';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const SET_VEGETARIAN = 'SET_VEGETARIAN';
export const SET_FOOD_PREFERENCE = 'SET_FOOD_PREFERENCE';
export const SET_ACTIVITY_PREFERENCE = 'SET_ACTIVITY_PREFERENCE';
export const SET_PERSONAL_DETAILS = 'SET_PERSONAL_DETAILS';
export const UPDATE_USER_PREFERENCES = 'UPDATE_USER_PREFERENCES';

// const API_URL = 'http://10.0.2.2:3000';
const API_URL = `http://localhost:3000`;

export const getDailyMenu = (date) => {
    try{
        return async dispatch =>{
            const date_today = date.toISOString().substring(0, 10);
            const response = await axios.get(`${API_URL}/recipes/getDailyMenu/${date_today}`);
            const data = response.data;
            let mealsData = [
                {title: 'ארוחת בוקר', mealData:data['breakfast']},
                {title: 'ארוחת צהריים', mealData: data['lunch']},
                {title: 'ארוחת ערב',mealData:data['dinner']}]
            dispatch({
                type: GET_DAILY_MENU,
                meals: mealsData,
                consumed_calories: data['consumed_calories'],
                total_calories: data['total_calories'],
            });
        }
    }catch (error) {
        console.log(error);
    }
}
export const markAsEaten = (meal_type, eaten, meal_calories, meal_score) => {
    try {
        return async dispatch => {
            const response = await axios.post(`${API_URL}/recipes/markAsEaten`,
                {
                    date: date,
                    meal_type: meal_type,
                    eaten: eaten,
                    meal_calories: meal_calories,
                    meal_score: meal_score,
                }
            );
            const data = response.data;
            dispatch({
                type: MARK_AS_EATEN,
                consumed_calories: data['new_consumed_calories'],
                score: data['new_score'],
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const getUserDetails = () => {
    try{
        return async dispatch =>{
            const response = await axios.get(`${API_URL}/user/getUserDetails`);
            const data = response.data;

            dispatch({
                type: GET_USER_DETAILS,
                user_name: data['name'],
                score: data['total_score'],
                EER: data['EER'],
            });
        }
    }catch (error) {
        console.log(error);
    }
}

export const updateUserPreferences = (date_of_birth, height, weight, gender, physical_activity, vegan, vegetarian, without_lactose, gluten_free, kosher) => {
    try{
        return async dispatch =>{
            const response = await axios.post(`${API_URL}/user/updatePreferences`,
                {
                    gender: gender,
                    date_of_birth: date_of_birth,
                    height: height,
                    weight:weight,
                    kosher:kosher,
                    vegetarian:vegetarian,
                    vegan:vegan,
                    gluten_free:gluten_free,
                    without_lactose:without_lactose,
                    physical_activity:physical_activity
                });
            const data = response.data;
            dispatch({
                type: UPDATE_USER_PREFERENCES,
                // preferences: data
            });
        }
    }catch (error) {
        console.log(error);
    }
}

export const setFoodPreference = (newFood) =>{
    console.log('set food'+ newFood.vegan2, newFood.vegetarian2, newFood.without_lactose2, newFood.gluten_free2,newFood.kosher2)
    return async dispatch => {
        await dispatch({
            type: SET_FOOD_PREFERENCE,
            vegan: newFood.vegan2,
            vegetarian: newFood.vegetarian2,
            without_lactose: newFood.without_lactose2,
            gluten_free: newFood.gluten_free2,
            kosher: newFood.kosher2
        });
    }
}

export const setPhysicalActivity = (newPhysicalActivity) =>{
    return async dispatch => {
        dispatch({
            type: SET_ACTIVITY_PREFERENCE,
            physical_activity: newPhysicalActivity,
        });
    }
}

export const setPersonalDetails = (newPersonalDetails) =>{
    return async dispatch => {
        dispatch({
            type: SET_PERSONAL_DETAILS,
            height: newPersonalDetails.newHeight,
            weight: newPersonalDetails.newWeight,
            date_of_birth: newPersonalDetails.newBirthDate,
            gender: newPersonalDetails.newGender,
        });
    }
}