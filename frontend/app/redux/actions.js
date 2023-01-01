// export const SET_USER_NAME = 'SET_USER_NAME';
// export const SET_USER_AGE = 'SET_USER_AGE';
// export const INCREASE_AGE = 'INCREASE_AGE';
// export const GET_CITIES = 'GET_CITIES';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';


export const GET_DAILY_MENU = 'GET_DAILY_MENU';

const API_URL = 'http://localhost:3000/recipes/getDailyMenu/2022-12-29';

export const getDailyMenu = () => {
    try{
        return async dispatch =>{
            const response = await axios.get(API_URL);
            const data = response.data;
            // console.log(data)
            // const {meals} = useSelector(state => state.userReducer);
            let mealsData = [
                {title: 'ארוחת בוקר', data:[]},
                {title: 'ארוחת צהריים', data: []},
                {title: 'ארוחת ערב',data:[]}]
            mealsData[0].data = data['breakfast']
            mealsData[1].data = data['lunch']
            mealsData[2].data = data['dinner']
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
    //             dispatch({
    //                 type: GET_DAILY_MENU,
    //                 payload: json
    //             });
    //         } else {
    //             console.log('Unable to fetch!');
    //         }
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
}

// export const setName = name => dispatch => {
//     dispatch({
//         type: SET_USER_NAME,
//         payload: name,
//     });
// };
//
// export const setAge = age => dispatch => {
//     dispatch({
//         type: SET_USER_AGE,
//         payload: age,
//     });
// };
//
// export const increaseAge = age => dispatch => {
//     dispatch({
//         type: INCREASE_AGE,
//         payload: age,
//     });
// };
