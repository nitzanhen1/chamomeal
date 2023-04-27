import React from 'react';
import FullRecipeCard from "./FullRecipeCard";
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import HeartIcon from "./HeartIcon";
import {replaceRecipe, setHeartAndChoose} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import COLORS from "../consts/colors";
import {Button} from '@rneui/themed';
import InfoPopUp from "./InfoPopUp";


const PreviewCard = ({recipe, sustainable, handleCloseSustainableModal, from}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {date, heartIcon, chooseButton, meal_type, meal_score} = useSelector(state => state.mealReducer);
    const [visibleFullRecipe, setFullVisible] = React.useState(false);
    const handleOpenFull = () => {
        setFullVisible(true);
    }

    const handleCloseFull = () => {
        setFullVisible(false);
    }

    const handleChooseButton = () => {
        let replacementDiff = recipe["score"] - meal_score
        dispatch(replaceRecipe("replaceRecipeById", from, recipe["recipe_id"], date, meal_type, replacementDiff)).then(result =>{
            if(!result){
                Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                    [{text: 'אוקיי', style: 'cancel'}],
                    { cancelable: true });
            }
        });
            if(sustainable) {
                handleCloseSustainableModal();
            }
            else{
                dispatch(setHeartAndChoose("",replacementDiff, true, false));
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
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.cardSubtitle}>{recipe.calories + " קלוריות"}</Text>
                            <Text style={styles.cardSubtitle}>·</Text>
                            {sustainable && <Text style={styles.cardSubtitle}>{recipe.GHG_per_unit + " GHG"}</Text>}
                            {(!sustainable) && <InfoPopUp
                                icon={<Text style={styles.cardSubtitle}>{recipe.GHG_per_unit + " GHG"}</Text>}
                                explanation="טביעת רגל פחמנית (GHG) של ארוחה נקבעת מסך גזי החממה הנפלטים ממרכיביה"
                                right={false}
                            />}
                        </View>
                        {visibleFullRecipe && <FullRecipeCard visibleFullRecipe={visibleFullRecipe} handleCloseFull={handleCloseFull} recipe={recipe}/>}
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.flowerContainer}>
                            {sustainable &&
                                <View style={{flexDirection: 'row'}}>
                                    <Ionicons name="flower-outline" size={22} style={{color:"black"}}/>
                                    <Text style={styles.flowerText}>{recipe.score}</Text>
                                </View>}
                            {(!sustainable) && <InfoPopUp
                                icon={<View style={{flexDirection: 'row'}}>
                                    <Ionicons name="flower-outline" size={22} style={{color:"black"}}/>
                                    <Text style={styles.flowerText}>{recipe.score}</Text>
                                </View>}
                                explanation="פרחים הם דירוג סביבתי של הארוחה בטווח 1-10 ציון גבוה מעיד על השפעה סביבתית נמוכה"
                                right={true}
                            />}
                        </View>
                        <View style={styles.heartIcon}>
                        {heartIcon && <HeartIcon recipe={recipe}/>}
                        </View>
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
        paddingLeft: 7,
        marginBottom: 5,
    },
    cardSubtitle: {
        marginBottom: 5,
        marginRight: 7,
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
    button:{
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

    },
    bottomContainer: {
        flexDirection:'row',
    },
    heartIcon: {
        paddingLeft: '55%',
    }
});

export default PreviewCard;
