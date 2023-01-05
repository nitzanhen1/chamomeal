import axios from "axios";

export const GET_DAILY_MENU = 'GET_DAILY_MENU';
export const MARK_AS_EATEN = 'MARK_AS_EATEN';

const date = '2023-01-05';
// const API_URL = 'http://10.0.2.2:3000';
const API_URL = `http://localhost:3000`;

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
                consumed_calories: data['consumed_calories']
            });
        }
    }catch (error) {
        console.log(error);
    }
}
export const markAsEaten = (meal_type, eaten, meal_calories) => {
    try {
        return async dispatch => {
            const response = await axios.post(`${API_URL}/recipes/markAsEaten`,
                {
                    date: date,
                    meal_type: meal_type,
                    eaten: eaten,
                    meal_calories: meal_calories,
                }
            );
            const new_consumed_calories = response.data.new_consumed_calories;
            dispatch({
                type: MARK_AS_EATEN,
                consumed_calories: new_consumed_calories,
            });
        }
    } catch (error) {
        console.log(error);
    }
}