import React, {useState, useRef} from 'react';
import FullRecipeCard from "./FullRecipeCard";
import {View, Text, Image, StyleSheet, Button, TouchableOpacity, Animated} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Iconn from "react-native-vector-icons/MaterialCommunityIcons";
import {addToFavorites} from "../redux/actions";
import {useDispatch} from "react-redux";

const PreviewCard = ({props}) => {
    const [visibleFullRecipe, setFullVisible] = React.useState(false);
    const [recipe, setRecipe] = React.useState(props);
    const [favorite, setFavorite] = React.useState(recipe.isFavorite ? 'heart' : 'heart-outline')
    const dispatch = useDispatch();

    const handleOpenFull = () => {
        setFullVisible(true);
    }

    const handleCloseFull = () => {
        setFullVisible(false);
    }

    const handleIconPress = async () => {
        let recipeUpdated = recipe;
        recipeUpdated.isFavorite = !recipe.isFavorite;
        setFavorite(recipeUpdated.isFavorite ? 'heart' : 'heart-outline')
        setRecipe(recipeUpdated)
        dispatch(addToFavorites(recipe.recipe_id, recipeUpdated.isFavorite )).then(success=>{
            if (!success){
                recipeUpdated.isFavorite = !recipe.isFavorite;
                setFavorite(recipeUpdated.isFavorite ? 'heart' : 'heart-outline')
                setRecipe(recipeUpdated)
            }
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={()=>handleOpenFull()}>
                <Image source={{uri:recipe.image}} style={styles.cardImage}/>
                <View style={styles.cardContent}>
                    <View style={styles.cardTextContent}>
                        <Text numberOfLines={2} style={styles.cardTitle}>{recipe.name}</Text>
                        <Text style={styles.cardSubtitle}>{recipe.calories + " קלוריות"}</Text>
                        {visibleFullRecipe && <FullRecipeCard visibleFullRecipe={visibleFullRecipe} handleCloseFull={handleCloseFull} recipe={recipe}/>}
                    </View>
                    <View style={styles.flowerContainer}>
                        <Ionicons name="flower-outline" size={22} style={styles.flowerIcon}/>
                        <Text style={styles.flowerText}>{recipe.score}</Text>
                    </View>
                </View>
                <TouchableOpacity  style={styles.heartContainer} onPress={handleIconPress}>
                        <Iconn style={styles.heartIcon} name={favorite} size={32} color="#ff6666" />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    card: {
        height: 130,
        flexDirection: 'row',
        borderRadius:10,
        backgroundColor: "white",
        elevation: 5,
    },
    cardContent: {
        flex: 1,
        flexDirection: 'column',
    },
    cardTextContent: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 16,
        paddingLeft: 10
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '900',
        fontFamily: 'Rubik-Regular',
    },
    cardSubtitle: {
        marginTop: 3,
        fontSize: 15,
        fontFamily: 'Rubik-Regular',
    },
    cardImage: {
        width: 110,
        height: '85%',
        borderRadius: 8,
        marginLeft: 12,
        alignSelf: "center"
    },
    flowerContainer: {
        paddingHorizontal: 5,
        paddingVertical: 1,
        alignSelf: "flex-start",
        marginBottom: 6,
        marginLeft: 6,
        flexDirection: 'row',
        width: 40,
    },
    flowerIcon: {
        color:"black"
    },
    flowerText: {
        paddingHorizontal: 3,
        fontFamily: 'Rubik-Regular',
        fontSize: 17,
        color:"black",
        paddingTop: 3,
        marginRight:4,
    },
    heartIcon: {
        alignSelf: "flex-start",
        paddingTop: 10,
        paddingLeft: 10,
    },
    heartContainer: {
        alignItems:"flex-start",
    },
});

export default PreviewCard;
