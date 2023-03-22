import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useDispatch} from "react-redux";
import {getFavorites} from "../redux/actions";
import PreviewCard from "../components/PreviewCard";

export default function FavoriteScreen() {

    const dispatch = useDispatch();
    const [favoriteMeals, setFavoriteMeals] = useState([]);
    const mountedRef = useRef()
    dispatch(getFavorites()).then((favoriteMeals)=>{setFavoriteMeals(favoriteMeals)});

    useEffect(() => {
        if (mountedRef.current){
            dispatch(getFavorites()).then((favoriteMeals)=>{
                setFavoriteMeals(favoriteMeals)
        })};
    }, [favoriteMeals]);

    return (
        <ScrollView style={styles.inputsContainer}>
            {favoriteMeals.map(meal=>
                <View key={meal.recipe_id}>
                    <PreviewCard props={meal} />
                </View>
            )}
        </ScrollView>
    )
};
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems:  "center",
    },
});