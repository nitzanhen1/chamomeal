import React from 'react';
import FullRecipeCard from "./FullRecipeCard";
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import HeartIcon from "./HeartIcon";
import {replaceRecipe, setHeartAndChoose} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import COLORS from "../consts/colors";
import {Button} from '@rneui/themed';


const PreviewCard = ({recipe, sustainable, handleCloseSustainableModal}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {date, heartIcon, chooseButton, meal_type} = useSelector(state => state.mealReducer);
    const [visibleFullRecipe, setFullVisible] = React.useState(false);
    const handleOpenFull = () => {
        setFullVisible(true);
    }

    const handleCloseFull = () => {
        setFullVisible(false);
    }

    const handleChooseButton = () => {
        dispatch(replaceRecipe("replaceRecipeById", recipe["recipe_id"], date, meal_type, recipe["calories"])).then()
            if(sustainable) {
                handleCloseSustainableModal();
            }
            else{
                dispatch(setHeartAndChoose("",true, false));
                navigation.navigate("Meal Planner");
            }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={()=>handleOpenFull()}>
                <Image source={{uri:recipe.image}} style={styles.cardImage}/>
                <View style={styles.cardContent}>
                    <View style={styles.cardTextContent}>
                        <Text numberOfLines={2} style={styles.cardTitle}>{recipe.name}</Text>
                        <Text style={styles.cardSubtitle}>{recipe.calories + " קלוריות" + " | " + recipe.GHG_per_unit.toFixed(3) + " GHG"}</Text>
                        {visibleFullRecipe && <FullRecipeCard visibleFullRecipe={visibleFullRecipe} handleCloseFull={handleCloseFull} recipe={recipe}/>}
                    </View>
                    <View style={{flexDirection:'row', justifyContent: "space-between"}}>
                        <View style={styles.flowerContainer}>
                            <Ionicons name="flower-outline" size={22} style={styles.flowerIcon}/>
                            <Text style={styles.flowerText}>{recipe.score}</Text>
                        </View>
                        {heartIcon && <HeartIcon style={styles.heart} recipe={recipe}/>}
                        <View style={styles.chooseButton}>
                            {chooseButton &&
                                <Button
                                onPress={handleChooseButton}
                                title="בחר"
                                color={COLORS.upgradeButton}
                                size="sm"
                                containerStyle={styles.button}
                                titleStyle={styles.buttonText}
                                />}
                        </View>
                    </View>

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
        marginVertical: 7,
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
        paddingLeft: 7
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
    chooseButton:{
        marginRight:10,
        bottom:7,
    },
    heart:{
        // alignSelf: "flex-end",
        // flex:1,

    },
    button:{
        // flex: 1,
        borderRadius: 5,
        height: 32,
        marginLeft: 5,
        textAlignVertical: "center",
        borderBottomLeftRadius: 8, // apply the bottom radius to the scroll view
        borderBottomRightRadius: 8,
    },
    buttonText:{
        fontFamily: 'Rubik-Bold',
        fontSize: 16,
        paddingHorizontal: 4,

    }
});

export default PreviewCard;
