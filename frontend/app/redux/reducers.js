import {GET_DAILY_MENU, MARK_AS_EATEN} from './actions';

const initialState = {
    consumed_calories: 0,
    meals: [
        {title: 'ארוחת בוקר', data:[]},
        {title: 'ארוחת צהריים', data: []},
        {title: 'ארוחת ערב',data:[]}]
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DAILY_MENU:
            return { ...state, meals: action.meals, consumed_calories: action.consumed_calories };
        case MARK_AS_EATEN:
            return { ...state, consumed_calories: action.consumed_calories };
        default:
            return state;
    }
}

export default userReducer;