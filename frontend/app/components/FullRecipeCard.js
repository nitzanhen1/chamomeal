import {Image, Modal, StyleSheet, Text, TouchableOpacity, View, Button, Pressable, Linking, Alert} from "react-native";
import { Icon, Overlay, } from 'react-native-elements';
import COLORS from "../consts/colors";
// import Ionicons from "react-native-vector-icons/Ionicons";
import { Ionicons, AntDesign, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import colors from "../consts/colors";
import {useCallback} from "react";

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
                        <TouchableOpacity onPress={handleCloseFull} style={{ position: 'absolute', top: 10, right: 10 }} onPress={handleCloseFull}>
                            <AntDesign  name="closecircleo" size={25} style={styles.exitIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.information}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{recipe.name}</Text>
                        </View>
                        <View style={styles.flowersContainer}>
                            <View style={{flexDirection: 'row', paddingTop: 3}}>
                                <Ionicons name="flower-outline" size={25} style={styles.flowersIcon}/>
                                <Text style={styles.flowerText}>{recipe.score} פרחים</Text>
                            </View>
                            {/*<MaterialCommunityIcons name="heart-circle-outline" size={30} style={styles.heartIcon}/>*/}
                            <Ionicons  name="heart-outline" size={30} style={styles.heartIcon}/>
                        </View>
                        <View style={styles.detailsContainer}>
                            <View style={styles.details}>
                                <SimpleLineIcons name="energy" size={24} color="black" />
                                {/*<Text style={styles.detailsText}>קלוריות</Text>*/}
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

                        <View style={styles.nutritionContainer}>
                        {/*<View style={styles.detailsContainer}>*/}
                            <View style={styles.nutritionRow}>
                                <View style={styles.details}>
                                    <Text style={styles.nutritionText}>נתרן</Text>
                                    <Text style={styles.detailsText}>{recipe.sodium}</Text>
                                </View>
                                <View style={styles.details}>
                                    {/*<AntDesign name="shoppingcart" size={24} color="black" />*/}
                                    <Text style={styles.nutritionText}>סיבים תזונתיים</Text>
                                    <Text style={styles.detailsText}>{recipe.fibers} </Text>
                                </View>
                                <View style={styles.details}>
                                    {/*<AntDesign name="dashboard" size={24} color="black" />*/}
                                    <Text style={styles.nutritionText}>שומן רווי</Text>
                                    <Text style={styles.detailsText}>{recipe.saturated_fat} </Text>
                                </View>
                                <View style={styles.details}>
                                    {/*<Ionicons name="time-outline" size={24} color="black" />*/}
                                    <Text style={styles.nutritionText}>כולסטרול</Text>
                                    <Text style={styles.detailsText}>{recipe.cholesterol}</Text>
                                </View>
                            </View>
                            <View style={styles.nutritionRow}>
                                <View style={styles.details}>
                                    <Text style={styles.nutritionText}>סידן</Text>
                                    <Text style={styles.detailsText}>{recipe.calcium}</Text>
                                </View>
                                <View style={styles.details}>
                                    {/*<AntDesign name="shoppingcart" size={24} color="black" />*/}
                                    <Text style={styles.nutritionText}>ברזל</Text>
                                    <Text style={styles.detailsText}>{recipe.iron} </Text>
                                </View>
                                <View style={styles.details}>
                                    {/*<AntDesign name="dashboard" size={24} color="black" />*/}
                                    <Text style={styles.nutritionText}>אשלגן</Text>
                                    <Text style={styles.detailsText}>{recipe.potassium} </Text>
                                </View>
                                <View style={styles.details}>
                                    {/*<Ionicons name="time-outline" size={24} color="black" />*/}
                                    <Text style={styles.nutritionText}>אבץ</Text>
                                    <Text style={styles.detailsText}>{recipe.zinc}</Text>
                                </View>
                            </View>


                        </View>

                    </View>
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
        // paddingHorizontal: 20,
        // paddingVertical: 30,
        borderRadius: 10,
        // overflow: "scroll",
        // elevation: 20,

    },
    // card: {
    //     height: 100,
    //     marginLeft: 10,
    //     paddingVertical: 20,
    //     right: 0,
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'space-evenly'
    // },
    recipeImage: {
        height: '100%',
        width: '100%',
        resizeMode: "cover",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
        // flex: 1
        // borderRadius: 10,

        // resizeMode: "contain",

    },
    imgContainer: {
        height: '40%',
        width: '100%',
        borderRadius: 10,
        // flex: 1


    },
    exitIcon: {
        color: COLORS.darkGrey,
        backgroundColor: COLORS.white,
        borderRadius: 100
        // position: 'absolute',
        // top: 1,
        // left: 1,
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
        justifyContent: "space-between",
        // backgroundColor: colors.lightGreen,
        // paddingHorizontal: 5,
        // paddingVertical: 1,
        // borderRadius: 50,
        // alignSelf: "flex-start",
        // marginTop: 6,
        // flexDirection: 'row',
        // // width: '100%',
        // justifyContent: "space-evenly",
        // // flex: 1,
        // maxWidth: 50
    },
    flowersIcon: {
        // fontWeight: "bold",
        color: COLORS.dark

    },
    flowerText: {
        paddingHorizontal: 7,
        paddingTop:2,
        fontFamily: 'Rubik-Regular',
        fontWeight: "bold",
        fontSize: 17,
        color: COLORS.dark,

        // marginBottom: 1
    },
    heartIcon: {
        // flex: 1,

    },
    detailsContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingVertical: 4,
        borderTopColor: COLORS.divider,
        borderBottomColor: COLORS.divider,
        borderTopWidth: 2,
        borderBottomWidth: 2
        // flex: 1
    },
    details: {
        flexDirection: "column",
        flex: 1,
        alignItems: "center"
        // justifyContent: "center",
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
        backgroundColor: colors.white,
        borderColor: COLORS.lightGreen,
        borderWidth: 1,
        shadowColor: '#868383',
        // shadowOffset: { width: 0, height: 30},
        shadowOpacity: 0.3,
        // shadowRadius: 8,

    },
    linkText: {
        color: COLORS.lightGreen,
        fontFamily: 'Rubik-Regular',
        fontSize: 16,
        // lineHeight: 21,
        fontWeight: '300',

        // letterSpacing: 0.25,
        // color: 'white',
    },
    nutritionContainer: {
        flexDirection: 'column',
        marginVertical: 10,
        // paddingVertical: 4,
        borderTopColor: COLORS.divider,
        borderBottomColor: COLORS.divider,
        borderTopWidth: 2,
        borderBottomWidth: 2,

    },
    nutritionRow: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems:"center"
        // paddingVertical: 4,
        // justifyContent: "space-around",
        // borderTopColor: COLORS.divider,
        // borderBottomColor: COLORS.divider,
        // borderTopWidth: 2,
        // borderBottomWidth: 2
    },
    nutritionText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 14,
        color: COLORS.dark,
        textAlign: "center",


        // fontWeight: '900',
    },


});

export default FullRecipeCard