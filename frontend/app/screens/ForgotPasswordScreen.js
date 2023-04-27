import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react'
import colors from "../consts/colors";
import COLORS from "../consts/colors";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ForgotEnterEmail from "../components/ForgotEnterEmail";
import ForgotEnterCode from "../components/ForgotEnterCode";
import ForgotEnterNewPassword from "../components/ForgotEnterNewPassword";


const Stack = createNativeStackNavigator();

const ForgotPasswordScreen = ({navigation}) => {

    return (
        <ScrollView contentContainerStyle={styles.view}>
            <View style={styles.formContainer}>
                <Stack.Navigator
                    initialRouteName="EnterEmail"
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <Stack.Screen name="EnterEmail" component={ForgotEnterEmail}/>
                    <Stack.Screen name="EnterCode" component={ForgotEnterCode}/>
                    <Stack.Screen name="EnterNewPassword" component={ForgotEnterNewPassword}/>
                </Stack.Navigator>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: COLORS.white,
    },
    formContainer: {
        height: "83%",
        width: "97%",
        backgroundColor: colors.grey,
        marginTop: 10,
    },
    nextButton: {
        marginTop: 10,
        width: '85%',
    },
    nextText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 20
    }

})

export default ForgotPasswordScreen;