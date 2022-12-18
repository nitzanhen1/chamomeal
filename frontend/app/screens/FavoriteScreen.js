import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, Button} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import foods from '../consts/food';


export default function FavoriteScreen() {
    return (
        <View style={styles.view}>
            <Text>FavoriteScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems:  "center",
    },
})