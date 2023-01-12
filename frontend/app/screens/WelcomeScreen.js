import React from 'react';
import {ImageBackground, StyleSheet,Text, SafeAreaView} from 'react-native';

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
    }, 
})

export default WelcomeScreen;