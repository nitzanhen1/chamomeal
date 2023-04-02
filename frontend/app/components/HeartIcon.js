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

    const handleHeartIconPress = async () => {
        recipe.isFavorite = !recipe.isFavorite;
        setFavorite(recipe.isFavorite ? 'heart' : 'heart-outline')
        dispatch(addToFavorites(recipe, favorites, meals, searchResults )).then(success=>{
            if (!success){
                recipe.isFavorite = !recipe.isFavorite;
                setFavorite(recipe.isFavorite ? 'heart' : 'heart-outline')
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
        // alignSelf: "flex-end",
        // paddingTop: 10,
        // paddingLeft: 10,
    },
    heartContainer: {
        // backgroundColor: COLORS.lightGreen,
        width: '73%',
        bottom: 5
        // alignItems:"",
    }
});
export default HeartIcon;
