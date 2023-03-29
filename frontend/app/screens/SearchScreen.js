import React from 'react';
import {StyleSheet, View, Text, ScrollView, LayoutAnimation} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import PreviewCard from "../components/PreviewCard";
import { RadioButton, Searchbar} from 'react-native-paper';
import { Button } from '@rneui/themed';
// import { Button } from 'react-native-paper';
import COLORS from "../consts/colors";
import {search} from "../redux/actions";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function SearchScreen() {

    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [onlyIngredientsFilter, setOnlyIngredientsFilter] = React.useState("false");
    const [includePrefsFilter, setIncludePrefsFilter] = React.useState("true");
    const [mealTypeFilter, setMealTypeFilter] = React.useState('none');
    const { searchResults} = useSelector(state => state.mealReducer);


    const onChangeSearch = query => setSearchQuery(query);

    function searchRecipes() {
        dispatch(search(searchQuery,onlyIngredientsFilter,includePrefsFilter,mealTypeFilter)).then();
    }
    function toggleExpand() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    }
    return (
        <View>
            <View style={styles.searchView}>
                <Button
                    icon={{
                        name: 'filter-menu-outline',
                        type: 'material-community',
                        size: 20,
                        color: COLORS.darkGrey,
                    }}
                    // mode="contained-tonal"
                    // title='חפש'
                    onPress={()=>toggleExpand()}
                    buttonStyle={styles.filterButton}
                    // color={COLORS.grey}
                    // containerColor={COLORS.light}
                />
                <Searchbar
                    // placeholder="חיפוש"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchContainer}
                    inputStyle={styles.inputStyle}
                    // iconColor={'transparent'}
                    // icon={null}
                />
                <Button
                    // icon={{
                    //     name: 'magnifying-glass',
                    //     type: 'entypo',
                    //     size: 18,
                    //     color: 'black',
                    // }}
                    // mode="contained-tonal"
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
                    <RadioButton.Group onValueChange={newValue => setOnlyIngredientsFilter(newValue)}
                                       value={onlyIngredientsFilter}>
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <RadioButton color={COLORS.lightGreen} value="false"></RadioButton>
                                <Text style={styles.optionText}>מתכונים ומרכיבים</Text>
                            </View>
                            <View>
                                <RadioButton color={COLORS.lightGreen} value="true"></RadioButton>
                                <Text style={styles.optionText}>מרכיבים בלבד</Text>
                            </View>
                        </View>
                    </RadioButton.Group>
                    <RadioButton.Group onValueChange={newValue => setIncludePrefsFilter(newValue)}
                                       value={includePrefsFilter}>
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <RadioButton color={COLORS.lightGreen} value="true"></RadioButton>
                                <Text style={styles.optionText}>לפי העדפות</Text>
                            </View>
                            <View>
                                <RadioButton color={COLORS.lightGreen} value="false"></RadioButton>
                                <Text style={styles.optionText}>לא לפי העדפות</Text>
                            </View>
                        </View>
                    </RadioButton.Group>
                    <RadioButton.Group onValueChange={newValue => setMealTypeFilter(newValue)} value={mealTypeFilter}>
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <RadioButton color={COLORS.lightGreen} value="none"></RadioButton>
                                <Text style={styles.optionText}>הכל</Text>
                            </View>
                            <View>
                                <RadioButton color={COLORS.lightGreen} value="breakfast"></RadioButton>
                                <Text style={styles.optionText}>ארוחת בוקר</Text>
                            </View>
                            <View>
                                <RadioButton color={COLORS.lightGreen} value="lunch"></RadioButton>
                                <Text style={styles.optionText}>ארוחת צהריים</Text>
                            </View>
                            <View>
                                <RadioButton color={COLORS.lightGreen} value="dinner"></RadioButton>
                                <Text style={styles.optionText}>ארוחת ערב</Text>
                            </View>
                        </View>
                    </RadioButton.Group>
                </View>
            }
            <ScrollView style={styles.inputsContainer}>
                {searchResults.map(meal=>
                    <View key={meal.recipe_id}>
                        <PreviewCard recipe={meal} needHeartIcon={true} needChooseButton={false} />
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
        alignItems:  "center",
    },

    searchContainer:{
        // marginTop: 10,
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
    searchButton:{
        flex:1,
        backgroundColor: COLORS.primary,
        borderRadius: 40,
        height: 42,
        // width:16,
        marginLeft: 5
        // margin: 3
    },
    filterButton: {
        flex: 1,
        backgroundColor: COLORS.light,
        borderRadius: 40,
        height: 42,
        // width:16,
        marginRight: 5
        // margin: 3
    }


});