import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getFavorites, setHeartAndChoose} from "../redux/actions";
import PreviewCard from "../components/PreviewCard";
import {useFocusEffect} from "@react-navigation/native";
import COLORS from "../consts/colors";

export default function FavoriteScreen() {

    const {favorites} = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getFavorites()).then();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                dispatch(setHeartAndChoose('', 0, true, false));

            };
        }, [])
    );

    return (
        <ScrollView style={styles.inputsContainer}>
            {favorites.map(meal=>
                <View key={meal.recipe_id}>
                    <PreviewCard recipe={meal} sustainable={false} from={'favorites'}/>
                </View>
            )}
            {favorites.length==0 && <Text style={styles.helloText}>אין לך מועדפים</Text>}
        </ScrollView>
    )
};
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems:  "center",
    },
    helloText: {
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        height: 30,
        marginTop: 20,
        marginBottom: 15,
        paddingRight: 20,
        fontFamily: 'Rubik-Bold',
        letterSpacing: 1,
        color: COLORS.darkGrey
    },
});