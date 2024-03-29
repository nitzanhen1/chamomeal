import {Alert, StyleSheet, Text} from "react-native";
import React, {useEffect} from "react";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import {addToFavorites, replaceRecipe, setHeartAndChoose} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
const OptionsMenu = ({recipe, meal_type}) => {


    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {date} = useSelector(state => state.mealReducer);
    const [favIcon, setFavIcon] = React.useState(recipe.isFavorite ? 'heart-off-outline' : 'cards-heart-outline');
    const [favText, setFavText] = React.useState(recipe.isFavorite ? 'לא אהבתי' : 'אהבתי');
    const {meals, searchResults, favorites} =  useSelector(state => state.mealReducer);

    const changeFav = () =>{
        recipe.isFavorite = !recipe.isFavorite;
        setFavIcon(recipe.isFavorite ?  'heart-off-outline' : 'cards-heart-outline')
        setFavText(recipe.isFavorite ? 'לא אהבתי' : 'אהבתי')
    }
    const handleAddToFavorite = async () => {
        changeFav();
        let success = await dispatch(addToFavorites(recipe, favorites, meals, searchResults ))
        if (!success) {
            changeFav();
            Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                [{text: 'אוקיי', style: 'cancel'}],
                { cancelable: true });
        }
    }

    const handleReplaceByRandom = async () => {
        let result = await dispatch(replaceRecipe("replaceRecipeByRandom", 'random', recipe["recipe_id"], date, meal_type, recipe["score"]))
        if (!result) {
            Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                [{text: 'אוקיי', style: 'cancel'}],
                {cancelable: true});
        }
    }

    const handleReplaceBySearch = () => {
        dispatch(setHeartAndChoose(meal_type, recipe["score"], false, true));
        navigation.navigate("Search");
    }

    const handleReplaceByFavorite = () => {
        dispatch(setHeartAndChoose(meal_type, recipe["score"], false, true));
        navigation.navigate('Favorites');
    }

    useEffect(() => {
        setFavIcon(recipe.isFavorite ?  'heart-off-outline' : 'cards-heart-outline')
        setFavText(recipe.isFavorite ? 'לא אהבתי' : 'אהבתי')
    }, [recipe.isFavorite
    ]);


    return (
            <Menu>
                <MenuTrigger>
                    <MaterialIcons name="more-vert" size={25} color="black" style={styles.moreIcon} />
                </MenuTrigger>
                <MenuOptions
                    customStyles={styles.menuStyle}>
                    <MenuOption
                        onSelect={handleAddToFavorite}
                        customStyles={styles.optionStyle}>
                        <Text style={styles.optionText}>{favText}</Text>
                        <MaterialCommunityIcons name={favIcon} size={24} color="black" />
                    </MenuOption>
                    <MenuOption
                        disabled={!!recipe.eaten}
                        onSelect={handleReplaceByRandom}
                        customStyles={recipe.eaten ? styles.optionStyleDisable : styles.optionStyle}>
                        <Text style={styles.optionText}>תפתיעו אותי</Text>
                        <FontAwesome name="random" size={24} color="black" />
                    </MenuOption>
                    <MenuOption
                        disabled={!!recipe.eaten}
                        onSelect={handleReplaceBySearch}
                        customStyles={recipe.eaten ? styles.optionStyleDisable : styles.optionStyle}>
                        <Text style={styles.optionText}>חפש מתכון אחר</Text>
                        <MaterialCommunityIcons name="find-replace" size={24} color="black" />
                    </MenuOption>
                    <MenuOption
                        disabled={!!recipe.eaten}
                        onSelect={handleReplaceByFavorite}
                        customStyles={recipe.eaten ? styles.optionStyleDisable : styles.optionStyle}>
                        <Text style={styles.optionText}>החלף מהמועדפים</Text>
                        <Ionicons name="md-heart-circle-outline" size={24} color="black" />
                    </MenuOption>
                </MenuOptions>
            </Menu>
    );
};
export default OptionsMenu;

const styles = StyleSheet.create({
    menuStyle:{
        optionsContainer: {
            borderRadius: 10,
            marginTop: 20,
            marginRight: 20,
            width:"40%"
        }
    },
    optionStyle:{
        optionWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: 1,
        },
    },
    optionStyleDisable:{
        optionWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: 0.2,
        },
    },
    moreIcon: {
        marginTop: 7,
    },
    optionText:{
        fontFamily: 'Rubik-Regular'
    }
});