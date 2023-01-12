import {
    GET_DAILY_MENU,
    MARK_AS_EATEN,
    GET_USER_DETAILS,
    SET_VEGETARIAN,
    SET_FOOD_PREFERENCE,
    SET_ACTIVITY_PREFERENCE,
    SET_PERSONAL_DETAILS, UPDATE_USER_PREFERENCES
} from './actions';
const today = new Date()

const initialState = {
    user_name: "",
    EER: 0,
    score: 0,
    consumed_calories: 0,
    total_calories: 0,
    meals: [
        {title: 'ארוחת בוקר', mealData:{}},
        {title: 'ארוחת צהריים', mealData: {}},
        {title: 'ארוחת ערב',mealData: {}}],
    date: today,
    date_of_birth: '',
    height: 0,
    weight: 0,
    gender: '',
    physical_activity: '',
    vegan: false,
    vegetarian: false,
    without_lactose: false,
    gluten_free: false,
    kosher: false
}

function mealReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DETAILS:
            return { ...state, user_name: action.user_name, score: action.score, EER: action.EER}
        case GET_DAILY_MENU:
            return { ...state, meals: action.meals, consumed_calories: action.consumed_calories, total_calories: action.total_calories };
        case MARK_AS_EATEN:
            return { ...state, consumed_calories: action.consumed_calories, score: action.score };
        case SET_VEGETARIAN:
            return { ...state, vegetarian: action.vegetarian};
        case SET_FOOD_PREFERENCE:
            return { ...state, vegan: action.vegan, vegetarian: action.vegetarian, without_lactose: action.without_lactose,
                gluten_free: action.gluten_free, kosher: action.kosher};
        case SET_ACTIVITY_PREFERENCE:
            return { ...state, physical_activity: action.physical_activity};
        case SET_PERSONAL_DETAILS:
            return { ...state, date_of_birth: action.date_of_birth, height:action.height, weight: action.weight, gender: action.gender};
        case UPDATE_USER_PREFERENCES:
            return state;
        default:
            return state;
    }
}

export default mealReducer;