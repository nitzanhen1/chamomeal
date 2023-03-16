
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Alert, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import SearchScreen from '../screens/SearchScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import PlannerScreen from '../screens/PlannerScreen';
import GameScreen from '../screens/GameScreen';
import PersonalScreen from '../screens/PersonalScreen';
import {setEarned} from "../redux/actions";



const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = ({ navigation }) => {
    const {earned} = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        // This code will be executed whenever the value of 'badges' changes
        if(earned){
            Alert.alert('New Badge Unlocked!', 'New Badge Unlocked!',
                [
                    { text: 'Go see', onPress: () => navigation.navigate('Sustainability') },
                    {
                        text: 'Later',
                        onPress: () => console.log('No Pressed'),
                        style: 'cancel',
                    },
                ],
                { cancelable: true });
            dispatch(setEarned(false));
        }
    }, [earned]);

  return (
    <Tab.Navigator
      initialRouteName="Meal Planner"
      activeColor={COLORS.primary}
      inactiveColor={COLORS.grey}
      barStyle={{ backgroundColor: COLORS.white }}
      >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="favorite-border" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Meal Planner"
        component={PlannerScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View style={styles.centerTabd}>
              <Icon name="list-alt" color={color} size={26} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Sustainability"
        component={GameScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="public" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={PersonalScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="account-circle" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({

});
export default BottomNavigator;