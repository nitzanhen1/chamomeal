import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

const RegisterScreen = ({navigation}) => {
    function handlePress(){
        navigation.navigate('QuestionnaireScreen');
    }

    return (
        <View style={styles.view}>
            <Text>RegisterScreen</Text>
            <Button title="next" onPress={handlePress}/>
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

export default RegisterScreen;