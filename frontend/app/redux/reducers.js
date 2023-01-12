import {GET_DAILY_MENU, MARK_AS_EATEN} from './actions';
const today = new Date()

const initialState = {
    consumed_calories: 0,
    meals: [
        {title: 'ארוחת בוקר', mealData:{}},
        {title: 'ארוחת צהריים', mealData: {}},
        {title: 'ארוחת ערב',mealData: {}}],
    date: today
}

function mealReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DAILY_MENU:
            return { ...state, meals: action.meals, consumed_calories: action.consumed_calories };
        case MARK_AS_EATEN:
            return { ...state, consumed_calories: action.consumed_calories };
        default:
            return state;
    }
}

export default mealReducer;