import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native'
import React, {useEffect} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors'
import {useState} from 'react';
import { PaperProvider, Card, Title, Paragraph } from 'react-native-paper';
import Accordion from "../components/Accordion";
import MealPlan from "../components/MealPlan";
import {useDispatch, useSelector} from "react-redux";
import {getDailyMenu} from "../redux/actions";

// const LeftContent = () => (
//   <Avatar.Icon
//     color='white'
//     icon="camera"
//     style={{ backgroundColor: 'green' }}
//     size={45} />);
export default function PlannerScreen(props) {
    const { meals } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
  const [cals,setCals] = useState(1750)
  const [totalCals,setTotalCals] = useState(2500)
  const date = new Date();

  useEffect(() => {
      console.log("useEffect")
      dispatch(getDailyMenu());}, []);
  return (
    <View style={styles.container}>
      <Text style={styles.textCals}>{cals}/{totalCals} קלוריות</Text>
      <Text style={styles.textDate}>
      <Icon style={styles.icon2} name="keyboard-arrow-left" size={24}/>
        {date.toDateString()}
      <Icon style={styles.icon2} name="keyboard-arrow-right" size={24}/></Text>
      <View style={styles.inputsContainer}>
          <MealPlan data={meals}></MealPlan>
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
  icon:{
    // paddingLeft: 150,
    // alignItems: "flex-end",

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

