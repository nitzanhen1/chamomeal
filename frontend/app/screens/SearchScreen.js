import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import PreviewCard from "../components/PreviewCard";
import { RadioButton, Searchbar} from 'react-native-paper';
import { Button } from 'react-native-paper';
import COLORS from "../consts/colors";
import {search} from "../redux/actions";

export default function SearchScreen() {

    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [onlyIngredientsFilter, setOnlyIngredientsFilter] = React.useState("false");
    const [includePrefsFilter, setIncludePrefsFilter] = React.useState("true");
    const [mealTypeFilter, setMealTypeFilter] = React.useState('none');
    const { searchResults} = useSelector(state => state.mealReducer);


    const onChangeSearch = query => setSearchQuery(query);

    function searchRecipes() {
        dispatch(search(searchQuery,onlyIngredientsFilter,includePrefsFilter,mealTypeFilter)).then();
    }

    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <RadioButton.Group onValueChange={newValue => setOnlyIngredientsFilter(newValue)} value={onlyIngredientsFilter} >
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <RadioButton color={COLORS.lightGreen} value="false" ></RadioButton>
                        <Text style={styles.optionText}>מתכונים ומרכיבים</Text>
                    </View>
                    <View>
                        <RadioButton color={COLORS.lightGreen} value="true"></RadioButton>
                        <Text style={styles.optionText}>מרכיבים בלבד</Text>
                    </View>
                </View>
            </RadioButton.Group>
            <RadioButton.Group onValueChange={newValue => setIncludePrefsFilter(newValue)} value={includePrefsFilter} >
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <RadioButton color={COLORS.lightGreen} value="true" ></RadioButton>
                        <Text style={styles.optionText}>לפי העדפות</Text>
                    </View>
                    <View>
                        <RadioButton color={COLORS.lightGreen} value="false"></RadioButton>
                        <Text style={styles.optionText}>לא לפי העדפות</Text>
                    </View>
                </View>
            </RadioButton.Group>
            <RadioButton.Group onValueChange={newValue => setMealTypeFilter(newValue)} value={mealTypeFilter} >
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <RadioButton color={COLORS.lightGreen} value="none"></RadioButton>
                        <Text style={styles.optionText}>הכל</Text>
                    </View>
                    <View>
                        <RadioButton color={COLORS.lightGreen} value="breakfast" ></RadioButton>
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
            <Button icon="camera" mode="contained" onPress={searchRecipes}>
            </Button>

            <ScrollView style={styles.inputsContainer}>
                {searchResults.map(meal=>
                    <View key={meal.recipe_id}>
                        <PreviewCard recipe={meal} />
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
});