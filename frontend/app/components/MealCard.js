import React from 'react';
import FullRecipeCard from "./FullRecipeCard";
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import COLORS from "../consts/colors";
import { getSustainableRecipes} from "../redux/actions";
import {useDispatch} from "react-redux";
import SustainableModal from "./SustainableModal";

const MealCard = ({recipe, meal_type}) => {
    const dispatch = useDispatch();
    const [sustainableRecipes, setSustainableRecipes] = React.useState([]);
    const [visibleFullRecipe, setFullVisible] = React.useState(false);
    const [visibleSustainableModal, setVisibleSustainableModal] = React.useState(false);

    const handleOpenFull = () => {
        setFullVisible(true);
    }

    const handleCloseFull = () => {
        setFullVisible(false);
    }

    const handleCloseSustainableModal = () => {
        setVisibleSustainableModal(false);
    }
    const handleOpenSustainableModal = () => {
        dispatch(getSustainableRecipes(recipe.recipe_id, meal_type, recipe.calories, recipe.score)).then(sustainableRecipes =>
            setSustainableRecipes(sustainableRecipes));
        setVisibleSustainableModal(true);
    }



    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={()=>handleOpenFull()}>
                <Image source={{uri:recipe.image}} style={styles.cardImage}/>
                <View style={styles.cardContent}>
                        <View style={styles.cardTextContent}>
                            <Text numberOfLines={2} style={styles.cardTitle}>{recipe.name}</Text>
                            <Text style={styles.cardSubtitle}>{recipe.calories + " קלוריות"}</Text>
                            {visibleFullRecipe && <FullRecipeCard visibleFullRecipe={visibleFullRecipe} handleCloseFull={handleCloseFull} recipe={recipe}/>}
                            {visibleSustainableModal && <SustainableModal visibleSustainableModal={visibleSustainableModal} handleCloseSustainableModal={handleCloseSustainableModal} recipes={sustainableRecipes}  meal_type={meal_type}/>}
                        </View>
                    <View style={styles.flowerContainer}>
                        <Ionicons name="flower-outline" size={22} style={styles.flowerIcon}/>
                        <Text style={styles.flowerText}>{recipe.score}</Text>
                        <MaterialCommunityIcons name="earth-plus" size={26} style={styles.plusIcon} onPress={handleOpenSustainableModal} />
                    </View>
                </View>
                <TouchableOpacity style={styles.moreContainer} onPress={()=>alert()}>
                    <Icon name="more-vert" size={25} style={styles.moreIcon} />
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
    moreIcon: {
        alignSelf: "flex-start",
        paddingTop: 5,
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
    moreContainer: {
        alignItems:"flex-start",
    },
    plusIcon: {
        color: COLORS.lightGreen,
    }
});

export default MealCard;
