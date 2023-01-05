import React from 'react';
import FullRecipeCard from "./FullRecipeCard";
import {View, Text, Image, StyleSheet, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withBadge, Badge } from 'react-native-elements';
import colors from "../consts/colors";
import {Ionicons, Feather, AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import COLORS from "../consts/colors";

const MealCard = ({item}) => {
    const [visibleFullRecipe, setFullVisible] = React.useState(false);

    const handleOpenFull = () => {
        setFullVisible(true);
    }

    const handleCloseFull = () => {
        setFullVisible(false);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={()=>handleOpenFull()}>
            {/*<View style={styles.card}>*/}
            {/*    <View style={styles.row}>*/}
                <Image source={{uri:item.image}} style={styles.cardImage}/>
                {/*</View>*/}
            {/*    <TouchableOpacity style={styles.row} onPress={()=>handleOpenFull()}>*/}
                {/*</TouchableOpacity>*/}

                <View style={styles.cardContent}>
                    {/*<TouchableOpacity style={styles.cardTextContent} onPress={()=>handleOpenFull()}>*/}
                        <View style={styles.cardTextContent}>

                            <Text numberOfLines={2} style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardSubtitle}>{item.calories + " קלוריות"}</Text>
                            {/*<Button onPress={handleOpenFull} title="Full" />*/}
                            {visibleFullRecipe && <FullRecipeCard visibleFullRecipe={visibleFullRecipe} handleCloseFull={handleCloseFull} recipe={item}/>}

                        </View>
                        {/*</TouchableOpacity>*/}
                    <View style={styles.flowerContainer}>
                        {/*<Icon name="local-florist" size={17} style={styles.flowerIcon}/>*/}
                        <Ionicons name="flower-outline" size={22} style={styles.flowerIcon}/>
                        <Text style={styles.flowerText}>{item.score}</Text>
                        <MaterialCommunityIcons name="earth-plus" size={26} style={styles.plusIcon} />
                        {/*<AntDesign name="pluscircle" size={24} style={styles.plusIcon} />*/}
                        {/*<BadgedIcon name="flower-outline" type="ionicons"></BadgedIcon>*/}
                        {/*<Badge*/}
                        {/*    value="+"*/}
                        {/*    status="error"*/}
                        {/*    containerStyle={{ position: 'absolute', top: -4, right: -4 }}*/}
                        {/*>*/}
                        {/*    <Icon name="heart" type="feather" />*/}
                        {/*</Badge>*/}
                        {/*<Feather name="plus-circle" size={24} color="black" style={styles.plusIcon}/>*/}
                    </View>
                    {/*<View>*/}
                    {/*    <Text style={styles.morePointsText}>רוצה לעזור לסביבה ולצבור עוד פרחים?</Text>*/}
                    {/*</View>*/}

                </View>


                <TouchableOpacity style={styles.moreContainer} onPress={()=>alert()}>
                    <Icon name="more-vert" size={25} style={styles.moreIcon} />
                </TouchableOpacity>
            {/*</View>*/}
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
        // elevation: 2,

        // marginHorizontal: 10,

    },
    card: {
        // width: 300,
        height: 130,
        // height: 150,
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent:
        borderRadius:10,

        backgroundColor: "white",
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.3,
        // shadowRadius: 8,
        elevation: 5,
    },
    cardContent: {
        flex: 1,
        flexDirection: 'column',

        // padding: 16,
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
        // fontWeight: 'bold',
        fontFamily: 'Rubik-Regular',

    },
    cardImage: {
        width: 110,
        // height: 102,
        height: '85%',
        borderRadius: 8,
        marginLeft: 12,
        alignSelf: "center"
        // resizeMode: "contain"
    },
    moreIcon: {
        // top: 0
        alignSelf: "flex-start",
        paddingTop: 5,
        // paddingLeft: 1
        // marginLeft:3
    },
    morePointsText: {
        fontSize: 10,
        // fontWeight: 'bold',
        fontFamily: 'Rubik-Regular',
        // paddingTop: 10,
        alignSelf: "center",
        paddingBottom: 5
        // textAlign: "center",
        // flex: 1
        // bottom: 0
    },
    flowerContainer: {
        // backgroundColor: colors.lightGreen,
        paddingHorizontal: 5,
        paddingVertical: 1,
        // borderRadius: 50,
        alignSelf: "flex-start",
        // alignSelf: "flex-end",
        // alignSelf: "center",
        // marginTop: 6,
        marginBottom: 6,
        marginLeft: 6,
        flexDirection: 'row',
        // alignItems: "center"
        width: 40,
        // justifyContent: "space-evenly",

        // maxWidth: 50

    },
    flowerIcon: {
        color:"black"
        // verticalAlign: 'bottom'
    },
    flowerText: {
        paddingHorizontal: 3,
        fontFamily: 'Rubik-Regular',
        // fontWeight: 'bold',
        fontSize: 17,
        color:"black",
        paddingTop: 3,
        marginRight:4,
        // marginBottom: 1
    },
    moreContainer: {
        // justifyContent: "flex-end" ,
        alignItems:"flex-start",
        // alignContent: "flex-start"
    },
    plusIcon: {
        // paddingHorizontal: 4,
        color: COLORS.lightGreen,
        // marginHorizontal: 4
    }


});

export default MealCard;
