import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native'
import React, {useEffect} from 'react'
import COLORS from '../consts/colors'
import Accordion from "../components/Accordion";
import {useDispatch, useSelector} from "react-redux";
import {checkDate, DATE_CHANGED, getDailyMenu, setReplaced} from "../redux/actions";
import { ProgressBar } from 'react-native-paper';
import TutorialModal from "../components/tutorialModal";
import {useIsFocused} from "@react-navigation/native";

export default function PlannerScreen() {
    const { meals, consumed_calories, total_calories, date, EER, replaced, showTutorial, date_changed} = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();
    const focus = useIsFocused();

    useEffect(() => {
            dispatch(checkDate(date));
    }, [focus]);

    useEffect(() => {
        if(replaced || date_changed) {
            dispatch(getDailyMenu()).then(result => {
                if(!result){
                    Alert.alert('משהו השתבש, נסה שוב', null,
                        [{text: 'אוקיי', style: 'cancel'}],
                        { cancelable: true });
                }
            })
            dispatch({
                type: DATE_CHANGED,
                date_changed: false
            });
            dispatch(setReplaced(false));
        }
    }, [replaced, date_changed]);


    let day = date.getDate();
    let month = date.getMonth() + 1; // getMonth return value between 0-11
    let year = date.getFullYear();

    let dateToShow = `${day}.${month}.${year}`;

    return (
        <View style={styles.container}>
            {showTutorial && <TutorialModal/>}
            <Text style={styles.textDate}>{dateToShow}</Text>
            <View style={styles.eerContainer}>
                <Text style={styles.label}>תוכנית מותאמת אישית:</Text>
                <Text style={styles.value}>{EER} קלוריות </Text>
            </View>
            <ProgressBar style={{ height: 6, width: undefined }}  progress={consumed_calories/total_calories} color={COLORS.darkGreen} />
            <View style={styles.calsContainer}>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={styles.label}>אכלתי:</Text>
                    <Text style={styles.value}>{consumed_calories}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.label}>הצעה יומית:</Text>
                    <Text style={styles.value}>{total_calories}</Text>
                </View>
            </View>
            <ScrollView style={styles.inputsContainer}>
                {meals.map(meal => (
                    <View key={meal.title}>
                        <Accordion
                            title={meal.title}
                            mealData={meal.mealData}
                            date={date}
                            dispatch={dispatch}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        direction: 'rtl',
        height: '100%',
    },
    inputsContainer: {
        marginTop: 10,
    },
    textCals: {
        fontSize: 18,
        alignSelf: 'center',
        fontFamily: 'Rubik-Regular',
        marginTop: 10,
    },
    textDate: {
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: 'rgba(104,154,93,0.12)',
        width: '100%',
        height: 30,
        marginTop: 10,
        paddingTop: 4,
        fontFamily: 'Rubik-Regular',
        letterSpacing: 1,
        color: COLORS.darkGreen
    },
    eerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 5,
        borderRadius: 5,
    },
    calsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        // fontWeight: 'bold',
        marginRight: 10,
        fontFamily: 'Rubik-Bold'

    },
    value: {
        fontSize: 16,
        fontFamily: 'Rubik-Regular'
    },

})

