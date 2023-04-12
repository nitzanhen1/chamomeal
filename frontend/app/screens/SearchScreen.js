import React, {useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, LayoutAnimation, Keyboard} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import PreviewCard from "../components/PreviewCard";
import {Searchbar} from 'react-native-paper';
import {Button, CheckBox, Divider} from '@rneui/themed';
import COLORS from "../consts/colors";
import { search} from "../redux/actions";

export default function SearchScreen() {

    const dispatch = useDispatch();

    const [expanded, setExpanded] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const {searchResults, vegan, vegetarian, without_lactose, gluten_free, kosher} = useSelector(state => state.mealReducer);

    const [ingredientsCheck, setIngredientsCheck] = React.useState(false);
    const [lactoseCheck, setLactoseCheck] = React.useState(without_lactose);
    const [glutenCheck, setGlutenCheck] = React.useState(gluten_free);
    const [veganCheck, setVeganCheck] = React.useState(vegan);
    const [vegetarianCheck, setVegetarianCheck] = React.useState(vegetarian);
    const [kosherCheck, setKosherCheck] = React.useState(kosher);
    const [breakfastCheck, setBreakfastCheck] = React.useState(true);
    const [lunchCheck, setLunchCheck] = React.useState(true);
    const [dinnerCheck, setDinnerCheck] = React.useState(true);

    const onChangeSearch = query => setSearchQuery(query);

    useEffect(() => {
        setLactoseCheck(without_lactose);
        setGlutenCheck(gluten_free);
        setVeganCheck(vegan);
        setVegetarianCheck(vegetarian);
        setKosherCheck(kosher);
    }, [vegan,
        vegetarian,
        without_lactose,
        gluten_free,
        kosher]);

    function searchRecipes() {
        Keyboard.dismiss()
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(false);
        dispatch(search(searchQuery, ingredientsCheck, lactoseCheck, glutenCheck, veganCheck, vegetarianCheck,
            kosherCheck, breakfastCheck, lunchCheck, dinnerCheck)).then();
    }

    function toggleExpand() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchView}>
                <Button
                    icon={{
                        name: 'filter-menu-outline',
                        type: 'material-community',
                        size: 20,
                        color: COLORS.darkGrey,
                    }}
                    onPress={() => toggleExpand()}
                    buttonStyle={styles.filterButton}
                />
                <Searchbar
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchContainer}
                    inputStyle={styles.inputStyle}
                />
                <Button
                    title='חפש'
                    onPress={searchRecipes}
                    buttonStyle={styles.searchButton}
                    color={COLORS.grey}
                    containerColor={COLORS.lightGreen}
                />
            </View>
            {
                expanded &&
                <View>

                    <View style={styles.filterContainer}>
                        <Text style={styles.filterTitle}>העדפות</Text>
                        <View style={styles.filterOptions}>
                            {/*<View style={styles.radioButtonContainer}>*/}
                            <CheckBox
                                checked={veganCheck}
                                title='צמחוני'
                                onPress={() => setVeganCheck(!veganCheck)}
                                containerStyle={styles.radioButtonContainer}
                                textStyle={styles.optionText}
                                checkedColor={COLORS.lightGreen}
                            />
                            <CheckBox
                                checked={vegetarianCheck}
                                title='טבעוני'
                                onPress={() => setVegetarianCheck(!vegetarianCheck)}
                                containerStyle={styles.radioButtonContainer}
                                textStyle={styles.optionText}
                                checkedColor={COLORS.lightGreen}
                            />
                            <CheckBox
                                checked={lactoseCheck}
                                title='ללא לקטוז'
                                onPress={() => setLactoseCheck(!lactoseCheck)}
                                containerStyle={styles.radioButtonContainer}
                                textStyle={styles.optionText}
                                checkedColor={COLORS.lightGreen}
                            />
                            <CheckBox
                                checked={glutenCheck}
                                title='ללא גלוטן'
                                onPress={() => setGlutenCheck(!glutenCheck)}
                                containerStyle={styles.radioButtonContainer}
                                textStyle={styles.optionText}
                                checkedColor={COLORS.lightGreen}
                            />
                            <CheckBox
                                checked={kosherCheck}
                                title='כשר'
                                onPress={() => setKosherCheck(!kosherCheck)}
                                containerStyle={styles.radioButtonContainer}
                                textStyle={styles.optionText}
                                checkedColor={COLORS.lightGreen}
                            />
                        </View>
                    </View>
                    <Divider width={2} color={COLORS.lightGrey} style={styles.divider}/>
                    <View style={styles.filterContainer}>
                        <Text style={styles.filterTitle}>סוג ארוחה</Text>
                        <View style={styles.filterOptions}>
                            {/*<View style={styles.radioButtonContainer}>*/}
                            <CheckBox
                                checked={breakfastCheck}
                                title='בוקר'
                                onPress={() => setBreakfastCheck(!breakfastCheck)}
                                containerStyle={styles.radioButtonContainer}
                                textStyle={styles.optionText}
                                checkedColor={COLORS.lightGreen}
                            />
                            <CheckBox
                                checked={lunchCheck}
                                title='צהריים'
                                onPress={() => setLunchCheck(!lunchCheck)}
                                containerStyle={styles.radioButtonContainer}
                                textStyle={styles.optionText}
                                checkedColor={COLORS.lightGreen}
                            />
                            <CheckBox
                                checked={dinnerCheck}
                                title='ערב'
                                onPress={() => setDinnerCheck(!dinnerCheck)}
                                containerStyle={styles.radioButtonContainer}
                                textStyle={styles.optionText}
                                checkedColor={COLORS.lightGreen}
                            />
                        </View>
                    </View>
                    <Divider width={2} color={COLORS.lightGrey} style={styles.divider}/>

                    <View style={styles.filterContainer}>
                        <Text style={styles.filterTitle}>חיפוש לפי</Text>
                        <View style={styles.filterOptions}>
                            <CheckBox
                                checked={ingredientsCheck}
                                title='מרכיבים בלבד'
                                onPress={() => setIngredientsCheck(!ingredientsCheck)}
                                containerStyle={styles.radioButtonContainer}
                                textStyle={styles.optionText}
                                checkedColor={COLORS.lightGreen}
                            />
                        </View>
                    </View>
                </View>
            }
            <ScrollView style={styles.inputsContainer}>
                {searchResults.map(meal =>
                    <View key={meal.recipe_id}>
                        <PreviewCard recipe={meal} sustainable={false}/>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        direction: 'rtl',
        height: '100%'
    },
    inputsContainer: {
        paddingHorizontal: 10
    },
    searchContainer: {
        borderRadius: 50,
        height: 42,
        backgroundColor: COLORS.light,
        borderColor: COLORS.grey,
        borderWidth: 2,
        borderStyle: "solid",
        flex: 7
    },
    inputStyle: {
        fontFamily: 'Rubik-Regular'
    },
    searchView: {
        flexDirection: 'row',
        margin: 5,
    },
    searchButton: {
        flex: 1,
        backgroundColor: COLORS.lightGreen,
        borderRadius: 40,
        height: 42,
        marginLeft: 5
    },
    filterButton: {
        flex: 1,
        backgroundColor: COLORS.light,
        borderRadius: 40,
        height: 42,
        marginRight: 5
    },
    filterContainer: {
        flexDirection: 'column',
        marginHorizontal: 5,
        // backgroundColor: COLORS.light,
        marginBottom: 3,
    },
    filterTitle: {
        fontFamily: 'Rubik-Regular',
        fontSize: 16,
        color: COLORS.dark,
        marginHorizontal: 12,
        marginTop: 3
    },
    filterOptions: {
        flexDirection: 'column',
        marginTop: 5,
        justifyContent: 'space-evenly'
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginTop:1
        // backgroundColor: COLORS.
    },
    optionText: {
        fontFamily: 'Rubik-Regular',
        fontSize: 14,
        color: COLORS.darkGrey,
    },
    divider: {
        marginHorizontal: 10,
        marginVertical:2
    }
});