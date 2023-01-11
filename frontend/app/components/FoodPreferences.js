import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Input} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {CheckBox, ListItem} from '@rneui/themed';
import {RadioButton} from 'react-native-paper';
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {setFoodPreference, setVegetarian} from "../redux/actions";
//vegan, vegetarian, without_lactose, gluten_free, kosher, onCheckVegan
// const FoodPreferences = (props) => {
const FoodPreferences = () => {
    const {
        vegan,
        vegetarian,
        without_lactose,
        gluten_free,
        kosher} = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();
    const [vegan2, setVegan] = useState(vegan);
    const [vegetarian2, setVegetarian] = useState(vegetarian);
    const [without_lactose2, setLactose] = useState(without_lactose);
    const [gluten_free2, setGluten] = useState(gluten_free);
    const [kosher2, setKosher] = useState(kosher);

    // const setVegan = (vegan) => {
    //     console.log(vegan)
    //     props.preferences.vegan = vegan
    //     console.log(props.preferences.vegan)
    // }
    // const setVegetarian = (value) => {
    //     vegetarian = value;
    //     console.log(value);
    // }
    // const setLactose = (without_lactose) => {
    //     props.preferences.without_lactose = without_lactose
    // }
    // const setGluten = (gluten_free) => {
    //     props.preferences.gluten_free = gluten_free
    // }
    // const setKosher = (kosher) => {
    //     props.preferences.kosher = kosher
    // }

    const handleFood = () => {
        const foodData = {vegan2, vegetarian2, without_lactose2, gluten_free2, kosher2};
        // props.onSubmitFood(foodData);
        dispatch(setFoodPreference(foodData))
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                העדפות תזונתיות
            </Text>
            <Text style={styles.question}>
                באפשרותכם לסמן יותר מהעדפה אחת
            </Text>
            <View style={styles.prefContainer}>
                <CheckBox
                    title="טבעונות"
                    checked={vegan2}
                    onPress={() => setVegan(!vegan2)}
                    containerStyle={styles.checkContainer}
                    textStyle={styles.optionText}
                    checkedColor={COLORS.lightGreen}
                />
                <CheckBox
                    title="צמחונות"
                    checked={vegetarian2}
                    onPress={() => setVegetarian(!vegetarian2)}
                    containerStyle={styles.checkContainer}
                    textStyle={styles.optionText}
                    checkedColor={COLORS.lightGreen}
                />
                <CheckBox
                    title="רגישות ללקטוז"
                    checked={without_lactose2}
                    onPress={() => setLactose(!without_lactose2)}
                    containerStyle={styles.checkContainer}
                    textStyle={styles.optionText}
                    checkedColor={COLORS.lightGreen}
                />
                <CheckBox
                    title="רגישות לגלוטן"
                    checked={gluten_free2}
                    onPress={() => setGluten(!gluten_free2)}
                    containerStyle={styles.checkContainer}
                    textStyle={styles.optionText}
                    checkedColor={COLORS.lightGreen}
                />
                <CheckBox
                    title="כשרות"
                    checked={kosher2}
                    onPress={() => setKosher(!kosher2)}
                    containerStyle={styles.checkContainer}
                    textStyle={styles.optionText}
                    checkedColor={COLORS.lightGreen}
                />
                <Button title="test" onPress={handleFood}/>
            </View>
        </ScrollView>
    )
        ;
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: COLORS.white,
    },
    title: {
        fontFamily: 'Rubik-Bold',
        fontWeight: "600",
        fontSize: 27,
        color: COLORS.title,
        marginHorizontal: 10,
    },
    question: {
        fontFamily: 'Rubik-Regular',
        fontWeight: '700',
        color: COLORS.grey,
        marginHorizontal: 10,
    },
    prefContainer: {
        flexDirection: 'column',
        marginHorizontal: 10,
        marginVertical: 10,
        // justifyContent: "flex-start"
    },
    optionText: {
        fontFamily: 'Rubik-Regular',
        fontSize: 17,
        color: COLORS.grey,
    },
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height:50,
        borderWidth:1,
        borderColor: COLORS.grey,
        marginVertical: 10,
        borderRadius: 10,
    },
});

export default FoodPreferences;
