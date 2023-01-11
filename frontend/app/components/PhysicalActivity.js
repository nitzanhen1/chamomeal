import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Input} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {CheckBox, ListItem} from '@rneui/themed';
import {RadioButton} from 'react-native-paper';
import COLORS from "../consts/colors";

const PhysicalActivity = (props) => {
    const [pa, setPA] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                פעילות גופנית
            </Text>
            <Text style={styles.question}>
                עד כמה אתם פעילים גופנית?
            </Text>

            <RadioButton.Group onValueChange={newValue => setPA(newValue)} value={pa}>
                <View style={styles.paContainer}>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton color={COLORS.lightGreen} value="sedentary"></RadioButton>
                            <Text style={styles.optionText}>לא פעיל/ה</Text>
                        </View>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton color={COLORS.lightGreen} value="low active"/>
                            <Text style={styles.optionText}>פעיל/ה במידה נמוכה</Text>
                        </View>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton color={COLORS.lightGreen} value="active"/>
                            <Text style={styles.optionText}>פעיל/ה</Text>
                        </View>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton color={COLORS.lightGreen} value="very active"/>
                            <Text style={styles.optionText}>פעיל/ה במידה רבה</Text>
                        </View>
                </View>
            </RadioButton.Group>
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
    inputText: {
        fontFamily: 'Rubik-Regular',
        backgroundColor: COLORS.white,
        marginHorizontal: 10,
        marginVertical: 10
    },
    genderTitle: {

        fontFamily: 'Rubik-Regular',
        fontSize: 17,
        color: COLORS.grey,
        marginHorizontal: 12,
    },
    paContainer: {
        flexDirection: 'column',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    paOptions: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-evenly'
    },
    optionText: {
        fontFamily: 'Rubik-Regular',
        fontSize: 17,
        color: COLORS.grey,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height:50,
        borderWidth:1,
        borderColor: COLORS.grey,
        marginVertical: 10,
        borderRadius: 10,
    },
});

export default PhysicalActivity;
