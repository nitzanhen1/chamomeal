import { View, Text, StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getDailyMenu, getQuestionnaireDetails, getGlobalDetails, logout, register} from "../redux/actions";
import COLORS from "../consts/colors";
import { Button} from '@rneui/themed';

export default function PersonalScreen({navigation}) {
    const { first_name } = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();

    // useEffect(() => {
    //         dispatch(getGlobalDetails()).then(); //TODO move to login
    //     },[]);

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
        console.log('b4 dis');
        await dispatch(getQuestionnaireDetails()).then();
        console.log('b4 nav');

        navigation.navigate('QuestionnaireScreen');
        console.log('after nav');

        // dispatch(getQuestionnaireDetails()).then((success)=> {
        //     if(success) {
        //         navigation.navigate('QuestionnaireScreen')
        //     } else {
        //         alert('something went wrong')
        //         navigation.navigate('QuestionnaireScreen')
        //
        //         // navigation.navigate('Login')
        //     }
        // });

    }

    return (
    // <View style={styles.view}>
        <View style={styles.container}>
            <Text style={styles.helloText}>שלום {first_name}!</Text>
            <Button
                title="עדכון פרטי חשבון"
                onPress={() => navigation.navigate('EditUserInfo')}
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
                title="עדכון העדפות"
                onPress={() => console.log("hello")}
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
    // </View>
  )
}

const styles = StyleSheet.create({
    // view: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems:  "center",
    // },
    container: {
        direction: 'rtl',
        height: '100%',
        width: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: COLORS.white,
    },
    helloText:{
        fontSize: 25,
        textAlign: 'left',
        alignItems: 'center',
        // backgroundColor: 'rgba(104,154,93,0.12)',
        width: '100%',
        height: 30,
        marginTop: 10,
        marginBottom: 15,
        paddingRight: 20,
        // paddingTop: 4,
        fontFamily: 'Rubik-Bold',
        // fontWeight: 700,
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