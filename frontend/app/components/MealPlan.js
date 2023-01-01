import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import Accordion from '../components/Accordion'
import COLORS from "../consts/colors";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { getDailyMenu } from '../redux/actions';

export default class MealPlan extends Component {
    // const dispatch = useDispatch();
    constructor(props) {
        super(props);
        // const { meals } = useSelector(state => state.userReducer);
        // this.state = {
        //     dailyMeal: meals
        // }
        // console.log("init")
        this.state = {
            meals: props.data
                // [
                // {title: 'ארוחת בוקר', data:[]},
                // {title: 'ארוחת צהריים', data: []},
                // {title: 'ארוחת ערב',data:[]}]
        };
        // this.componentDidMount()
    }
    //
    // async componentDidMount() {
    //     // await dispatch(getDailyMenu());
    // }


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
