import { StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react';
import {addToFavorites} from "../redux/actions";
import Iconn from "react-native-vector-icons/MaterialCommunityIcons";
import {useDispatch, useSelector} from "react-redux";
import COLORS from "../consts/colors";

const HeartIcon = ({recipe}) => {

    const dispatch = useDispatch();
    const [favorite, setFavorite] = React.useState(recipe.isFavorite ? 'heart' : 'heart-outline');
    const {meals, searchResults, favorites} =  useSelector(state => state.mealReducer);

    const changeFav = () =>{
        recipe.isFavorite = !recipe.isFavorite;
        setFavorite(recipe.isFavorite ? 'heart' : 'heart-outline')
    }
    const handleHeartIconPress = async () => {
        changeFav();
        dispatch(addToFavorites(recipe, favorites, meals, searchResults )).then(async success => {
            if (!success) {
                changeFav();
            }
        });}


    return (
        <TouchableOpacity  style={styles.heartContainer} onPress={handleHeartIconPress}>
            <Iconn style={styles.heartIcon} name={favorite} size={32} color={COLORS.heart} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    heartIcon: {
    },
    heartContainer: {
        bottom: 5,
        right: 5,
    }
});
export default HeartIcon;
