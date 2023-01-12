import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react'
import PersonalDetails from "../components/PersonalDetails";
import PhysicalActivity from "../components/PhysicalActivity";
import FoodPreferences from "../components/FoodPreferences";
import colors from "../consts/colors";
import COLORS from "../consts/colors";
import {useSelector} from "react-redux";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const QuestionnaireScreen = ({navigation}) => {
    const { birthDate,
        height,
        weight,
        gender,
        pa,
        vegan,
        vegetarian,
        without_lactose,
        gluten_free,
        kosher} = useSelector(state => state.mealReducer);

    const [step, setStep] = useState(1);

    function handlePress() {
        // navigation.navigate('BottomNavigator');
        setStep(step +1)
    }
    function handleBack() {
        // navigation.navigate('BottomNavigator');
        setStep(step -1)
    }
    function handleFinish() {
        // navigation.navigate('BottomNavigator');
        // setStep(step -1)
    }

    return (
        <ScrollView contentContainerStyle={styles.view}>
            <View style={styles.formContainer}>
                <Stack.Navigator
                    initialRouteName="PersonalDetails"
                    screenOptions={{
                        headerShown:false
                    }}>
                    <Stack.Screen name="PersonalDetails" component={PersonalDetails}/>
                    <Stack.Screen name="PhysicalActivity" component={PhysicalActivity}/>
                    <Stack.Screen name="FoodPreferences">
                        {(props) => <FoodPreferences {...props} handleFinish={()=>handleFinish()} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: COLORS.white,
    },
    formContainer: {
        height: "83%",
        width: "97%",
        // paddingHorizontal: 5,
        backgroundColor: colors.grey,
        marginTop: 10,
    },
    nextButton: {
        marginTop: 10,
        width: '85%',
        height: 65,
    },
    nextText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 20
    }

})

export default QuestionnaireScreen;