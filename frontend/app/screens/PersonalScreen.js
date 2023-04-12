import { View, Text, StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {
    getDailyMenu,
    getQuestionnaireDetails,
    getGlobalDetails,
    logout,
    register,
    getUserDetails
} from "../redux/actions";
import COLORS from "../consts/colors";
import { Button} from '@rneui/themed';

export default function PersonalScreen({navigation}) {
    const { first_name } = useSelector(state => state.mealReducer);
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

    async function updateQuestionnaire() {
        await dispatch(getQuestionnaireDetails()).then();
        navigation.navigate('QuestionnaireScreen');
    }

    async function updateUserDetails() {
        await dispatch(getUserDetails()).then();
        navigation.navigate('EditUserInfo');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.helloText}>שלום {first_name}!</Text>
            <Button
                title="עדכון פרטי חשבון"
                onPress={() => updateUserDetails()}
                color = {COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
                buttonStyle={{height: 50}}
            />
            <Button
                title="עדכון פרטים אישיים"
                onPress={() => updateQuestionnaire()}
                color = {COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
                buttonStyle={{height: 50}}
            />
            <Button
                title="עדכון סיסמה"
                onPress={() => navigation.navigate('ChangePassword')}
                color = {COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
                buttonStyle={{height: 50}}
            />
            <Button
                title="התנתק"
                onPress={() => logoutUser()}
                color = {COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
                buttonStyle={{height: 50}}
            />
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        direction: 'rtl',
        height: '100%',
        width: '100%',
    },
    helloText:{
        fontSize: 25,
        textAlign: 'left',
        alignItems: 'center',
        width: '100%',
        height: 30,
        marginTop: 10,
        marginBottom: 15,
        paddingRight: 20,
        fontFamily: 'Rubik-Bold',
        letterSpacing: 1,
        color: COLORS.darkGrey
    },
    nextButton: {
        marginTop: 0,
        width: '85%',
        height: 65,
        alignSelf: "center"
    },
    nextText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 22
    },
})