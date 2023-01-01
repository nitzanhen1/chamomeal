import React, {Component} from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import MealCard from "./MealCard";

export default class Accordion extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expanded : false,
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
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
                            // contentContainerStyle={{paddingBottom: 20}}
                            data={this.state.data}
                            renderItem={({item: recipe, index}) =>
                                <View style={styles.fullWidthButton}>
                                    <Icon name={recipe.eaten ? 'check-circle' : 'check-circle-outline'} style={styles.icon} size={30} color={COLORS.dark} onPress={() => this.setEaten(index)}/>
                                    <MealCard item={recipe}/>
                                </View>
                            }
                        />
                    </View>
                }
            </View>
        )
    }

    setEaten=(index)=>{
        //TODO UPDATE SCORE & CALORIES (אכלתי)
        const recipe = this.state.data.slice()
        recipe[index].eaten = !recipe[index].eaten
        this.setState({data: recipe})
    }

    toggleExpand=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded : !this.state.expanded})
    }

}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        // direction: "rtl"
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