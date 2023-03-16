import React, {useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView,StatusBar, Image} from 'react-native';
import BottomNavigator from './app/components/BottomNavigator';
import COLORS from './app/consts/colors';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts} from 'expo-font';
import { I18nManager } from "react-native"
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
import { Provider } from 'react-redux';
import { Store } from './app/redux/store';
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import QuestionnaireScreen from "./app/screens/QuestionnaireScreen";

const Stack = createNativeStackNavigator();


function LogoTitle() {
    return (
        <View style={styles.container} >
            <Image
                style={styles.imageHeader}
                source={require('./app/assets/icon4.png')}
            />
            <Text style={styles.mealText}>MEAL</Text>
            <Text style={styles.chamoText}>CHAMO</Text>
            <Image
                style={styles.imageHeader}
                source={require('./app/assets/icon4.png')}
            />
        </View>

    );
}
export default function App() {
    let [fontsLoaded] = useFonts({
        'Rubik-Regular': require('./app/assets/fonts/Rubik-Regular.ttf'),
        'Rubik-Bold': require('./app/assets/fonts/Rubik-Bold.ttf'),
    });

    return (
        <Provider store={Store}>
            <NavigationContainer>
                <SafeAreaView style={styles.container}>
                    <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
                    <Stack.Navigator
                        initialRouteName="Login"
                        screenOptions={{
                            // headerShown: false,
                            headerBackVisible: false ,
                            headerTitleAlign: 'center',
                            headerStyle: {
                                backgroundColor: COLORS.primary
                            },
                            headerTintColor: '#ffffff',
                            headerTitleStyle: {
                                fontSize: 25,
                                fontWeight: 'bold'
                            },
                            // headerTitle: props => <LogoTitle {...props}
                            // />
                        }}>
                        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{headerShown:false}}/>
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
    }
});