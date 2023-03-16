import {View, Text, StyleSheet, FlatList, Image} from 'react-native'
import React from 'react'
import {useSelector} from "react-redux";

export default function GameScreen() {
    const {badges, user_name} = useSelector(state => state.mealReducer);
    const sources = [
        require('../assets/badges/flower6.png'),
        require('../assets/badges/flower6.png'),
        require('../assets/badges/flower6.png'),
        require('../assets/badges/flower6.png'),
        require('../assets/badges/flower6.png'),
        require('../assets/badges/flower6.png'),
        require('../assets/badges/flower6.png'),
        require('../assets/badges/flower6.png'),
        require('../assets/badges/flower6.png'),
        require('../assets/badges/flower6.png'),
        require('../assets/badges/flower6.png'),
        require('../assets/badges/flower6.png'),
    ]
    const renderItem = ({item, index}) => (
        <View style={styles.view}>
            {item ? (
                <Image
                    source={sources[index]}
                    style={styles.image}
                />
            ) : (
                <View>
                    <Image source={sources[index]} style={styles.grey_background} />
                    <Image
                        source={sources[index]}
                        style={styles.bw_image}
                    />
                </View>
            )}
        </View>
    );
    return (
        <View style={styles.container}>
            <Text style={styles.textCals}>{user_name} שלום</Text>
            <FlatList
                data={badges}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}`}
                numColumns={3}
                contentContainerStyle={styles.list_img}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        top: 50
    },
    textCals: {
        fontSize: 24,
        alignSelf:'center',
        top:20,
        fontWeight: 'bold',
    },
    list_img: {
        top: 50,
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
        resizeMode: 'contain',
        // border: 'black'
    },
    bw_image: {
        width: 100,
        height: 100,
        margin: 5,
        resizeMode: 'contain',
        opacity: 0.25,
    },
    grey_background:{
        position: 'absolute',
        width: 100,
        height: 100,
        margin: 5,
        resizeMode: 'contain',
        tintColor: 'gray'
    }
});