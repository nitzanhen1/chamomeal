import React from 'react';
import FullRecipeCard from "./FullRecipeCard";
import {View, Text, Image, StyleSheet, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withBadge, Badge } from 'react-native-elements';
import colors from "../consts/colors";

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
            <View style={styles.card}>
                <TouchableOpacity style={styles.row} onPress={()=>handleOpenFull()}>
                    <Image source={{uri:item.image}} style={styles.cardImage}/>
                </TouchableOpacity>

                <View style={styles.cardContent}>
                    <TouchableOpacity style={styles.cardTextContent} onPress={()=>handleOpenFull()}>
                        {/*<View style={styles.cardTextContent}>*/}

                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardSubtitle}>{item.calories + " קלוריות"}</Text>
                            {/*<Button onPress={handleOpenFull} title="Full" />*/}
                        {visibleFullRecipe && <FullRecipeCard visibleFullRecipe={visibleFullRecipe} handleCloseFull={handleCloseFull} recipe={item}/>}

                        {/*</View>*/}
                        </TouchableOpacity>
                    <View>
                        <Text style={styles.morePointsText}>רוצה לעזור לסביבה ולצבור עוד פרחים?</Text>
                    </View>

                </View>

                <View style={styles.flowerContainer}>
                    <Text style={styles.flowerText}>{item.flowers}</Text>
                    <Icon name="local-florist" size={17} style={styles.flowerIcon}/>
                </View>
                <Icon name="more-vert" size={25} style={styles.moreIcon} />
            </View>
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
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
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
        padding: 16,

    },
    cardTitle: {
        fontSize: 22,
        // fontWeight: 'bold',
        fontFamily: 'Rubik-Bold',
    },
    cardSubtitle: {
        fontSize: 15,
        // fontWeight: 'bold',
        fontFamily: 'Rubik-Regular',

    },
    cardImage: {
        width: 102,
        height: '85%',
        borderRadius: 8,
        marginLeft: 12
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
        backgroundColor: colors.lightGreen,
        paddingHorizontal: 5,
        paddingVertical: 1,
        borderRadius: 50,
        alignSelf: "flex-start",
        marginTop: 6,
        flexDirection: 'row',
        // width: 40,
        justifyContent: "space-evenly",

        maxWidth: 50

    },
    flowerIcon: {
        color:"white"
        // verticalAlign: 'bottom'
    },
    flowerText: {
        paddingHorizontal: 3,
        fontFamily: 'Rubik-Regular',
        fontSize: 15,
        color:"white"

        // marginBottom: 1
    }


});

export default MealCard;
