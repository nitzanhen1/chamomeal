import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MealCard = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.cardTextContent}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={styles.cardSubtitle}>{item.calories + " קלוריות"}</Text>
                    </View>
                    {/* Add your other card content here */}
                </View>
                <Image
                    source={require('frontend/app/assets/meatPizza.png')}
                    style={styles.cardImage}
                />
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
        // marginHorizontal: 10,

    },
    card: {
        // width: 300,
        height: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    cardContent: {
        flex: 1,
        padding: 16,
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
        width: 120,
        height: 120,
        borderRadius: 8,
        // resizeMode: "contain"
    },
});

export default MealCard;
