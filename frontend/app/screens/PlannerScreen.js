import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native'
import React, {useEffect} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors'
import {useState} from 'react';
import Accordion from "../components/Accordion";
import {useDispatch, useSelector} from "react-redux";
import {getDailyMenu} from "../redux/actions";

export default function PlannerScreen(props) {
    const { meals, consumed_calories } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
  const [cals,setCals] = useState(1750)
  const [totalCals,setTotalCals] = useState(2500)
  const date = new Date();

  useEffect(() => {
      dispatch(getDailyMenu()).then();}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textCals}>{consumed_calories}/{totalCals} קלוריות</Text>
      <Text style={styles.textDate}>
      <Icon name="keyboard-arrow-left" size={24}/>
        {date.toDateString()}
      <Icon name="keyboard-arrow-right" size={24}/></Text>
        <View style={styles.inputsContainer}>
            {meals.map(meal=>(
                <View key={meal.title}>
                    <Accordion
                        title = {meal.title}
                        data = {meal.data}
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
    }, 
  inputsContainer: {
    top: 50,
  },
  fullWidthButton: {
    backgroundColor: COLORS.lightGreen,
    height:50,
    flexDirection: 'row',

    // justifyContent: 'center',
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

