import {
    GET_DAILY_MENU,
    MARK_AS_EATEN,
    GET_USER_DETAILS,
    GET_USER_PREFERENCES,
    LOGOUT
} from './actions';

const initialState = {
    user_name: "",
    EER: 0,
    score: 0,
    consumed_calories: 0,
    total_calories: 0,
    meals: [
        {title: 'ארוחת בוקר', mealData:[]},
        {title: 'ארוחת צהריים', mealData: []},
        {title: 'ארוחת ערב',mealData:[]}]
}

function mealReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DETAILS:
            return { ...state, user_name: action.user_name, score: action.score, EER: action.EER}
        case GET_USER_PREFERENCES:
            return;
        case GET_DAILY_MENU:
            return { ...state, meals: action.meals, consumed_calories: action.consumed_calories, total_calories: action.total_calories };
        case MARK_AS_EATEN:
            return { ...state, consumed_calories: action.consumed_calories, score: action.score };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default mealReducer;