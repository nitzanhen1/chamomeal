
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import SearchScreen from '../screens/SearchScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import PlannerScreen from '../screens/PlannerScreen';
import EarthScreen from '../screens/EarthScreen';
import PersonalScreen from '../screens/PersonalScreen';


const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = () => {
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
        name="favorites"
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
        name="save the global"
        component={EarthScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="public" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="account"
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