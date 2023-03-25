import React from 'react';
import FullRecipeCard from "./FullRecipeCard";
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import MoreOptionsMenu from "./MoreOptionsMenu";
import COLORS from "../consts/colors";

const MealCard = ({recipe}) => {
    const [visibleFullRecipe, setFullVisible] = React.useState(false);

    const handleOpenFull = () => {setFullVisible(true);}
    const handleCloseFull = () => {setFullVisible(false);}

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
                        <View style={styles.icons}>
                            <TouchableOpacity style={styles.upgrade} onPress={() => {console.log('A Pressed!')}}>
                                <Image
                                    style={{width: 26, height: 26,borderColor: COLORS.dark, borderWidth:2, borderRadius:50}}
                                    source={require('frontend/app/assets/earth-globe-12153.png')}
                                />
                                <Text style={styles.upgradeText}>שדרג!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <MoreOptionsMenu/>
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
        width: '50%',
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
    icons:{
        marginLeft: 10
    },
    upgrade:{
        flexDirection: 'row',

    },
    upgradeText: {
        color: COLORS.upgrade,
        marginTop: 4,
        fontSize: 15.5,
        fontFamily: 'Rubik-Bold',
        marginLeft: 5,
        textDecorationLine: "underline",
    },
});

export default MealCard;
