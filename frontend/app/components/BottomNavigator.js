
import React, {useRef, useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {AppState, Alert, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import SearchScreen from '../screens/SearchScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import PlannerScreen from '../screens/PlannerScreen';
import GameScreen from '../screens/GameScreen';
import PersonalScreen from '../screens/PersonalScreen';
import {checkDate, setEarned} from "../redux/actions";



const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = ({ navigation }) => {
    const {earned, EER, date} = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        // This code will be executed whenever the value of 'badges' changes
        if(earned){
            Alert.alert('כל הכבוד', 'זכית בהישג חדש! תוכל לצפות בו בעמוד ההישגים',
                [
                    { text: 'צפה כעת', onPress: () => navigation.navigate('Sustainability') },
                    {
                        text: 'אחר כך',
                        style: 'cancel',
                    },
                ],
                { cancelable: true });
            dispatch(setEarned(false));
        }
    }, [earned]);

    useEffect(() => {
        // This code will be executed whenever the value of 'badges' changes
        if(EER == 0){
            navigation.navigate('Login')
        }
    }, [EER]);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                dispatch(checkDate(date));
            }
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
        });
        return () => {
            subscription.remove();
        };
    }, []);

  return (
    <Tab.Navigator
      initialRouteName="Meal Planner"
      activeColor={COLORS.primary}
      inactiveColor={COLORS.grey}
      barStyle={{ backgroundColor: COLORS.white, height: '7.5%'}}
      >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
            tabBarLabel: "חיפוש",
            tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={26} style={{bottom: 2}}/>
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
            tabBarLabel: "מועדפים",
          tabBarIcon: ({color}) => (
            <Icon name="favorite-border" color={color} size={26} style={{bottom: 2}}/>
          ),
        }}
      />
      <Tab.Screen
        name="Meal Planner"
        component={PlannerScreen}
        options={{
            tabBarLabel: "תפריט יומי",
          tabBarIcon: ({color}) => (
            <View style={styles.centerTabd}>
              <Icon name="list-alt" color={color} size={26} style={{bottom: 2}}/>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Sustainability"
        component={GameScreen}
        options={{
            tabBarLabel: "ההישגים שלי",
          tabBarIcon: ({color}) => (
            <Icon name="public" color={color} size={26} style={{bottom: 2}}/>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={PersonalScreen}
        options={{
            tabBarLabel: "פרופיל אישי",
          tabBarIcon: ({color}) => (
            <Icon name="account-circle" color={color} size={26} style={{bottom: 2}}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({

});
export default BottomNavigator;