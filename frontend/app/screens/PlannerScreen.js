import {View, Text, StyleSheet, ScrollView} from 'react-native'
import React, {useEffect} from 'react'
import COLORS from '../consts/colors'
import Accordion from "../components/Accordion";
import {useDispatch, useSelector} from "react-redux";
import {getDailyMenu, getUserDetails} from "../redux/actions";

export default function PlannerScreen(props) {
    const { meals, consumed_calories, date, total_calories} = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDailyMenu(date)).then();
        dispatch(getUserDetails()).then(); //TODO move to login
    }, []);

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let dateToShow = `${day}.${month}.${year}`;

  return (
    <View style={styles.container}>
        <Text style={styles.textDate}>{dateToShow}</Text>
        <Text style={styles.textCals}>{consumed_calories}/{total_calories} קלוריות</Text>
        <ScrollView style={styles.inputsContainer}>
            {meals.map(meal=>(
                <View key={meal.title}>
                    <Accordion
                        title = {meal.title}
                        mealData = {meal.mealData}
                        date = {date}
                        dispatch = {dispatch}
                    />
                </View>
            ))}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        direction: 'rtl',
        height: '100%'
    },
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems:  "center",
        direction: 'rtl'
    },
    inputsContainer: {
        marginTop: 10,
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
        fontSize: 20,
        alignSelf:'center',
        fontFamily: 'Rubik-Regular',
        marginTop: 10,
    },
    textDate:{
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
    details: {
        flexDirection: "row",
        alignItems: "center",
        alignContent:"center"
    },
})

