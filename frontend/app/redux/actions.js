import axios from "axios";

export const GET_DAILY_MENU = 'GET_DAILY_MENU';
export const MARK_AS_EATEN = 'MARK_AS_EATEN';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';

const date = '2023-01-05';
// const API_URL = 'http://10.0.2.2:3000';
const API_URL = `http://localhost:3000`;
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

export const getDailyMenu = () => {
    try{
        return async dispatch =>{
            const response = await axios.get(`${API_URL}/recipes/getDailyMenu/${date}`);
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