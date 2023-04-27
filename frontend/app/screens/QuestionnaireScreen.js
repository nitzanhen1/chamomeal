import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react'
import PersonalDetails from "../components/PersonalDetails";
import PhysicalActivity from "../components/PhysicalActivity";
import FoodPreferences from "../components/FoodPreferences";
import colors from "../consts/colors";
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {updateUserPreferences} from "../redux/actions";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Feather} from "@expo/vector-icons";


const Stack = createNativeStackNavigator();

const QuestionnaireScreen = ({navigation, route}) => {
    const {
        year_of_birth,
        height,
        weight,
        gender,
        physical_activity,
        vegan,
        vegetarian,
        without_lactose,
        gluten_free,
        kosher
    } = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();

    function handleFinish(foodData) {
        dispatch(updateUserPreferences(year_of_birth, height, weight, gender, physical_activity, foodData.vegan2, foodData.vegetarian2, foodData.without_lactose2, foodData.gluten_free2, foodData.kosher2)).then(() => {
            const prevRouteName = route.params.prevRouteName;
            const screenToNavigate = (prevRouteName == 'PersonalScreen') ? 'BottomNavigator' : 'LoadingScreen';
            navigation.navigate(screenToNavigate);
        });
    }

    function handleBack() {
        Alert.alert('אתה בטוח שברצונך לבטל את השינויים?', null,
            [
                {text: 'כן', onPress: () => navigation.goBack()},
                {
                    text: 'לא',
                    style: 'cancel',
                },
            ],
            {cancelable: true});
        // dispatch(setEarned(false));
    }

    function returnButton() {
        return (
            <Feather name="arrow-right" size={30} style={styles.flowerIcon} onPress={() => handleBack()}/>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.view}>
            <View style={styles.formContainer}>
                <Stack.Navigator
                    initialRouteName="PersonalDetails"
                    screenOptions={{
                        headerShown: true,
                    }}>
                    <Stack.Screen name="PersonalDetails" component={PersonalDetails}
                                  options={{
                                      headerTitle: "פרופיל פיזיולוגי",
                                      headerTitleAlign: "center",
                                      headerTitleStyle:
                                          {
                                              fontFamily: 'Rubik-Bold',
                                              fontWeight: "600",
                                              fontSize: 27,
                                              color: COLORS.title,
                                          },
                                      headerBackVisible: false,
                                      headerRight: () => (returnButton()
                                      ),
                                  }}/>
                    <Stack.Screen name="PhysicalActivity" component={PhysicalActivity}
                                  options={{
                                      headerTitle: "פעילות גופנית",
                                      headerTitleAlign: "center",
                                      headerTitleStyle:
                                          {
                                              fontFamily: 'Rubik-Bold',
                                              fontWeight: "600",
                                              fontSize: 27,
                                              color: COLORS.title,
                                          },
                                      headerBackVisible: false,
                                  }}
                    />
                    <Stack.Screen name="FoodPreferences"
                                  options={{
                                      headerTitle: "העדפות תזונתיות",
                                      headerTitleAlign: "center",
                                      headerTitleStyle:
                                          {
                                              fontFamily: 'Rubik-Bold',
                                              fontWeight: "600",
                                              fontSize: 27,
                                              color: COLORS.title,
                                          },
                                      headerBackVisible: false,
                                  }}
                    >
                        {(props) => <FoodPreferences {...props} handleFinish={(foodData) => handleFinish(foodData)}/>}
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
        backgroundColor: colors.grey,
        marginTop: 10,
    },
})

export default QuestionnaireScreen;