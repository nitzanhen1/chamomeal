import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MealCard = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={{uri:item.image}}
                    style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                    <View style={styles.cardTextContent}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={styles.cardSubtitle}>{item.calories + " קלוריות"}</Text>
                    </View>
                    {/* Add your other card content here */}
                </View>

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
        justifyContent: 'space-evenly',
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
        padding: 16,
        // fontFamily: 'Rubik-Regular',
    },
    cardTextContent: {
        flex: 1,
        padding: 16,
        flexDirection: 'column',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    cardImage: {
        width: 102,
        height: '85%',
        borderRadius: 8,
        marginLeft: 12
        // resizeMode: "contain"
    },
});

export default MealCard;
