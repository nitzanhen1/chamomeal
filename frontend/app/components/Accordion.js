import React, {Component} from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import CartCard from "./Meal";

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
                                <View  >
                                    <Icon name={item.checked ? 'check-circle' : 'check-circle-outline'} size={30} color={COLORS.dark} onPress={() => this.onCheck(index)}/>
                                    <CartCard item={item} />
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
        temp[index].checked = !temp[index].checked
        //TODO: add a post request to database
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
        paddingLeft:30,

    },

});