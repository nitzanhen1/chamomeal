import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TextInput, RadioButton} from 'react-native-paper';
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {setPersonalDetails} from "../redux/actions";
import { Button} from '@rneui/themed';


const PersonalDetails = ({navigation}) => {
    const {
        height,
        weight,
        birthDate,
        gender} = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();
    const [newBirthDate, setBirthDate] = useState(birthDate);
    const [newHeight, setHeight] = useState(height);
    const [newWeight, setWeight] = useState(weight);
    const [newGender, setGender] = useState(gender);

    const handleSubmit = () => {
        const newPersonalDetails = {newWeight, newHeight, newGender, newBirthDate};
        dispatch(setPersonalDetails(newPersonalDetails))
        navigation.navigate('PhysicalActivity')
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                פרופיל פיזיולוגי
            </Text>
            <Text style={styles.disclaimer}>
                על מנת להעריך את צריכת הקלוריות היומית המומלצת עבורך, אנו משתמשים בנוסחת EER (Estimated Energy
                Requirement). נוסחה זו משתמשת בנתוני גובה, משקל, מין וגיל.
            </Text>
            <TextInput
                mode="flat"
                label="גובה"
                value={newHeight}
                placeholder='ס"מ'
                onChangeText={newHeight => setHeight(newHeight)}
                selectionColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                underlineColor={COLORS.grey}
                style={styles.inputText}
                underlineStyle={styles.inputContainer}
            />
            <TextInput
                mode="flat"
                label="משקל"
                value={newWeight}
                placeholder='ק"ג'
                onChangeText={newWeight => setWeight(newWeight)}
                selectionColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                underlineColor={COLORS.grey}
                style={styles.inputText}
                underlineStyle={styles.inputContainer}
            />

            <TextInput
                mode="flat"
                label="תאריך לידה"
                value={newBirthDate}
                placeholder='yyyy-mm-dd'
                onChangeText={newBirthDate => setBirthDate(newBirthDate)}
                selectionColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                underlineColor={COLORS.grey}
                style={styles.inputText}
                underlineStyle={styles.inputContainer}
            />

            <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={newGender}>
                <View style={styles.genderContainer}>
                    <Text style={styles.genderTitle}>מין</Text>
                    <View style={styles.genderOptions}>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton color={COLORS.lightGreen} value="0"></RadioButton>
                            <Text style={styles.optionText}>זכר</Text>
                        </View>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton color={COLORS.lightGreen} value="1"/>
                            <Text style={styles.optionText}>נקבה</Text>
                        </View>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton color={COLORS.lightGreen} value="2"/>
                            <Text style={styles.optionText}>אחר</Text>
                        </View>
                    </View>

                </View>
            </RadioButton.Group>
            <Button
                title="המשך"
                onPress={handleSubmit}
                color = {COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
            />
        </ScrollView>
    )
        ;
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: COLORS.white,
    },
    title: {
        fontFamily: 'Rubik-Bold',
        fontWeight: "600",
        fontSize: 27,
        color: COLORS.title,
        marginHorizontal: 10,

    },
    disclaimer: {
        fontFamily: 'Rubik-Regular',
        fontWeight: '700',
        color: COLORS.grey,
        marginHorizontal: 10,
    },
    inputText: {
        fontFamily: 'Rubik-Regular',
        backgroundColor: COLORS.white,
        marginHorizontal: 10,
        marginVertical: 10
    },
    genderTitle: {

        fontFamily: 'Rubik-Regular',
        fontSize: 17,
        color: COLORS.grey,
        marginHorizontal: 12,
    },
    genderContainer: {
        flexDirection: 'column',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    genderOptions: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-evenly'
    },
    optionText: {
        fontFamily: 'Rubik-Regular',
        fontSize: 17,
        color: COLORS.grey,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nextButton: {
        marginTop: 10,
        width: '85%',
        height: 65,
        alignSelf: "center"
    },
    nextText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 20
    }
});

export default PersonalDetails;
