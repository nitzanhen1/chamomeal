import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Image} from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import BottomNavigator from './app/components/BottomNavigator';
import COLORS from './app/consts/colors';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PantryScreen from './app/screens/PantryScreen';

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <View style={styles.header} >
      <Image
      style={styles.imageHeader}
      source={require('./app/assets/icon4.png')}
      />
      <Text style={styles.chamoText}>CHAMO</Text><Text style={styles.mealText}>MEAL</Text>
      <Image
      style={styles.imageHeader}
      source={require('./app/assets/icon4.png')}
      />
    </View>
    
  );
} 
export default function App() {
  const [name,setName] = useState('Mash')
  return (
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <Stack.Navigator 
        initialRouteName="Splash"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: COLORS.primary
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold'
            },
            headerTitle: props => <LogoTitle {...props}  />
          }}>
          {/* <Stack.Screen name="Welcome" component={WelcomeScreen}/> */}
          <Stack.Screen name="CHAMOMEAL" component={BottomNavigator}
          />
         </Stack.Navigator>
         </SafeAreaView>
       </NavigationContainer>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currebtHeight : 0,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

  },
  chamoText: {
    color: COLORS.white,
    fontSize: 28,
    paddingLeft: 20,
    
  },
  mealText:{
    color: COLORS.secondary,
    fontSize: 28,
    fontFamily: 'Cochin',
    fontWeight: 'bold',   
    paddingRight: 20,
  },
  imageHeader: {
    justifyContent: 'flex-start',
    width: 40,
    height: 40,

  }
});
