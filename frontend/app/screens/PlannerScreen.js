import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors'
import {useState} from 'react';
import { PaperProvider, Card, Title, Paragraph } from 'react-native-paper';
import Accordion from "../components/Accordion";
import MealPlan from "../components/MealPlan";

// const LeftContent = () => (
//   <Avatar.Icon
//     color='white'
//     icon="camera"
//     style={{ backgroundColor: 'green' }}
//     size={45} />);
export default function PlannerScreen(props) {

  const [cals,setCals] = useState(1750)
  const [totalCals,setTotalCals] = useState(2500)
  const date = new Date()
  return (
    <View style={styles.container}>
      <Text style={styles.textCals}>{cals}/{totalCals} קלוריות</Text>
      <Text style={styles.textDate}>
      <Icon style={styles.icon2} name="keyboard-arrow-left" size={24}/>
        {date.toDateString()}
      <Icon style={styles.icon2} name="keyboard-arrow-right" size={24}/></Text>
      <View style={styles.inputsContainer}>
          <MealPlan></MealPlan>
      {/*<TouchableHighlight style={styles.fullWidthButton}>*/}
      {/*    <Text style={styles.fullWidthButtonText}>*/}
      {/*    <Icon style={styles.icon} name="expand-more" size={24}/>*/}
      {/*      ארוחת בוקר*/}
      {/*      </Text>*/}
      {/*</TouchableHighlight>*/}
      {/*<TouchableHighlight style={styles.fullWidthButton}>*/}
      {/*    <Text style={styles.fullWidthButtonText}>*/}
      {/*    <Icon name="expand-more" size={24}/>*/}
      {/*      ארוחת צהריים*/}
      {/*      </Text>*/}
      {/*</TouchableHighlight>*/}
      {/*<TouchableHighlight style={styles.fullWidthButton}>*/}
      {/*    <Text style={styles.fullWidthButtonText}>*/}
      {/*    <Icon name="expand-more" size={24}/>*/}
      {/*      ארוחת ערב*/}
      {/*    </Text>*/}
      {/*</TouchableHighlight>*/}
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

