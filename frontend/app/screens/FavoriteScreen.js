import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, Button} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import foods from '../consts/food';
import Checkbox from 'expo-checkbox';
// import CheckBox from '@react-native-community/checkbox';
import CartCard from '../components/Meal'


export default function FavoriteScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 80}}
                data={foods}
                renderItem={({item}) =>
                    <View style={styles.meal}>
                        <CartCard item={item} />
                    </View>}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.white,
        flex: 1,
        direction: 'rtl',
    },
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    meal:{
        height: 100,
        elevation: 15,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        // flexDirection: 'row-reverse',
        alignItems: 'center',
    }
});