import {View, Text, StyleSheet, ScrollView} from 'react-native';
// import {Button} from 'react-native-elements';
import { Button} from '@rneui/themed';

import React, {useState} from 'react'
import PersonalDetails from "../components/PersonalDetails";
import PhysicalActivity from "../components/PhysicalActivity";
import FoodPreferences from "../components/FoodPreferences";
import colors from "../consts/colors";
import COLORS from "../consts/colors";

const QuestionnaireScreen = ({navigation}) => {
    const [formData, setFormData] = useState({});
    const [step, setStep] = useState(1);

    const handleFormSubmit = (data) => {
        setFormData(data);
    };

    function handlePress() {
        // navigation.navigate('BottomNavigator');
        setStep(step +1)
    }
    function handleBack() {
        // navigation.navigate('BottomNavigator');
        setStep(step -1)
    }
    function handleFinish() {
        navigation.navigate('BottomNavigator');
        // setStep(step -1)
    }


    return (
        <ScrollView contentContainerStyle={styles.view}>
            <View style={styles.formContainer}>
                {step === 1 && <PersonalDetails/>}
                {step === 2 && <PhysicalActivity/>}
                {step === 3 && <FoodPreferences/>}

            </View>

            {step !== 3 &&
                <Button
                    title="המשך"
                    onPress={handlePress}
                    color = {COLORS.lightGreen}
                    containerStyle={styles.nextButton}
                    titleStyle={styles.nextText}
                    radius={8}
                />
            }

            {step === 3 &&
                <Button
                    title="סיים"
                    onPress={handleFinish}
                    color = {COLORS.lightGreen}
                    containerStyle={styles.nextButton}
                    titleStyle={styles.nextText}
                    radius={8}
                />
            }

            <Button
                title="Back"
                onPress={handleBack}
                color = {COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
            />
        </ScrollView>

        // <View style={styles.view}>
        //     <Text>PreferenceScreen</Text>
        //     <Button title="PreferenceScreen" onPress={handlePress}/>
        // </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: COLORS.white,
        // height: "100%",
    },
    formContainer: {
        height: "83%",
        width: "97%",
        // paddingHorizontal: 5,
        backgroundColor: colors.grey,
        marginTop: 10,
        // alignSelf:"flex-start",
        // maxHeight: '100%',
    },
    nextButton: {
        marginTop: 10,
        width: '85%',
        height: 65,
        // position: "absolute",
        // top: "80%"

    },
    nextText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 20
    }

})

export default QuestionnaireScreen;