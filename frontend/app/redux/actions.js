import axios from "axios";

export const GET_DAILY_MENU = 'GET_DAILY_MENU';
export const SET_DAILY_MENU = 'SET_DAILY_MENU';
export const MARK_AS_EATEN = 'MARK_AS_EATEN';
export const GET_GLOBAL_DETAILS = 'GET_GLOBAL_DETAILS';
export const GET_Q_DETAILS = 'GET_Q_DETAILS';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const SET_FOOD_PREFERENCE = 'SET_FOOD_PREFERENCE';
export const SET_ACTIVITY_PREFERENCE = 'SET_ACTIVITY_PREFERENCE';
export const SET_PERSONAL_DETAILS = 'SET_PERSONAL_DETAILS';
export const UPDATE_USER_PREFERENCES = 'UPDATE_USER_PREFERENCES';
export const UPDATE_BADGES = 'UPDATE_BADGES';
export const SET_EARNED = 'SET_EARNED';
export const SET_REPLACED = 'SET_REPLACED';
export const LOGOUT = 'LOGOUT';
export const GET_FAVORITES = 'GET_FAVORITES';
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
export const SET_FAVORITE_TO_RECIPES = 'SET_FAVORITE_TO_RECIPES';
export const SET_HEART_AND_CHOOSE = 'SET_HEART_AND_CHOOSE';
export const SET_DATE = 'SET_DATE';
export const SET_SHOW_TUTORIAL = 'SET_SHOW_TUTORIAL';
export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS';

const API_URL = 'http://10.0.2.2:3000'; //localhost
// const API_URL = 'https://chamomeal.cs.bgu.ac.il'; //remote backend

export const getDailyMenu = (date) => {
    try{
        return async dispatch =>{
            try {
                const date_today = date.toISOString().substring(0, 10);
                const response = await axios.get(`${API_URL}/recipes/getDailyMenu/${date_today}`);
                const data = response.data;
                let mealsData = [
                    {title: 'ארוחת בוקר', mealData: data['breakfast']},
                    {title: 'ארוחת צהריים', mealData: data['lunch']},
                    {title: 'ארוחת ערב', mealData: data['dinner']}]
                dispatch({
                    type: GET_DAILY_MENU,
                    meals: mealsData,
                    consumed_calories: data['consumed_calories'],
                    total_calories: data['total_calories'],
                    replaced: false
                });
                if (data['badges'] != null) {
                    dispatch({
                        type: UPDATE_BADGES,
                        badges: data['badges'],
                        earned: data['earned'],
                    });
                }
                return true;
            }catch (error){
                if(error.response) {
                    if(error.response.status === 419){
                        dispatch({
                            type: LOGOUT,
                        });
                    }
                }
                return false;
            }
        }
    }catch (error) {
        console.log(error);
    }
}
export const markAsEaten = (meal_type, eaten, meal_calories, meal_score, date) => {
    try {
        return async dispatch => {
            try{
                const date_today = date.toISOString().substring(0, 10);
                const response = await axios.post(`${API_URL}/recipes/markAsEaten`,
                    {
                        date: date_today,
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
                if (data['badges'] != null) {
                    dispatch({
                        type: UPDATE_BADGES,
                        badges: data['badges'],
                        earned: data['earned'],
                    });
                }
                return true
            }catch (error){
                if(error.response) {
                    if(error.response.status === 419){
                        dispatch({
                            type: LOGOUT,
                        });
                    }
                    return false;
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}
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
                return response.status;
            }catch (error){
                if(error.response) {
                    return error.response.status;
                }
            }
        }
    }catch (error) {
        console.log(error)
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
                return response.status;
            }catch (error){
                if(error.response) {
                    return error.response.status;
                }
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
                if(response.status===200){
                    dispatch({
                        type: LOGOUT,
                    });
                    return true;
                }
            }catch (error){
                dispatch({
                    type: LOGOUT,
                });
                return false;
            }
        }
    }catch (error) {
        console.log(error);
    }
}

export const getGlobalDetails = () => {
    try{
        return async dispatch =>{
            try {
                const response = await axios.get(`${API_URL}/user/getGlobalDetails`);
                const data = response.data;

                dispatch({
                    type: GET_GLOBAL_DETAILS,
                    first_name: data['first_name'],
                    score: data['total_score'],
                    badges: data['badges'],
                    EER: data['EER'],
                    kosher: data['kosher'],
                    vegetarian: data['vegetarian'],
                    vegan: data['vegan'],
                    gluten_free: data['gluten_free'],
                    without_lactose: data['without_lactose']
                });
                return response.status;
            }catch (error){
                if(error.response) {
                    dispatch({
                        type: LOGOUT,
                    });
                    return error.response.status;
                }
            }
        }
    }catch (error) {
        console.log(error);
    }
}

