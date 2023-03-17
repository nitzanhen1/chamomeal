import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import {useDispatch} from "react-redux";
import {logout, register} from "../redux/actions";

export default function PersonalScreen({navigation}) {
    const dispatch = useDispatch();

    function logoutUser() {
        dispatch(logout()).then((success)=> {
            if(success) {
                navigation.navigate('Login')
            } else {
                alert('something went wrong')
                navigation.navigate('Login')
            }
        });
    }

    return (
    <View style={styles.view}>
      <Text>PersonalScreen</Text>
        <Button title='logout' onPress={logoutUser}/>
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