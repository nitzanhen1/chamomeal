import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {CheckBox, Button} from '@rneui/themed';
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {setFoodPreference} from "../redux/actions";
import PhysicalActivity from "./PhysicalActivity";

const FoodPreferences = (props) => {
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

    const handleFood = () => {
        const foodData = {vegan2, vegetarian2, without_lactose2, gluten_free2, kosher2};
        dispatch(setFoodPreference(foodData));
        props.handleFinish();
    };

    const handleBack = () => {
        const foodData = {vegan2, vegetarian2, without_lactose2, gluten_free2, kosher2};
        dispatch(setFoodPreference(foodData));
        props.navigation.navigate('PhysicalActivity')
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
            </View>
            <Button
                title="סיים"
                onPress={handleFood}
                color = {COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
            />
            <Button
                title="חזור"
                onPress={handleBack}
                color = {COLORS.white}
                containerStyle={styles.backButton}
                titleStyle={styles.backText}
                radius={8}
            />
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
    nextButton: {
        marginTop: 10,
        width: '85%',
        height: 65,
        alignSelf: "center"

    },
    nextText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 20
    },
    backButton: {
        width: '85%',
        height: 45,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: COLORS.lightGreen
    },
    backText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 20,
        color: COLORS.grey
    },
});

export default FoodPreferences;
