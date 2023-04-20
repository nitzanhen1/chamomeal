import {Image, Modal, StyleSheet, Text, TouchableOpacity, View, Linking, Alert, ScrollView} from "react-native";
import {Divider} from 'react-native-elements';
import COLORS from "../consts/colors";
import { Ionicons, AntDesign, SimpleLineIcons} from '@expo/vector-icons';
import colors from "../consts/colors";
import React, {useCallback} from "react";
import HeartIcon from "./HeartIcon";
import InfoPopUp from "./InfoPopUp";


const FullRecipeCard = ({visibleFullRecipe, handleCloseFull, recipe}) => {

    const onPressLink = useCallback(async () => {
        const supported = await Linking.canOpenURL(recipe.link);
        if (supported) {
            await Linking.openURL(recipe.link);
        } else {
            Alert.alert(`Don't know how to open this URL: ${recipe.link}`);
        }
    }, [recipe.link]);

    return (
        <Modal
            transparent
            visible={visibleFullRecipe}
            onRequestClose={handleCloseFull}
            animationType="slide">
            <View style={styles.modalBackGround}>
                <View style={styles.modalContainer}>
                    <View style={styles.imgContainer}>
                        <Image source={{uri: recipe.image}} style={styles.recipeImage}/>
                        <View  style={styles.icons}>
                            {recipe.sodium_bool === 1 && <Image style={styles.redIcon} source={require('../assets/icon_sodium.png')}/>}
                            {recipe.saturated_fat_bool === 1 && <Image style={styles.redIcon} source={require('../assets/icon_saturated_fat.png')}/>}
                        </View>
                        <TouchableOpacity onPress={handleCloseFull} style={{ position: 'absolute', top: 10, right: 10 }}>
                            <AntDesign  name="closecircleo" size={25} style={styles.exitIcon} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.information}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{recipe.name}</Text>
                        </View>
                        <View style={styles.flowersContainer}>
                            <View style={{flexDirection: 'row', paddingTop: 3}}>
                                <Ionicons name="flower-outline" size={25} style={styles.flowersIcon}/>
                                <Text style={styles.flowerText}>{recipe.score} פרחים</Text>
                            </View>
                            <Text style={styles.flowerText}>·</Text>
                            <Text style={styles.flowerText}>{recipe.GHG_per_unit + " GHG"}</Text>
                            <HeartIcon recipe={recipe}/>
                        </View>
                        <View style={styles.detailsContainer}>
                            <View style={styles.details}>
                                <SimpleLineIcons name="energy" size={24} color="black" />
                                <Text style={styles.detailsText}>קלוריות</Text>
                                <Text style={styles.detailsText}>{recipe.calories}</Text>
                            </View>
                            <View style={styles.details}>
                                <AntDesign name="shoppingcart" size={24} color="black" />
                                <Text style={styles.detailsText}>מרכיבים</Text>
                                <Text style={styles.detailsText}>{recipe.ingredients_count} </Text>
                            </View>
                            <View style={styles.details}>
                                <Ionicons name="time-outline" size={24} color="black" />
                                <Text style={styles.detailsText}>הכנה {recipe.preparation_time}</Text>
                                <Text style={styles.detailsText}>כולל {recipe.total_time}</Text>
                            </View>
                            <View style={styles.details}>
                                <AntDesign name="dashboard" size={24} color="black" />
                                <Text style={styles.detailsText}>רמת קושי</Text>
                                <Text style={styles.detailsText}>{recipe.difficulty} </Text>
                            </View>
                        </View>
                        <View style={styles.dietary}>
                            {recipe.kosher === 1 && <Text style={styles.dietaryText}>כשר</Text> }
                            {recipe.vegetarian === 1 && <Text style={styles.dietaryText}> · צמחוני</Text> }
                            {recipe.vegan === 1 && <Text style={styles.dietaryText}> · טבעוני</Text> }
                            {recipe.gluten_free === 1 && <Text style={styles.dietaryText}> · ללא גלוטן</Text> }
                            {recipe.without_lactose === 1 && <Text style={styles.dietaryText}> · ללא לקטוז</Text> }
                        </View>
                        <View>
                            <TouchableOpacity style={styles.linkButton} onPress={onPressLink}>
                                <Text style={styles.linkText}>למתכון המלא לחצו כאן</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.nutritionRow}>
                            <View style={styles.details}>
                                <Text style={styles.carbText}>פחמימות</Text>
                                <Text style={styles.detailsText}>{recipe.carbohydrates}</Text>
                            </View>
                            <Divider width={2} color={COLORS.grey} orientation={"vertical"}/>
                            <View style={styles.details}>
                                <Text style={styles.carbText}>חלבונים</Text>
                                <Text style={styles.detailsText}>{recipe.protein} </Text>
                            </View>
                            <Divider width={2} color={COLORS.grey} orientation={"vertical"}/>
                            <View style={styles.details}>
                                <Text style={styles.carbText}>שומנים</Text>
                                <Text style={styles.detailsText}>{recipe.fats} </Text>
                            </View>
                        </View>
                        <View style={styles.nutritionContainer}>
                            <View style={styles.nutritionRow}>
                                <View style={styles.details}>
                                    <Text style={styles.nutritionText}>נתרן</Text>
                                    <Text style={styles.detailsText}>{recipe.sodium}</Text>
                                </View>
                                <Divider width={2} color={COLORS.grey} orientation={"vertical"}/>
                                <View style={styles.details}>
                                    <Text style={styles.nutritionText}>סיבים תזונתיים</Text>
                                    <Text style={styles.detailsText}>{recipe.fibers} </Text>
                                </View>
                                <Divider width={2} color={COLORS.grey} orientation={"vertical"}/>
                                <View style={styles.details}>
                                    <Text style={styles.nutritionText}>שומן רווי</Text>
                                    <Text style={styles.detailsText}>{recipe.saturated_fat} </Text>
                                </View>
                                <Divider width={2} color={COLORS.grey} orientation={"vertical"}/>
                                <View style={styles.details}>
                                    <Text style={styles.nutritionText}>כולסטרול</Text>
                                    <Text style={styles.detailsText}>{recipe.cholesterol}</Text>
                                </View>
                            </View>
                            <View style={styles.nutritionRow}>
                                <View style={styles.details}>
                                    <Text style={styles.nutritionText}>סידן</Text>
                                    <Text style={styles.detailsText}>{recipe.calcium}</Text>
                                </View>
                                <Divider width={2} color={COLORS.grey} orientation={"vertical"}/>
                                <View style={styles.details}>
                                    <Text style={styles.nutritionText}>ברזל</Text>
                                    <Text style={styles.detailsText}>{recipe.iron} </Text>
                                </View>
                                <Divider width={2} color={COLORS.grey} orientation={"vertical"}/>
                                <View style={styles.details}>
                                    <Text style={styles.nutritionText}>אשלגן</Text>
                                    <Text style={styles.detailsText}>{recipe.potassium} </Text>
                                </View>
                                <Divider width={2} color={COLORS.grey} orientation={"vertical"}/>
                                <View style={styles.details}>
                                    <Text style={styles.nutritionText}>אבץ</Text>
                                    <Text style={styles.detailsText}>{recipe.zinc}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '95%',
        height: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    recipeImage: {
        height: '100%',
        width: '100%',
        resizeMode: "cover",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    imgContainer: {
        height: '40%',
        width: '100%',
        borderRadius: 10,
    },
    exitIcon: {
        color: COLORS.darkGrey,
        backgroundColor: COLORS.white,
        borderRadius: 100
    },
    information: {
        padding: 10,
    },
    titleContainer:{

    },
    title:{
        fontFamily: 'Rubik-Bold',
        fontWeight: "600",
        fontSize: 27
    },
    flowersContainer: {
        flexDirection: 'row',
        marginTop: 6,
    },
    flowersIcon: {
        color: COLORS.dark
    },
    flowerText: {
        paddingHorizontal: 7,
        paddingTop:2,
        fontFamily: 'Rubik-Regular',
        fontWeight: "bold",
        fontSize: 17,
        color: COLORS.dark,
    },
    detailsContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingVertical: 4,
        borderTopColor: COLORS.divider,
        borderBottomColor: COLORS.divider,
        borderTopWidth: 2,
        borderBottomWidth: 2
    },
    details: {
        flexDirection: "column",
        flex: 1,
        alignItems: "center"
    },
    detailsText: {
        fontFamily: 'Rubik-Regular',
        fontSize: 14,
        color: COLORS.dark,
    },
    dietary:{
        flexDirection: 'row',
        justifyContent: "center",
        marginBottom: 10,
    },
    dietaryText: {
        fontFamily: 'Rubik-Regular',
        fontSize: 16,
        color: COLORS.grey,
    },
    linkButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginBottom: 10,
        borderRadius: 4,
        elevation: 2,
        backgroundColor: colors.lightGreen,
        borderColor: COLORS.lightGreen,
        borderWidth: 1,
        shadowColor: '#868383',
        shadowOpacity: 0.3,
    },
    linkText: {
        color: COLORS.white,
        fontFamily: 'Rubik-Regular',
        fontSize: 16,
        fontWeight: '300',
    },
    nutritionContainer: {
        flexDirection: 'column',
        marginVertical: 10,
        borderTopColor: COLORS.divider,
        borderBottomColor: COLORS.divider,
        borderTopWidth: 2,
        borderBottomWidth: 2,
    },
    nutritionRow: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems:"center"
    },
    nutritionText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 14,
        color: COLORS.dark,
        textAlign: "center",
        paddingVertical: 2
    },
    carbText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 15,
        color: COLORS.carbs,
        textAlign: "center",
        paddingVertical: 2
    },
    redIcon: {
        width: 50,
        height: 50,
    },
    icons:{
        position: 'absolute',
        top: 10,
        left: 10
    }
});

export default FullRecipeCard