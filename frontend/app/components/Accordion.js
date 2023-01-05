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
            data: props.data,
            expanded : false,
            meal_type: {
                "ארוחת בוקר": "breakfast",
                "ארוחת צהריים": "lunch",
                "ארוחת ערב": "dinner"
            }
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.data !== this.props.data) {
            this.setState({data: this.props.data})
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()}>
                    <Text style={[styles.title]}>{this.props.title}</Text>
                    <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={COLORS.dark} />
                </TouchableOpacity>
                <View style={styles.parentHr}/>
                {
                    this.state.expanded &&
                    <View style={{}}>
                        <FlatList
                            // showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                            numColumns={1}
                            contentContainerStyle={{paddingBottom: 20}}
                            data={this.props.data}
                            renderItem={({item, index}) =>
                                <View style={styles.fullWidthButton}>
                                    <Icon name={item.eaten ? 'check-circle' : 'check-circle-outline'} size={30} color={COLORS.dark} onPress={() => this.onCheck(index)}/>
                                    <MealCard item={item} />
                                </View>
                            }
                        />
                    </View>
                }
            </View>
        )
    }

    onCheck=(index)=>{
        const temp = this.state.data.slice()
        temp[index].eaten = !temp[index].eaten
        this.props.dispatch(markAsEaten(this.state.meal_type[this.props.title],temp[index].eaten, temp[index].calories))
        this.setState({data: temp})
    }

    toggleExpand=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded : !this.state.expanded})
    }

}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center'
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
    childRow:{
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: COLORS.grey,
    },
    parentHr:{
        height:1,
        color: COLORS.white,
        width:'100%'
    },
    childHr:{
        height:1,
        backgroundColor: COLORS.grey,
        width:'100%',
    },
    fullWidthButton: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        // paddingLeft:20,
        marginHorizontal: 10,

    },
    icon:{
        // alignSelf: "baseline"
        marginRight: 0
    }

});