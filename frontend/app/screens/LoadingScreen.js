import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View, Text, Image, ImageBackground} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getDailyMenu, getGlobalDetails, SET_DATE} from "../redux/actions";
import COLORS from "../consts/colors";
import { useIsFocused } from "@react-navigation/native";

export default function LoadingScreen({navigation}) {

    const dispatch = useDispatch();
    const focus = useIsFocused();
    const {date} = useSelector(state => state.mealReducer);
    const sentences = [
        'משפט 1',
        'משפט 2',
        'משפט 3',
        'משפט 4',
        'משפט 5',
        'משפט 6',
        'משפט 7',
        'משפט 8',
        'משפט 9',
        'משפט 10',
    ];
    const [sentenceIndex] = useState(Math.floor(Math.random()*sentences.length));

    async function handleGetGlobalDetails(){
        dispatch(getGlobalDetails()).then(status => {
            if(status===200){
                dispatch({type: SET_DATE});
                // dispatch(getDailyMenu(date)).then(() => {
                    navigation.navigate('BottomNavigator');
                // });
            }else if(status===419){
                navigation.navigate('Login');
            }
            else{
                Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                    [{text: 'אוקיי', style: 'cancel'}],
                    { cancelable: true });
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
        height: 30,
        marginTop: 50,
        marginBottom: 50,
        fontFamily: 'Rubik-Bold',
        letterSpacing: 1,
        color: COLORS.darkGrey
    },
});