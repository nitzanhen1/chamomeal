import React, {useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, LayoutAnimation, Keyboard, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import PreviewCard from "../components/PreviewCard";
import {Searchbar} from 'react-native-paper';
import {Button, CheckBox, Divider} from '@rneui/themed';
import COLORS from "../consts/colors";
import {resetSearch, search, setHeartAndChoose} from "../redux/actions";
import {useFocusEffect} from "@react-navigation/native";


export default function SearchScreen() {

    const dispatch = useDispatch();

    const [expanded, setExpanded] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [noResults, setNoResults] = React.useState(false);
    const {
        searchResults,
        vegan,
        vegetarian,
        without_lactose,
        gluten_free,
        kosher
    } = useSelector(state => state.mealReducer);

    const [ingredientsCheck, setIngredientsCheck] = React.useState(false);
    const [lactoseCheck, setLactoseCheck] = React.useState(without_lactose);
    const [glutenCheck, setGlutenCheck] = React.useState(gluten_free);
    const [veganCheck, setVeganCheck] = React.useState(vegan);
    const [vegetarianCheck, setVegetarianCheck] = React.useState(vegetarian);
    const [kosherCheck, setKosherCheck] = React.useState(kosher);
    const [breakfastCheck, setBreakfastCheck] = React.useState(true);
    const [lunchCheck, setLunchCheck] = React.useState(true);
    const [dinnerCheck, setDinnerCheck] = React.useState(true);
    const [whileSearch, setWhileSearch] = React.useState(false)

    const onChangeSearch = query => setSearchQuery(query);

    function resetSearchScreen(){
        dispatch(resetSearch());
        setLactoseCheck(without_lactose);
        setGlutenCheck(gluten_free);
        setVeganCheck(vegan);
        setVegetarianCheck(vegetarian);
        setKosherCheck(kosher);
        setSearchQuery('');
        setExpanded(false);
        setIngredientsCheck(false);
        setBreakfastCheck(true);
        setLunchCheck(true);
        setDinnerCheck(true);
    }

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
        kosher,
    ]);

    async function searchRecipes() {
        Keyboard.dismiss();
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(false);
        let format = /[@#$%^&*()_+=\[\]{};':"\\|.<>?]+/;
        let fixedQuery = searchQuery.replace(/'/g, "’");
        let checkQuery = format.test(fixedQuery) ? false : true;
        if (checkQuery) {
            setWhileSearch(true);
            let data = await dispatch(search(fixedQuery, ingredientsCheck, lactoseCheck, glutenCheck, veganCheck, vegetarianCheck,
                kosherCheck, breakfastCheck, lunchCheck, dinnerCheck))
            setWhileSearch(false)
            if (data.length < 1) {
                setNoResults(true);
            } else {
                setNoResults(false);
            }
        } else {
            dispatch(resetSearch());
            setNoResults(true);
        }
    }

    function toggleExpand() {
        Keyboard.dismiss();
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    }

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                dispatch(setHeartAndChoose('', 0,true, false));
                resetSearchScreen();

            };
        }, [])
    );

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
                    onSubmitEditing={searchRecipes}
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchContainer}
                    inputStyle={styles.inputStyle}
                />
                <Button
                    title='חפש'
                    onPress={() => searchRecipes()}
                    onClearIconPress={() => setNoResults(false)}
                    buttonStyle={styles.searchButton}
                    color={COLORS.grey}
                    containerColor={COLORS.lightGreen}
                />
            </View>
            {
                expanded &&
                <ScrollView>

                    <View style={styles.filterContainer}>
                        <Text style={styles.filterTitle}>העדפות</Text>
                        <View style={styles.filterOptions}>
                            <CheckBox
                                checked={veganCheck}
                                title='טבעוני'
                                onPress={() => setVeganCheck(!veganCheck)}
                                containerStyle={styles.radioButtonContainer}
                                textStyle={styles.optionText}
                                checkedColor={COLORS.lightGreen}
                            />
                            <CheckBox
                                checked={vegetarianCheck}
                                title='צמחוני'
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
                </ScrollView>
            }
            {whileSearch && <ActivityIndicator style={styles.indicator} size="large" color={COLORS.darkGreen} />}
            {!whileSearch && <ScrollView style={styles.inputsContainer}>
                {searchResults.map(meal =>
                    <View key={meal.recipe_id}>
                        <PreviewCard recipe={meal} sustainable={false} from={'search'}/>
                    </View>
                )}
                {
                    noResults &&
                    <Text style={styles.helloText}>אין תוצאות</Text>

                }
            </ScrollView>}
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
        marginTop: 1
    },
    optionText: {
        fontFamily: 'Rubik-Regular',
        fontSize: 14,
        color: COLORS.darkGrey,
    },
    divider: {
        marginHorizontal: 10,
        marginVertical: 2
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
    indicator:{
        marginTop: '50%'
    }
});