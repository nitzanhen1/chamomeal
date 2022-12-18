import React from 'react';
import { Image, ImageBackground, StyleSheet, View, Text, SafeAreaView} from 'react-native';
import COLORS from '../consts/colors';


function WelcomeScreen() {
    return (
        <SafeAreaView style={styles.background}>
            <Text>Hi</Text>
            <ImageBackground 
                style={styles.background}
                source={require('../assets/background2.jpeg')}>
            </ImageBackground>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    background: {
        backgroundColor: "#453567"
        // flex: 1,
        // justifyContent: "center",
        // alignItems:  "center",
    }, 
})

export default WelcomeScreen;