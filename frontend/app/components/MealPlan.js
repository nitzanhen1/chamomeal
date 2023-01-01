import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import Accordion from '../components/Accordion'
import COLORS from "../consts/colors";

export default class MealPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meals :[
                {
                    title: 'ארוחת בוקר',
                    data: [{
                        id: 1,
                        name: 'שניצל',
                        calories: 1570,
                        flowers: 8,
                        image: 'https://d3o5sihylz93ps.cloudfront.net/app/uploads/2019/01/28092135/shutterstock_294916778-355x236.jpg',
                        eaten: false,
                    }],
                },
                {
                    title: 'ארוחת צהריים',
                    data: [{
                        id: 2,
                        name: 'פיצה',
                        calories: 1773,
                        flowers: 7,
                        image: require('../assets/meatPizza.png'),
                        eaten: false,
                    }],
                },
                {
                    title: 'ארוחת ערב',
                    data: [{
                        id: 3,
                        name: 'ספגטי בולונז',
                        calories: 1632,
                        flowers: 5,
                        image: require('../assets/meatPizza.png'),
                        eaten: false,
                    }],
                },
            ]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                { this.renderAccordions() }
            </View>
        );
    }

    renderAccordions=()=> {
        const items = [];
        for (this.item of this.state.meals) {
            items.push(
                <Accordion
                    title = {this.item.title}
                    data = {this.item.data}
                />
            );
        }
        return items;
    }
}

const styles = StyleSheet.create({
    container: {
        // flex:1,
        // paddingTop:100,
        // backgroundColor:COLORS.white,

    }
});