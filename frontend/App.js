import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, SafeAreaView, StatusBar, TouchableOpacity, Alert} from 'react-native';
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
import EditUserInfo from "./app/components/EditUserInfo";
import {getGlobalDetails} from "./app/redux/actions";
import {Ionicons, Feather} from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import ChangePassword from "./app/components/ChangePassword";
import ForgotPasswordScreen from "./app/screens/ForgotPasswordScreen";
import LoadingScreen from "./app/screens/LoadingScreen";
import {MenuProvider} from "react-native-popup-menu";

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

    function returnButton(){
        const navigation = useNavigation();
        return (
            <Feather name="arrow-right" size={30} style={styles.flowerIcon} onPress={() => {
                Alert.alert('אתה בתוך שברצונך לצאת? שינויים שנעשו לא יישמרו', null,
                    [
                        { text: 'כן', onPress: () => navigation.goBack() },
                        {
                            text: 'לא',
                            style: 'cancel',
                        },
                    ],
                    { cancelable: true });
            }}/>
        );
    }

    function getFlowers(route) {
        const { score } = useSelector(state => state.mealReducer);
        const dispatch = useDispatch();
        const navigation = useNavigation();

        useEffect(() => {
            dispatch(getGlobalDetails()).then();
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
                    <MenuProvider>
                    <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
                    <Stack.Navigator
                        initialRouteName="LoadingScreen"
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
                        <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="BottomNavigator" component={BottomNavigator}
                                      options={({ route }) => ({
                                                    headerTitle: getHeaderTitle(route),
                                          headerTitleStyle: {
                                              fontSize: 24,
                                              fontFamily: 'Rubik-Bold',
                                          },
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
                        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}
                                      options={{
                                          headerTitle:'איפוס סיסמה',
                                          headerShown:true,
                                          headerRight: () => (returnButton()
                                          ),
                                          headerTitleStyle: {
                                              fontSize: 21,
                                              fontFamily: 'Rubik-Bold',
                                          },
                                      }}/>
                        <Stack.Screen name="QuestionnaireScreen" component={QuestionnaireScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="EditUserInfo" component={EditUserInfo}
                                      options={{
                                          headerShown:true,
                                          headerTitle:'עדכון פרטי משתמש',
                                          headerRight: () => (returnButton()
                                          ),
                                          headerTitleStyle: {
                                              fontSize: 21,
                                              fontFamily: 'Rubik-Bold',
                                          },
                                      }}/>
                        <Stack.Screen name="ChangePassword" component={ChangePassword}
                                      options={{
                                          headerShown:true,
                                          headerTitle:'עדכון סיסמה',
                                          headerRight: () => (returnButton()
                                          ),
                                          headerTitleStyle: {
                                              fontSize: 21,
                                              fontFamily: 'Rubik-Bold',
                                          },
                                      }}/>
                    </Stack.Navigator>
                    </MenuProvider>
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
        marginRight:-10,
        paddingTop: 6,
        alignSelf: "flex-start",
        marginBottom: 6,
        marginLeft: 6,
        flexDirection: 'row',
        width: 65,
        justifyContent: 'flex-end',
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