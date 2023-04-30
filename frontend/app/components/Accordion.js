import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Alert} from "react-native";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import Iconn from "react-native-vector-icons/MaterialCommunityIcons";
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
            },
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()}>
                    <View style={{flexDirection: 'row'}}>
                        <Iconn name={this.props.mealData.eaten ? 'check-circle-outline' : 'checkbox-blank-circle-outline' } size={27} color={COLORS.dark} onPress={() => this.markAsEaten()}/>
                        <Text style={[styles.title]}>{this.props.title}</Text>
                    </View>

                    <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={COLORS.dark} />
                </TouchableOpacity>
                <View style={styles.parentHr}/>
                {
                    this.state.expanded &&
                    <View style={{}}>
                        <View style={styles.fullWidthButton}>
                            <MealCard recipe={this.props.mealData} meal_type={this.state.meal_type[this.props.title]} />
                        </View>
                    </View>
                }
            </View>
        )
    }

    markAsEaten=()=>{
        const recipe = this.props.mealData
        recipe.eaten = !recipe.eaten
        this.props.dispatch(markAsEaten(this.state.meal_type[this.props.title],recipe.eaten, recipe.calories, recipe.score, this.props.date)).then(result => {
            if(result){
                this.setState({mealData: recipe})
            }else {
                Alert.alert('משהו השתבש, נסה שוב', null,
                    [{text: 'אוקיי', style: 'cancel'}],
                    { cancelable: true });
            }
        })
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
        fontSize: 17,
        // fontWeight:'bold',
        color: COLORS.dark,
        marginTop: 4,
        marginLeft: 10,
        fontFamily: 'Rubik-Bold'

    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:43,
        paddingLeft:11,
        paddingRight:25,
        alignItems:'center',
        backgroundColor: COLORS.row,
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
    icons:{
        marginRight: 5
    }
});
