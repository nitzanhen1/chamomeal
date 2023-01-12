import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation} from "react-native";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import MealCard from "./MealCard";
import {markAsEaten} from "../redux/actions";

export default class Accordion extends Component{

    constructor(props) {
        super(props);
        this.state = {
            expanded : true,
            meal_type: {
                "ארוחת בוקר": "breakfast",
                "ארוחת צהריים": "lunch",
                "ארוחת ערב": "dinner"
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()}>
                    <Text style={[styles.title]}>{this.props.title}</Text>
                    <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={COLORS.dark} />
                </TouchableOpacity>
                <View style={styles.parentHr}/>
                {
                    this.state.expanded &&
                    <View style={{}}>
                        <View style={styles.fullWidthButton}>
                            <Icon name={this.props.mealData.eaten ? 'check-circle' : 'check-circle-outline'} size={30} color={COLORS.dark} onPress={() => this.markAsEaten()}/>
                            <MealCard recipe={this.props.mealData} />
                        </View>
                    </View>
                }
            </View>
        )
    }

    markAsEaten=()=>{
        const recipe = this.props.mealData
        recipe.eaten = !recipe.eaten
        this.props.dispatch(markAsEaten(this.state.meal_type[this.props.title],recipe.eaten, recipe.calories, recipe.score))
        this.setState({mealData: recipe})
    }

    toggleExpand=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded : !this.state.expanded})
    }
}

const styles = StyleSheet.create({
    container:{
        // this controls the ארוחת בוקר green header
    },
    title:{
        fontSize: 16,
        fontWeight:'bold',
        color: COLORS.dark,
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:25,
        alignItems:'center',
        backgroundColor: COLORS.lightGreen,
    },
    parentHr:{
        height:1,
        color: COLORS.white,
        width:'100%'
    },
    fullWidthButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
});