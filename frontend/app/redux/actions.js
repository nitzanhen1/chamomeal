import axios from "axios";

export const GET_DAILY_MENU = 'GET_DAILY_MENU';
export const MARK_AS_EATEN = 'MARK_AS_EATEN';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const GET_USER_PREFERENCES = 'GET_USER_PREFERENCES';
export const LOGOUT = 'LOGOUT';

const date = '2023-01-05';
// const API_URL = 'http://10.0.2.2:3000';
const API_URL = `http://localhost:3000`;

export const register = (username, first_name, last_name, password, email) => {
    try{
        return async dispatch =>{
            try {
                const response = await axios.post(`${API_URL}/auth/register`,
                    {
                        username: username,
                        first_name: first_name,
                        last_name: last_name,
                        password: password,
                        email: email,
                    });
                if(response.status==201){
                    return true;}
            }catch (error){
                return false;
            }
        }
    }catch (error) {
        return false;
    }
}

export const login = (username, password) => {
    try{
        return async dispatch =>{
            try {
                const response = await axios.post(`${API_URL}/auth/login`,
                    {
                        username: username,
                        password: password,
                    });
                if(response.status==200){
                    return true;
                }
                else if(response.status==200){
                    return false;
                }
            }catch (error){
                throw error;
            }
        }
    }catch (error) {
        console.log(error);
    }
}
export const logout = () => {
    try{
        return async dispatch =>{
            try {
                const response = await axios.post(`${API_URL}/auth/logout`);
                if(response.status==200){
                    dispatch({
                        type: LOGOUT,
                    });
                    return true;
                }
            }catch (error){
                return false;
            }
        }
    }catch (error) {
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

export const updateUserPreferences = (preferences) => {
    try{
        return async dispatch =>{
            const response = await axios.post(`${API_URL}/user/updatePreferences`,
                {
                    gender: false,
                    date_of_birth: "2000-06-01",
                    height: 165,
                    weight:55,
                    kosher:false,
                    vegetarian:true,
                    vegan:false,
                    gluten_free:false,
                    without_lactose:true,
                    physical_activity:"low active"
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