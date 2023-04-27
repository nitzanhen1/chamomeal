import {View, Text, StyleSheet, ScrollView} from 'react-native'
import React, {useEffect} from 'react'
import COLORS from '../consts/colors'
import Accordion from "../components/Accordion";
import {useDispatch, useSelector} from "react-redux";
import {getDailyMenu, SET_DATE, setReplaced} from "../redux/actions";
import {useIsFocused} from "@react-navigation/native";

export default function PlannerScreen() {
    const {meals, consumed_calories, date, EER, replaced} = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();
    const focus = useIsFocused();

    useEffect(() => {
        if (replaced) {
            dispatch({type: SET_DATE});
            dispatch(getDailyMenu(date)).then();
            dispatch(setReplaced(false));
        }
    }, [replaced]);

    // useEffect(() => {
    //     dispatch({type: SET_DATE});
    //     dispatch(getDailyMenu(date)).then();
    // }, []);

    let day = date.getDate();
    let month = date.getMonth() + 1; // getMonth return value between 0-11
    let year = date.getFullYear();

    let dateToShow = `${day}.${month}.${year}`;

    return (
        <View style={styles.container}>
            <Text style={styles.textDate}>{dateToShow}</Text>
            <Text style={styles.textCals}>צרכת {consumed_calories} קלוריות מתוך {EER} הכמות המומלצת</Text>
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
        height: '100%'
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
})

