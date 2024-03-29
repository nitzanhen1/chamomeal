import React from 'react';
import FullRecipeCard from "./FullRecipeCard";
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Entypo, Ionicons} from "@expo/vector-icons";
import MoreOptionsMenu from "./MoreOptionsMenu";
import {getSustainableRecipes, setHeartAndChoose} from "../redux/actions";
import {useDispatch} from "react-redux";
import SustainableModal from "./SustainableModal";
import COLORS from "../consts/colors";

const MealCard = ({recipe, meal_type}) => {
    const dispatch = useDispatch();
    const [sustainableRecipes, setSustainableRecipes] = React.useState([]);
    const [visibleFullRecipe, setFullVisible] = React.useState(false);
    const [visibleSustainableModal, setVisibleSustainableModal] = React.useState(false);

    const handleOpenFull = () => {setFullVisible(true);}
    const handleCloseFull = () => {setFullVisible(false);}

    const handleCloseSustainableModal = () => {
        dispatch(setHeartAndChoose("", recipe["score"], true, false));
        setVisibleSustainableModal(false);
    }
    const handleOpenSustainableModal = async () => {
        dispatch(setHeartAndChoose(meal_type, recipe["score"], false, true));
        await getMoreSustainableRecipes();
        setVisibleSustainableModal(true);
    }

    const getMoreSustainableRecipes = async () => {
        let sustainableRecipes =  await dispatch(getSustainableRecipes(recipe.recipe_id, meal_type, recipe.score))
        if (sustainableRecipes){
            setSustainableRecipes(sustainableRecipes)
        }else{
            Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                [{text: 'אוקיי', style: 'cancel'}],
                { cancelable: true });
        }
    }

    const getNumberTextColor = (number) => {
        switch (number) {
            case 1:
                return COLORS.flower1;
            case 2:
                return COLORS.flower2;

            case 3:
                return COLORS.flower3;
            case 4:
                return COLORS.flower4;
            case 5:
                return COLORS.flower5;
            case 6:
                return COLORS.flower6;
            case 7:
                return COLORS.flower7;
            case 8:
                return COLORS.flower8;
            case 9:
                return COLORS.flower9;
            case 10:
                return COLORS.flower10;
            default:
                return 'black';
        }
    };



    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={()=>handleOpenFull()}>
                <Image source={{uri:recipe.image}} style={styles.cardImage}/>
                <View style={styles.cardContent}>
                        <View style={styles.cardTextContent}>
                            <Text numberOfLines={2} style={styles.cardTitle}>{recipe.name}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.cardSubtitle}>{recipe.calories + " קלוריות"}</Text>
                                <Text style={styles.cardSubtitle}>·</Text>
                                <View style={{flexDirection: 'row'}}>
                                        <Entypo name="tree" size={16} style={{color:"black", paddingLeft: 4, paddingRight: 3}}/>
                                        <Text style={styles.cardSubtitle}>{recipe.GHG_per_unit + " GHG"}</Text>
                                </View>
                            </View>
                            {visibleFullRecipe && <FullRecipeCard visibleFullRecipe={visibleFullRecipe} handleCloseFull={handleCloseFull} recipe={recipe}/>}
                            {visibleSustainableModal && <SustainableModal visibleSustainableModal={visibleSustainableModal} handleCloseSustainableModal={handleCloseSustainableModal} getMoreSustainableRecipes={getMoreSustainableRecipes} recipes={sustainableRecipes}/>}
                        </View>
                    <View style={styles.flowerContainer}>
                            <View style={{flexDirection: 'row'}}>
                                <Ionicons name="flower-outline" size={22} style={{color:"black"}}/>
                                <Text style={[styles.flowerText, {color: getNumberTextColor(recipe.score)}]}>{recipe.score}</Text>
                            </View>
                        <View style={styles.icons}>
                            <TouchableOpacity disabled={!!recipe.eaten} style={recipe.eaten ? styles.upgradeDisable : styles.upgrade}  onPress={handleOpenSustainableModal}>
                                <Image
                                    style={{width: 26, height: 26,borderColor: COLORS.dark, borderWidth:2, borderRadius:50}}
                                    source={require('frontend/app/assets/earth-globe-12153.png')}
                                />
                                <Text style={styles.upgradeText}>שדרג!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <MoreOptionsMenu recipe={recipe} meal_type={meal_type}/>
                </View>
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
        // fontWeight: '900',
        fontFamily: 'Rubik-Bold',
        marginBottom: 5,

    },
    cardSubtitle: {
        marginBottom: 5,
        marginRight:6,
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
        width: '50%',
    },
    flowerText: {
        paddingHorizontal: 3,
        fontFamily: 'Rubik-Regular',
        fontSize: 17,
        color:"black",
        paddingTop: 3,
        marginRight:4,
    },
    icons:{
        marginLeft: 10
    },
    upgrade:{
        flexDirection: 'row',
        paddingLeft: '35%',
    },
    upgradeDisable:{
        flexDirection: 'row',
        opacity: 0.2,
        paddingLeft: '35%',
    },
    upgradeText: {
        color: COLORS.upgrade,
        marginTop: 4,
        fontSize: 15.5,
        fontFamily: 'Rubik-Bold',
        marginLeft: 5,
        marginRight: 5,
        textDecorationLine: "underline",
        width: 45
    },
});

export default MealCard;
