import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getFavorites} from "../redux/actions";
import PreviewCard from "../components/PreviewCard";

export default function FavoriteScreen() {

    const dispatch = useDispatch();
    const [favoriteMeals, satFavoriteMeals] = useState([]);

    useEffect(() => {
        dispatch(getFavorites()).then((favoriteMeals)=>{
            satFavoriteMeals(favoriteMeals)
        });
    });
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