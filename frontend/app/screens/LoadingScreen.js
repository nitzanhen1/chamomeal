import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View, Text, Image, ImageBackground} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getDailyMenu, getFavorites, getGlobalDetails, SET_DATE} from "../redux/actions";
import COLORS from "../consts/colors";
import { useIsFocused } from "@react-navigation/native";

export default function LoadingScreen({navigation}) {

    const dispatch = useDispatch();
    const focus = useIsFocused();
    const {date} = useSelector(state => state.mealReducer);
    const sentences = [
        'תכנון ארוחות יכול לעזור \nלהפחית בזבוז מזון ולחסוך כסף',
        'מעל 30%\n מפליטות גזי החממה העולמיות\n מגיעות מייצור מזון',
        'תזונה ברת קיימא יכולה\n לתרום לבריאות האישית \nולבריאות כדור הארץ',
        'ישראל מובילה בחיסכון במים\n ובחקלאות בת קיימא',
        'פסולת מזון מהווה\n 1/3 מכלל הפסולת בישראל',
        'ישראל שואפת להפחית\nאת פליטת גזי החממה\nב-25% עד 2030',
        'תזונה ברת קיימא יכולה \nלסייע במאבק בשינויי האקלים',
        'רק רגע, \nאנחנו עובדים על זה',
        'מתאימים לך תפריט אישי\n  מתוך 4,500 מתכונים',
    ];
    const [sentenceIndex] = useState(Math.floor(Math.random()*sentences.length));

    async function handleGetGlobalDetails(){
        dispatch(getGlobalDetails()).then(status => {
            if(status===200){
                dispatch({type: SET_DATE});
                dispatch(getDailyMenu(date)).then(result => {
                    if (result){
                        dispatch(getFavorites());
                        navigation.navigate('BottomNavigator');
                    }else{
                        Alert.alert('משהו השתבש, נסה שוב', null,
                            [{text: 'אוקיי', style: 'cancel'}],
                            { cancelable: true });
                        navigation.navigate('Login');
                    }

                });
            }else{
                Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                    [{text: 'אוקיי', style: 'cancel'}],
                    { cancelable: true });
                navigation.navigate('Login');
            }
        });}

    useEffect(() => {
        if(focus == true) {
            handleGetGlobalDetails().then();
        }
    }, [focus]);

    return (
                <View style={styles.container}>
                    <ImageBackground source={require('../assets/background3.png')} resizeMode="cover" style={styles.backgroundImage}>
                    <View style={styles.title}>
                        <Image
                            style={styles.image}
                            source={require('frontend/app/assets/CHAMOMEAL2.png')}
                        />
                    </View>
                    <View>
                        <Text style={styles.loadingText}>{sentences[sentenceIndex]}</Text>
                    </View>
                    <ActivityIndicator size="large" color={COLORS.darkGreen} />
                    </ImageBackground>
                </View>

    );
};
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems:  "center",
    },
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        // backgroundColor: COLORS.white,

    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title:{
        bottom: 30
    },
    image: {
        width: 271,
        height: 130,

    },
    loadingText: {
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 50,
        marginBottom: 50,
        fontFamily: 'Rubik-Bold',
        letterSpacing: 1,
        color: COLORS.darkGrey
    },
});