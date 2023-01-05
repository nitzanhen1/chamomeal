import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,StatusBar, Image} from 'react-native';
import BottomNavigator from './app/components/BottomNavigator';
import COLORS from './app/consts/colors';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useFonts} from 'expo-font';
import { I18nManager } from "react-native"
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
import { Provider } from 'react-redux';
import { Store } from './app/redux/store';

const Stack = createStackNavigator();

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
          <Stack.Screen name="CHAMOMEAL" component={BottomNavigator}
          />
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
