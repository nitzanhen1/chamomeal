import React, {Component} from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import MealCard from "./MealCard";
import {markAsEaten} from "../redux/actions";

export default class Accordion extends Component{

    constructor(props) {
        super(props);
        this.state = {
            mealData: props.mealData,
            expanded : false,
            meal_type: {
                "ארוחת בוקר": "breakfast",
                "ארוחת צהריים": "lunch",
                "ארוחת ערב": "dinner"
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.mealData !== this.props.mealData) {
            this.setState({mealData: this.props.mealData})
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
                        <FlatList
                            scrollEnabled={false}
                            numColumns={1}
                            contentContainerStyle={{paddingBottom: 20}}
                            data={this.props.mealData}
                            renderItem={({item: recipe, index}) =>
                                <View style={styles.fullWidthButton}>
                                    <Icon name={recipe.eaten ? 'check-circle' : 'check-circle-outline'} size={30} color={COLORS.dark} onPress={() => this.markAsEaten(index)}/>
                                    <MealCard recipe={recipe} />
                                </View>
                            }
                        />
                    </View>
                }
            </View>
        )
    }

    markAsEaten=(index)=>{
        const recipe = this.state.mealData
        recipe[index].eaten = !recipe[index].eaten
        this.props.dispatch(markAsEaten(this.state.meal_type[this.props.title],recipe[index].eaten, recipe[index].calories))
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