export const getUserDetails = () => {
    try{
        return async dispatch =>{
            try{
                const response = await axios.get(`${API_URL}/user/getUserDetails`);
                const data = response.data;

                dispatch({
                    type: GET_USER_DETAILS,
                    first_name: data['first_name'],
                    last_name: data['last_name'],
                    email: data['email'],
                });
                return true;
            }catch (error) {
                if(error.response) {
                    if(error.response.status === 419){
                        dispatch({
                            type: LOGOUT,
                        });
                    }
                }
                return false;
            }
        }
    }catch (error) {
        console.log(error);
    }
}

export const getQuestionnaireDetails = () => {
    try{
        return async dispatch =>{
            try{
                const response = await axios.get(`${API_URL}/user/getPreferences`);
                const data = response.data;
                dispatch({
                    type: GET_Q_DETAILS,
                    gender: data['gender'].toString(),
                    year_of_birth: data['year_of_birth'].toString(),
                    height: data['height'].toString(),
                    weight: data['weight'].toString(),
                    physical_activity: data['physical_activity'],
                    kosher: data['kosher'],
                    vegetarian: data['vegetarian'],
                    vegan: data['vegan'],
                    gluten_free: data['gluten_free'],
                    without_lactose: data['without_lactose'],
                });
                return true;
            }catch (error) {
                if(error.response) {
                    if(error.response.status === 419){
                        dispatch({
                            type: LOGOUT,
                        });
                    }
                }
                return false;
            }
        }
    }catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateUserPreferences = (year_of_birth, height, weight, gender, physical_activity, vegan, vegetarian, without_lactose, gluten_free, kosher) => {
    try{
        return async dispatch =>{
            try{
                const response = await axios.post(`${API_URL}/user/updatePreferences`,
                    {
                        gender: gender,
                        year_of_birth: year_of_birth,
                        height: height,
                        weight:weight,
                        kosher:kosher,
                        vegetarian:vegetarian,
                        vegan:vegan,
                        gluten_free:gluten_free,
                        without_lactose:without_lactose,
                        physical_activity:physical_activity
                    });
                const data = response.data;
                dispatch({
                    type: UPDATE_USER_PREFERENCES,
                    // preferences: data
                });
                return true;

            }catch (error) {
                if(error.response) {
                    if(error.response.status === 419){
                        dispatch({
                            type: LOGOUT,
                        });
                    }
                }
                return false;
            }

        }
    }catch (error) {
        console.log(error);
    }
}
export const updatePassword = (old_pass, new_pass) => {
    try{
        return async dispatch =>{
            try {
                const response = await axios.post(`${API_URL}/user/updatePassword`,
                    {
                        old_pass: old_pass,
                        new_pass: new_pass,
                    });
                return response.status;
            }catch (error){
                if(error.response) {
                    if(error.response.status === 419){
                        dispatch({
                            type: LOGOUT,
                        });
                    }
                    return error.response.status;
                }
            }
        }
    }catch (error) {
        console.log(error);
    }
}

export const updateUserDetails = (first_name, last_name, email) => {
    try{
        return async dispatch =>{
            try {
                const response = await axios.post(`${API_URL}/user/updateUserDetails`,
                    {
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                    });
                if(response.status===202){
                    await dispatch({
                        type: UPDATE_USER_DETAILS,
                        first_name: first_name,
                    });
                    return true;}
            }catch (error){
                if(error.response) {
                    if(error.response.status === 419){
                        dispatch({
                            type: LOGOUT,
                        });
                    }
                }
                return false;
            }
        }
    }catch (error) {
        console.log(error);
    }
}

export const setFoodPreference = (newFood) =>{
    return async dispatch => {
        await dispatch({
            type: SET_FOOD_PREFERENCE,
            vegan: newFood.vegan2,
            vegetarian: newFood.vegetarian2,
            without_lactose: newFood.without_lactose2,
            gluten_free: newFood.gluten_free2,
            kosher: newFood.kosher2
        });
    }
}

export const setPhysicalActivity = (newPhysicalActivity) =>{
    return async dispatch => {
        dispatch({
            type: SET_ACTIVITY_PREFERENCE,
            physical_activity: newPhysicalActivity,
        });
    }
}

export const setPersonalDetails = (newPersonalDetails) =>{
    return async dispatch => {
        dispatch({
            type: SET_PERSONAL_DETAILS,
            height: newPersonalDetails.newHeight,
            weight: newPersonalDetails.newWeight,
            year_of_birth: newPersonalDetails.newBirthYear,
            gender: newPersonalDetails.newGender,
        });
    }
}

export const setEarned = (earned) =>{
    return async dispatch => {
        dispatch({
            type: SET_EARNED,
            earned: earned,
        });
    }
}

export const setReplaced = (replaced) =>{
    return async dispatch => {
        dispatch({
            type: SET_REPLACED,
            replaced: replaced,
        });
    }
}

export const getFavorites = () =>{
    try{
        return async dispatch =>{
            try{
                const response = await axios.get(`${API_URL}/recipes/getFavorites`);
                const data = response.data;
                dispatch({
                    type: GET_FAVORITES,
                    favorites: data,
                });
                return true;
            }catch (error){
                if(error.response) {
                    if(error.response.status === 419){
                        dispatch({
                            type: LOGOUT,
                        });
                    }
                }
                return false;
            }
        }
    }catch (error) {
        console.log(error);
    }
}


export const addToFavorites = (recipe, favorites, meals, searchResults) =>{
    try{
        return async dispatch =>{
            try{
                let recipe_id = recipe["recipe_id"]
                let isFavorite = recipe["isFavorite"]
                const response = await axios.post(`${API_URL}/recipes/addToFavorites`,
                    {
                        recipe_id : recipe_id,
                        is_favorite: isFavorite
                    });
                if(response.status===201){
                    if(meals){
                        for(let i=0; i<meals.length; i++){
                            if(meals[i]["mealData"]["recipe_id"]==recipe_id){
                                meals[i]["mealData"]["isFavorite"] = isFavorite;
                            }
                        }
                    }
                    if(searchResults){
                        for(let i=0; i<searchResults.length; i++){
                            if(searchResults[i]["recipe_id"]==recipe_id){
                                searchResults[i]["isFavorite"] = isFavorite;
                            }
                        }
                    }
                    if(isFavorite){
                        favorites.unshift(recipe);
                    }
                    else{
                        favorites = favorites.filter(item => item["recipe_id"] !== recipe_id)
                    }
                    dispatch({
                        type: SET_FAVORITE_TO_RECIPES,
                        meals: meals,
                        searchResults: searchResults,
                        favorites: favorites
                    });
                    return true;
                }
                return false;
            }catch (error){
                if(error.response) {
                    if(error.response.status === 419){
                        dispatch({
                            type: LOGOUT,
                        });
                    }
                }
                return false;
            }

        }
    }catch (error) {
        console.log(error);
    }
}

export const search = (searchQuery, onlyIngredients, without_lactose, gluten_free, vegan, vegetarian, kosher, breakfast, lunch, dinner) =>{
    try{
        return async dispatch =>{
            try{
                const response = await axios.get(`${API_URL}/search`,
                    {
                        params: {
                            searchQuery: searchQuery,
                            onlyIngredients: onlyIngredients,
                            without_lactose: without_lactose,
                            gluten_free: gluten_free,
                            vegan: vegan,
                            vegetarian: vegetarian,
                            kosher: kosher,
                            breakfast: breakfast,
                            lunch: lunch,
                            dinner: dinner
                        }});
                const data = response.data;
                dispatch({
                    type: GET_SEARCH_RESULTS,
                    searchResults: data,
                });
                return data;
            }catch (error){
                if(error.response) {
                    if(error.response.status === 419){
                        dispatch({
                            type: LOGOUT,
                        });
                    }
                }
                return {length:0}
            }
        }
    }catch (error) {
        console.log(error);
    }
}

export const getSustainableRecipes = (recipe_id, meal_type, meal_score) =>{
    try{
        return async dispatch =>{
            try{
                const response = await axios.post(`${API_URL}/recipes/getSustainableRecipes`,
                    {
                        recipe_id: recipe_id,
                        meal_type: meal_type,
                        meal_score: meal_score
                    });
                const data = response.data;
                return data;
            }catch (error){
                if(error.response) {
                    if(error.response.status === 419){
                        dispatch({
                            type: LOGOUT,
                        });
                    }
                }
                return false;
            }
        }
    }catch (error) {
        console.log(error);
    }
}

export const replaceRecipe = (api_replace,from, recipe_id, date, meal_type, replacement_score) =>{
    try{
        return async dispatch =>{
            try{
                const date_str = date.toISOString().substring(0, 10);
                const response = await axios.post(`${API_URL}/recipes/${api_replace}`,
                    {
                        recipe_id: recipe_id,
                        date: date_str,
                        meal_type: meal_type,
                        replacement_score: replacement_score,
                        from: from,
                    });
                if(response.status===202) {
                    const data = response.data['dailyMenu'];
                    let mealsData = [
                        {title: 'ארוחת בוקר', mealData:data['breakfast']},
                        {title: 'ארוחת צהריים', mealData: data['lunch']},
                        {title: 'ארוחת ערב',mealData:data['dinner']}];
                    dispatch({
                        type: GET_DAILY_MENU,
                        meals: mealsData,
                        consumed_calories: data['consumed_calories'],
                        total_calories: data['total_calories'],
                        replaced: true,
                    });
                    const badgesData = response.data;
                    if (badgesData['badges'] != null) {
                        dispatch({
                            type: UPDATE_BADGES,
                            badges: badgesData['badges'],
                            earned: badgesData['earned'],
                        });
                    }
                    return true;
                }
                return false;
            }catch (error){
                if(error.response) {
                    if(error.response.status === 419){
                        dispatch({
                            type: LOGOUT,
                        });
                    }
                }
                return false;
            }
        }
    }catch (error) {
        console.log(error);
    }
}


export const setHeartAndChoose = (meal_type, meal_score, heartIcon, chooseButton) =>{
        return async dispatch =>{
                dispatch({
                    type: SET_HEART_AND_CHOOSE,
                    meal_type: meal_type,
                    meal_score: meal_score,
                    heartIcon: heartIcon,
                    chooseButton: chooseButton
                });
            }
}

export const resetSearch = () =>{
        return async dispatch =>{
            dispatch({
                type: GET_SEARCH_RESULTS,
                searchResults: [],
            });
            }
}

export const setShowTutorial = (showTutorial) =>{
    return async dispatch =>{
        dispatch({
            type: SET_SHOW_TUTORIAL,
            showTutorial: showTutorial,
        });
    }
}

export const forgotPassword = (email) =>{
    try{
        return async dispatch =>{
            try {
                const response = await axios.post(`${API_URL}/auth/forgotPassword`,
                    {
                        email: email
                    });
                return response.status;
            }catch (error){
                if(error.response) {
                    if(error.response.status === 419){
                        dispatch({
                            type: LOGOUT,
                        });
                    }
                    return error.response.status;
                }
            }
        }
    }catch (error) {
        console.log(error);
    }
}
export const verifyResetPasswordCode = (email, code) =>{
    try{
        return async dispatch =>{
            try {
                const response = await axios.post(`${API_URL}/auth/verifyResetPasswordCode`,
                    {
                        email: email,
                        code: code
                    });
                return response.status;
            }catch (error){
                if(error.response) {
                    if(error.response.status === 419){
                        dispatch({
                            type: LOGOUT,
                        });
                    }
                    return error.response.status;
                }
            }
        }
    }catch (error) {
        console.log(error);
    }
}

export const resetPassword = (email, newPassword) =>{
    try{
        return async dispatch =>{
            try {
                const response = await axios.post(`${API_URL}/auth/resetPassword`,
                    {
                        email: email,
                        newPassword: newPassword
                    });
                if(response.status===202){
                    return true;}
            }catch (error){
                if(error.response.status === 419){
                    dispatch({
                        type: LOGOUT,
                    });
                }
                return false;
            }
        }
    }catch (error) {
        console.log(error);
    }
}

export const regenerateDailyMenu = (date) => {
    try{
        return async dispatch =>{
            try {
                const date_today = date.toISOString().substring(0, 10);
                const response = await axios.post(`${API_URL}/recipes/regenerateDailyMenu/${date_today}`,{});
                const data = response.data;
                let mealsData = [
                    {title: 'ארוחת בוקר', mealData: data['breakfast']},
                    {title: 'ארוחת צהריים', mealData: data['lunch']},
                    {title: 'ארוחת ערב', mealData: data['dinner']}]
                dispatch({
                    type: GET_DAILY_MENU,
                    meals: mealsData,
                    consumed_calories: data['consumed_calories'],
                    total_calories: data['total_calories'],
                    replaced: false
                });
                dispatch({
                    type: MARK_AS_EATEN,
                    consumed_calories: data['consumed_calories'],
                    score: data['new_score'],
                });
                if (data['badges'] != null) {
                    dispatch({
                        type: UPDATE_BADGES,
                        badges: data['badges'],
                        earned: data['earned'],
                    });
                }
                return response.status;
            }catch (error){
                if(error.response) {
                    return error.response.status;
                }
            }
        }
    }catch (error) {
        console.log(error);
    }
}
