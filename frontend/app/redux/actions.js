import axios from "axios";

export const GET_DAILY_MENU = 'GET_DAILY_MENU';

const host = 'http://10.0.2.2:3000'
const API_URL = `https://localhost:3000/recipes/getDailyMenu/2022-12-29`;

export const getDailyMenu = () => {
    try{
        return async dispatch =>{
            const response = await axios.get(`${host}/recipes/getDailyMenu/2022-12-29`);
            const data = response.data;
            let mealsData = [
                {title: 'ארוחת בוקר', data:data['breakfast']},
                {title: 'ארוחת צהריים', data: data['lunch']},
                {title: 'ארוחת ערב',data:data['dinner']}]
            dispatch({
                type: GET_DAILY_MENU,
                payload: mealsData
            });
    }
    }catch (error) {
        console.log(error);
    }
    // try {
    //     return async dispatch => {
    //         const result = await fetch(API_URL, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         const json = await result.json();
    //         if (json) {
    //             let mealsData = [
    //                 {title: 'ארוחת בוקר', data:json['breakfast']},
    //                 {title: 'ארוחת צהריים', data: json['lunch']},
    //                 {title: 'ארוחת ערב',data:json['dinner']}]
    //             dispatch({
    //                 type: GET_DAILY_MENU,
    //                 payload: mealsData
    //             });
    //         } else {
    //             console.log('Unable to fetch!');
    //         }
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
}