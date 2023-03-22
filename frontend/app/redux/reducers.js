import {
    GET_DAILY_MENU,
    MARK_AS_EATEN,
    GET_USER_DETAILS,
    GET_Q_DETAILS,
    SET_FOOD_PREFERENCE,
    SET_ACTIVITY_PREFERENCE,
    SET_PERSONAL_DETAILS,
    UPDATE_USER_PREFERENCES,
    GET_USER_PREFERENCES,
    LOGOUT, UPDATE_BADGES, SET_EARNED
} from './actions';

const initialState = {
    user_name: "",
    badges: [],
    earned: false,
    EER: 0,
    score: 0,
    consumed_calories: 0,
    total_calories: 0,
    meals: [
        {title: 'ארוחת בוקר', mealData:{}},
        {title: 'ארוחת צהריים', mealData: {}},
        {title: 'ארוחת ערב',mealData: {}}],
    date: new Date(),
    date_of_birth: new Date(new Date().setFullYear(new Date().getFullYear() + -16)),
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
            return { ...state, user_name: action.user_name, score: action.score, badges: action.badges, EER: action.EER}
        case GET_Q_DETAILS:
            return { ...state, gender: action.gender, date_of_birth: action.date_of_birth, height: action.height, weight: action.weight, physical_activity: action.physical_activity, vegan: action.vegan, vegetarian: action.vegetarian, without_lactose: action.without_lactose,
                gluten_free: action.gluten_free, kosher: action.kosher}
        case GET_USER_PREFERENCES:
            return;
        case GET_DAILY_MENU:
            return { ...state, meals: action.meals, consumed_calories: action.consumed_calories, total_calories: action.total_calories };
        case MARK_AS_EATEN:
            return { ...state, consumed_calories: action.consumed_calories, score: action.score };
        case UPDATE_BADGES:
            return { ...state, badges: action.badges, earned: action.earned };
        case SET_EARNED:
            return { ...state, earned: action.earned };
        case LOGOUT:
            return initialState;
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