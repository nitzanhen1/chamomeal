import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function FavoriteScreen() {
    return (
        <View style={styles.view}>
            <Text>EarthScreen</Text>
        </View>
    )
};
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems:  "center",
    },
});