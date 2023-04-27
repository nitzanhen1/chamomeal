import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {HelperText, RadioButton} from 'react-native-paper';
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {setPhysicalActivity} from "../redux/actions";
import {Button} from '@rneui/themed';


const PhysicalActivity = ({navigation}) => {
    const {physical_activity} = useSelector(state => state.mealReducer);
    const [pa2, setPA] = useState(physical_activity);
    const dispatch = useDispatch();

    const [PAError, setPAError] = useState('');


    const handlePA = () => {
        if (validatePA()) {
            dispatch(setPhysicalActivity(pa2))
            navigation.navigate('FoodPreferences')
        }
    };

    const handleBack = () => {
        dispatch(setPhysicalActivity(pa2))
        navigation.navigate('PersonalDetails')
    };

    function validatePA() {
        if (!pa2) {
            setPAError('שדה זה הוא חובה');
            return false
        } else {
            setPAError('')
            return true
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/*<Text style={styles.title}>*/}
            {/*    פעילות גופנית*/}
            {/*</Text>*/}
            <Text style={styles.question}>
                עד כמה אתם פעילים גופנית?
            </Text>

            <RadioButton.Group onValueChange={newValue => setPA(newValue)} value={pa2}>
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
                    <HelperText type="error" visible={!pa2}>
                        {PAError}
                    </HelperText>
                </View>
            </RadioButton.Group>
            <Button
                title="המשך"
                onPress={handlePA}
                color={COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
            />
            <Button
                title="חזור"
                onPress={handleBack}
                color={COLORS.white}
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
    question: {
        fontFamily: 'Rubik-Regular',
        fontWeight: '700',
        color: COLORS.darkGrey,
        marginHorizontal: 10,
        marginTop: 10
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
        color: COLORS.darkGrey,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.darkGrey,
        marginVertical: 10,
        borderRadius: 10,
    },
    nextButton: {
        width: '85%',
        marginBottom: '5%',
        alignSelf: "center"
    },
    nextText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 20
    },
    backButton: {
        width: '85%',
        alignSelf: "center",
        borderWidth: 1,
        borderColor: COLORS.lightGreen
    },
    backText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 20,
        color: COLORS.darkGrey
    },
});

export default PhysicalActivity;
