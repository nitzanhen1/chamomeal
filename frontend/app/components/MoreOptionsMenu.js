import { StyleSheet, Text} from "react-native";
import React from "react";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import {addToFavorites, replaceRecipe} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";

const OptionsMenu = ({recipe, meal_type}) => {


    const dispatch = useDispatch();
    const {date} = useSelector(state => state.mealReducer);
    const [favIcon, setFavIcon] = React.useState(recipe.isFavorite ? 'cards-heart' : 'cards-heart-outline');
    const [favText, setFavText] = React.useState(recipe.isFavorite ? 'הסרה מהמועדפים' : 'הוספה למועדפים');
    const {meals, searchResults, favorites} =  useSelector(state => state.mealReducer);

    const changeFav = () =>{
        recipe.isFavorite = !recipe.isFavorite;
        setFavIcon(recipe.isFavorite ? 'cards-heart' : 'cards-heart-outline')
        setFavText(recipe.isFavorite ? 'הסרה מהמועדפים' : 'הוספה למועדפים')
    }
    const handleAddToFavorite = async () => {
        changeFav();
        dispatch(addToFavorites(recipe, favorites, meals, searchResults )).then(async success => {
            if (!success) {
                changeFav();
            }
        });
    }

    const handleReplaceByRandom = () => {
        dispatch(replaceRecipe("replaceRecipeByRandom", recipe["recipe_id"], date, meal_type, recipe["calories"])).then();
    }

    const handleReplaceBySearch = () => {
    }

    const handleReplaceByFavorite = () => {

    }


    return (
            <Menu>
                <MenuTrigger>
                    <MaterialIcons name="more-vert" size={25} color="black" style={styles.moreIcon} />
                </MenuTrigger>
                <MenuOptions
                    customStyles={{
                        optionsContainer: {
                            borderRadius: 10,
                            marginTop: -45,
                            marginRight: 30,
                        },
                    }}>
                    <MenuOption
                        onSelect={handleAddToFavorite}
                        customStyles={styles.optionStyle}>
                        <Text>{favText}</Text>
                        <MaterialCommunityIcons name={favIcon} size={24} color="black" />
                    </MenuOption>
                    <MenuOption
                        onSelect={handleReplaceByRandom}
                        customStyles={styles.optionStyle}>
                        <Text>הגרל מתכון רנדומלי</Text>
                        <FontAwesome name="random" size={24} color="black" />
                    </MenuOption>
                    <MenuOption
                        onSelect={handleReplaceBySearch}
                        customStyles={styles.optionStyle}>
                        <Text>חפש מתכון אחר</Text>
                        <MaterialCommunityIcons name="find-replace" size={24} color="black" />
                    </MenuOption>
                    <MenuOption
                        onSelect={handleReplaceByFavorite}
                        customStyles={styles.optionStyle}>
                        <Text>החלף מהמועדפים</Text>
                        <Ionicons name="md-heart-circle-outline" size={24} color="black" />
                    </MenuOption>
                </MenuOptions>
            </Menu>
    );
};
export default OptionsMenu;

const styles = StyleSheet.create({
    optionStyle:{
        optionWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
    },
    moreIcon: {
        marginTop: 7,
    }
});