import {GET_DAILY_MENU} from './actions';

const initialState = {
    meals: [
        {title: 'ארוחת בוקר', data:[]},
        {title: 'ארוחת צהריים', data: []},
        {title: 'ארוחת ערב',data:[]}]
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DAILY_MENU:
            return { ...state, meals: action.payload };
        default:
            return state;
    }
}

export default userReducer;