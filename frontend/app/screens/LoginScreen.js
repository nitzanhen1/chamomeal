import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

const LoginScreen = ({navigation}) => {
    function navToMain(){
        navigation.navigate('BottomNavigator');
    }

    function navToRegister(){
        navigation.navigate('RegisterScreen');
    }

    return (
        <View style={styles.view}>
            <Text>LoginScreen</Text>
            <Button title="Login" onPress={navToMain}/>
            <Button title="Register" onPress={navToRegister}/>
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

export default LoginScreen;