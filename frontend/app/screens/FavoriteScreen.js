import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getFavorites, setHeartAndChoose} from "../redux/actions";
import PreviewCard from "../components/PreviewCard";
import {useFocusEffect} from "@react-navigation/native";

export default function FavoriteScreen() {

    const {favorites} = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getFavorites()).then();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                dispatch(setHeartAndChoose('', true, false));

            };
        }, [])
    );

    return (
        <ScrollView style={styles.inputsContainer}>
            {favorites.map(meal=>
                <View key={meal.recipe_id}>
                    <PreviewCard recipe={meal} sustainable={false} />
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