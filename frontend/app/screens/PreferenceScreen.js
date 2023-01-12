import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

const PreferenceScreen = ({navigation}) => {
    function handlePress(){
        navigation.navigate('BottomNavigator');
    }

    return (
        <View style={styles.view}>
            <Text>PreferenceScreen</Text>
            <Button title="PreferenceScreen" onPress={handlePress}/>
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

export default PreferenceScreen;