import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity} from 'react-native';
import BottomNavigator from './app/components/BottomNavigator';
import COLORS from './app/consts/colors';
import {NavigationContainer, getFocusedRouteNameFromRoute, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts} from 'expo-font';
import { I18nManager } from "react-native"
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
import {Provider, useDispatch, useSelector} from 'react-redux';
import { Store } from './app/redux/store';
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import QuestionnaireScreen from "./app/screens/QuestionnaireScreen";
import {getUserDetails} from "./app/redux/actions";
import {Ionicons} from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

export default function App() {

    const [fontsLoaded] = useFonts({
        'Rubik-Regular': require('./app/assets/fonts/Rubik-Regular.ttf'),
        'Rubik-Bold': require('./app/assets/fonts/Rubik-Bold.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    function getFlowers(route) {
        const { score } = useSelector(state => state.mealReducer);
        const dispatch = useDispatch();
        const navigation = useNavigation();

        useEffect(() => {
            dispatch(getUserDetails()).then();
        }, []);

        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Meal Planner';

        switch (routeName) {
            case 'Meal Planner':
                return (
                    <TouchableOpacity style={styles.flowerContainer} onPress={() => navigation.navigate('Sustainability')}>
                        <Text style={styles.flowerText}>{score}</Text>
                        <Ionicons name="flower-outline" size={24} style={styles.flowerIcon}/>
                    </TouchableOpacity>
                );
            case 'Search':
                return null;
            case 'Favorites':
                return null;
            case 'Sustainability':
                return null;
            case 'Account':
                return null;
        }
    }

    function getHeaderTitle(route) {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Meal Planner';

        switch (routeName) {
            case 'Meal Planner':
                return 'התפריט היומי שלי';
            case 'Search':
                return 'חיפוש';
            case 'Favorites':
                return 'מועדפים';
            case 'Sustainability':
                return 'ההישגים שלי';
            case 'Account':
                return 'החשבון שלי';
        }
    }



    return (
        <Provider store={Store}>
            <NavigationContainer>
                <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
                    <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
                    <Stack.Navigator
                        initialRouteName="Login"
                        screenOptions={{
                            headerBackVisible: false ,
                            headerTitleAlign: 'center',
                            headerStyle: {
                                backgroundColor: COLORS.primary
                            },
                            headerTintColor: '#ffffff',
                            headerTitleStyle: {
                                fontSize: 21,
                                fontWeight: 'bold',
                                fontFamily: 'Rubik-Regular',
                            },
                        }}>
                        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="BottomNavigator" component={BottomNavigator}
                                      options={({ route }) => ({
                                                    headerTitle: getHeaderTitle(route),
                                                    headerStyle: { backgroundColor : COLORS.primary},
                                                    headerLeft: () => getFlowers(route),
                                      })}
                        />
                        <Stack.Screen name="RegisterScreen" component={RegisterScreen}
                                      options={{
                                          headerTitle:'הרשמה',
                                          headerBackVisible: true,
                                          headerTitleAlign: "left",
                                          headerStyle: { backgroundColor : COLORS.white},
                                          headerTintColor: COLORS.grey
                                      }}/>
                        <Stack.Screen name="QuestionnaireScreen" component={QuestionnaireScreen} options={{headerShown:false}}/>
                    </Stack.Navigator>
                </SafeAreaView>
            </NavigationContainer>
        </Provider>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        direction: 'rtl'
    },
    chamoText: {
        color: COLORS.white,
        fontSize: 28,
        paddingLeft: 10,
    },
    mealText:{
        color: COLORS.secondary,
        fontSize: 28,
        fontWeight: 'bold',
        paddingRight: 10,
    },
    imageHeader: {
        justifyContent: 'flex-start',
        width: 40,
        height: 40,
    },
    flowerContainer: {
        paddingRight: 6,
        paddingTop: 6,
        alignSelf: "flex-start",
        marginBottom: 6,
        marginLeft: 6,
        flexDirection: 'row',
        width: 40,
    },
    flowerIcon: {
    color:"white"
},
flowerText: {
    paddingHorizontal: 3,
        fontFamily: 'Rubik-Regular',
        fontSize: 18,
        color:"white",
        paddingTop: 3,
        marginRight:4,
},
});