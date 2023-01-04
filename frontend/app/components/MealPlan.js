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
                        link: 'https://foody.co.il/foody_recipe/%d7%a4%d7%90%d7%99-%d7%a4%d7%a1%d7%98%d7%94-%d7%95%d7%92%d7%91%d7%99%d7%a0%d7%95%d7%aa/',
                        ingredients_count: 10,
                        preparation_time: "30 דקות",
                        total_time: "30 דקות",
                        difficulty: "קל",
                        kosher: 1,
                        vegetarian: 0,
                        vegan: 0,
                        gluten_free: 0,
                        without_lactose: 1,
                        carbohydrates: "1 גרם",
                        fats: "2 גרם",
                        sodium: "3 גרם",
                        protein: "4 גרם",
                        fibers: "5 גרם",
                        saturated_fat: "6 גרם",
                        cholesterol: "7 גרם",
                        calcium: "8 גרם",
                        iron: "9 גרם",
                        potassium: "10 גרם",
                        zinc: "11 גרם",
                    }],
                },
                {
                    title: 'ארוחת צהריים',
                    data: [{
                        id: 2,
                        name: 'פיצה',
                        calories: 1773,
                        flowers: 7,
                        image: 'https://d3o5sihylz93ps.cloudfront.net/app/uploads/2019/01/28092135/shutterstock_294916778-355x236.jpg',
                        eaten: false,
                        link: 'https://foody.co.il/foody_recipe/%d7%a4%d7%90%d7%99-%d7%a4%d7%a1%d7%98%d7%94-%d7%95%d7%92%d7%91%d7%99%d7%a0%d7%95%d7%aa/',
                        ingredients_count: 10,
                        preparation_time: "30 דקות",
                        total_time: "30 דקות",
                        difficulty: "קל",
                        kosher: 1,
                        vegetarian: 0,
                        vegan: 1,
                        gluten_free: 0,
                        without_lactose: 1,
                        carbohydrates: "1 גרם",
                        fats: "2 גרם",
                        sodium: "3 גרם",
                        protein: "4 גרם",
                        fibers: "5 גרם",
                        saturated_fat: "6 גרם",
                        cholesterol: "7 גרם",
                        calcium: "8 גרם",
                        iron: "9 גרם",
                        potassium: "10 גרם",
                        zinc: "11 גרם",
                    }],
                },
                {
                    title: 'ארוחת ערב',
                    data: [{
                        id: 3,
                        name: 'ספגטי בולונז',
                        calories: 1632,
                        flowers: 5,
                        image: 'https://d3o5sihylz93ps.cloudfront.net/app/uploads/2019/01/28092135/shutterstock_294916778-355x236.jpg',
                        eaten: false,
                        link: 'https://foody.co.il/foody_recipe/%d7%a4%d7%90%d7%99-%d7%a4%d7%a1%d7%98%d7%94-%d7%95%d7%92%d7%91%d7%99%d7%a0%d7%95%d7%aa/',
                        ingredients_count: 10,
                        preparation_time: "30 דקות",
                        total_time: "30 דקות",
                        difficulty: "קל",
                        kosher: 1,
                        vegetarian: 0,
                        vegan: 0,
                        gluten_free: 0,
                        without_lactose: 0,
                        carbohydrates: "1 גרם",
                        fats: "2 גרם",
                        sodium: "3 גרם",
                        protein: "4 גרם",
                        fibers: "5 גרם",
                        saturated_fat: "6 גרם",
                        cholesterol: "7 גרם",
                        calcium: "8 גרם",
                        iron: "9 גרם",
                        potassium: "10 גרם",
                        zinc: "11 גרם",
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