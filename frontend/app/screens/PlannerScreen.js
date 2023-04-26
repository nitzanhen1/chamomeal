import {View, Text, StyleSheet, ScrollView} from 'react-native'
import React, {useEffect} from 'react'
import COLORS from '../consts/colors'
import Accordion from "../components/Accordion";
import {useDispatch, useSelector} from "react-redux";
import {getDailyMenu, SET_DATE, setReplaced} from "../redux/actions";
import { useIsFocused } from "@react-navigation/native";
import {TutorialOverlay} from "./TutorialScreen";
import { ProgressBar } from 'react-native-paper';


export default function PlannerScreen() {
    const { meals, consumed_calories, total_calories, date, EER, replaced, showTutorial} = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();
    const focus = useIsFocused();

    useEffect(() => {
        if(replaced) {
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
            {showTutorial && <TutorialOverlay />}
            <View style={[styles.mainContent, showTutorial && styles.translucentBackground]}>
            <Text style={styles.textDate}>{dateToShow}</Text>
                <View style={styles.calsContainer}>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={styles.label}>צרכת:</Text>
                        <Text style={styles.value}>{consumed_calories}</Text>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={styles.label}>מומלץ ליום:</Text>
                        <Text style={styles.value}>{EER} קלוריות </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.label}>סה"כ:</Text>
                        <Text style={styles.value}>{total_calories}</Text>
                    </View>
                </View>
                <ProgressBar style={{ height: 6, width: undefined }}  progress={consumed_calories/total_calories} color={COLORS.darkGreen} />
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
    mainContent: {
    },
    translucentBackground: {
        opacity: 0.5,
    },
    calsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    value: {
        fontSize: 16,
    },

})

