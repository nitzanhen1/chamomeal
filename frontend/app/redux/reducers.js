import {
    GET_DAILY_MENU,
    SET_DAILY_MENU,
    MARK_AS_EATEN,
    GET_GLOBAL_DETAILS,
    GET_Q_DETAILS,
    SET_FOOD_PREFERENCE,
    SET_ACTIVITY_PREFERENCE,
    SET_PERSONAL_DETAILS,
    UPDATE_USER_PREFERENCES,
    LOGOUT, UPDATE_BADGES, SET_EARNED, GET_USER_DETAILS,
    GET_FAVORITES,
    GET_SEARCH_RESULTS,
    SET_FAVORITE_TO_RECIPES,
    SET_HEART_AND_CHOOSE,
} from './actions';

const initialState = {
    first_name: "",
    last_name: "",
    email: "",
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
    year_of_birth: '',
    height: '',
    weight: '',
    gender: '',
    physical_activity: '',
    vegan: false,
    vegetarian: false,
    without_lactose: false,
    gluten_free: false,
    kosher: false,
    favorites: [],
    searchResults: [],
    heartIcon: true,
    chooseButton: false,
    meal_type:"",
    meal_score:0,
}

function mealReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GLOBAL_DETAILS:
            return { ...state, first_name: action.first_name, score: action.score, badges: action.badges, EER: action.EER, vegan: action.vegan, vegetarian: action.vegetarian, without_lactose: action.without_lactose,
                gluten_free: action.gluten_free, kosher: action.kosher}
        case GET_Q_DETAILS:
            return { ...state, gender: action.gender, year_of_birth: action.year_of_birth, height: action.height, weight: action.weight, physical_activity: action.physical_activity, vegan: action.vegan, vegetarian: action.vegetarian, without_lactose: action.without_lactose,
                gluten_free: action.gluten_free, kosher: action.kosher}
        case GET_USER_DETAILS:
            return { ...state, first_name: action.first_name, last_name: action.last_name, email: action.email};
        case GET_DAILY_MENU:
            return { ...state, meals: action.meals, consumed_calories: action.consumed_calories, total_calories: action.total_calories };
        case SET_DAILY_MENU:
            return { ...state, meals: action.meals};
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
            return { ...state, year_of_birth: action.year_of_birth, height:action.height, weight: action.weight, gender: action.gender};
        case UPDATE_USER_PREFERENCES:
            return state;
        case GET_FAVORITES:
            return { ...state, favorites: action.favorites};
        case GET_SEARCH_RESULTS:
            return { ...state, searchResults: action.searchResults};
        case SET_FAVORITE_TO_RECIPES:
            return { ...state, meals: action.meals, searchResults: action.searchResults, favorites: action.favorites};
        case SET_HEART_AND_CHOOSE:
            return { ...state, meal_type: action.meal_type, meal_score: action.meal_score, heartIcon: action.heartIcon, chooseButton: action.chooseButton};
        default:
            return state;
    }
}

export default mealReducer;