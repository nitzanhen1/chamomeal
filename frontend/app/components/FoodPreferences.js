import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Input} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {CheckBox, ListItem} from '@rneui/themed';
import {RadioButton} from 'react-native-paper';
import COLORS from "../consts/colors";

const FoodPreferences = (props) => {
    const [vegan, setVegan] = useState(false);
    const [vegetarian, setVegetarian] = useState(false);
    const [without_lactose, setLactose] = useState(false);
    const [gluten_free, setGluten] = useState(false);
    const [kosher, setKosher] = useState(false);


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
                    checked={vegan}
                    onPress={() => setVegan(!vegan)}
                    containerStyle={styles.checkContainer}
                    textStyle={styles.optionText}
                    checkedColor={COLORS.lightGreen}
                />
                <CheckBox
                    title="צמחונות"
                    checked={vegetarian}
                    onPress={() => setVegetarian(!vegetarian)}
                    containerStyle={styles.checkContainer}
                    textStyle={styles.optionText}
                    checkedColor={COLORS.lightGreen}
                />
                <CheckBox
                    title="רגישות ללקטוז"
                    checked={without_lactose}
                    onPress={() => setLactose(!without_lactose)}
                    containerStyle={styles.checkContainer}
                    textStyle={styles.optionText}
                    checkedColor={COLORS.lightGreen}
                />
                <CheckBox
                    title="רגישות לגלוטן"
                    checked={gluten_free}
                    onPress={() => setGluten(!gluten_free)}
                    containerStyle={styles.checkContainer}
                    textStyle={styles.optionText}
                    checkedColor={COLORS.lightGreen}
                />
                <CheckBox
                    title="כשרות"
                    checked={kosher}
                    onPress={() => setKosher(!kosher)}
                    containerStyle={styles.checkContainer}
                    textStyle={styles.optionText}
                    checkedColor={COLORS.lightGreen}
                />
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
