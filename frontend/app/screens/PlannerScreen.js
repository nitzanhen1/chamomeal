import { View, Text, StyleSheet} from 'react-native'
import React, {useEffect} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors'
import {useState} from 'react';
import Accordion from "../components/Accordion";
import {useDispatch, useSelector} from "react-redux";
import {getDailyMenu, getUserDetails} from "../redux/actions";

export default function PlannerScreen(props) {
    const { meals, consumed_calories, date, total_calories, score, user_name} = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDailyMenu(date)).then();
        dispatch(getUserDetails()).then();
    }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.textCals}>{user_name} שלום</Text>
        <Text style={styles.textCals}>{score} פרחים</Text>
      <Text style={styles.textCals}>{consumed_calories}/{total_calories} קלוריות</Text>
      <Text style={styles.textDate}>
      <Icon name="keyboard-arrow-left" size={24}/>
        {date.toDateString()}
      <Icon name="keyboard-arrow-right" size={24}/></Text>
        <View style={styles.inputsContainer}>
            {meals.map(meal=>(
                <View key={meal.title}>
                    <Accordion
                        title = {meal.title}
                        mealData = {meal.mealData}
                        dispatch = {dispatch}
                    />
                </View>
            ))}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        direction: 'rtl',
    },
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems:  "center",
        direction: 'rtl'
    },
    inputsContainer: {
        top: 50,
    },
    fullWidthButton: {
        backgroundColor: COLORS.lightGreen,
        height:50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fullWidthButtonText: {
        fontSize:22,
        color: 'white'
    },
    textCals: {
        fontSize: 24,
        alignSelf:'center',
        top:20,
        fontWeight: 'bold',
    },
    textDate:{
        fontSize: 20,
        alignSelf:'center',
        top:30,
        alignItems: "center",
    },
})

