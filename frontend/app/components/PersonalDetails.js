import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Input} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {CheckBox, ListItem} from '@rneui/themed';
import {RadioButton} from 'react-native-paper';
import COLORS from "../consts/colors";

const PersonalDetails = (props) => {

    const [birthDate, setBirthDate] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = () => {
        const formData = {birthDate, height, weight, gender};
        props.onSubmit(formData);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                פרופיל פיזיולוגי
            </Text>
            <Text style={styles.disclaimer}>
                על מנת להעריך את צריכת הקלוריות היומי המומלצת עבורך, אנו משתמשים בנוסחת EER (Estimated Energy
                Requirement). נוסחה זו משתמשת בנתוני גובה, משקל, מין וגיל.
            </Text>
            <TextInput
                mode="flat"
                label="גובה"
                value={height}
                placeholder='ס"מ'
                onChangeText={height => setHeight(height)}
                selectionColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                underlineColor={COLORS.grey}
                style={styles.inputText}
                underlineStyle={styles.inputContainer}
            />
            <TextInput
                mode="flat"
                label="משקל"
                value={weight}
                placeholder='ק"ג'
                onChangeText={weight => setWeight(weight)}
                selectionColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                underlineColor={COLORS.grey}
                style={styles.inputText}
                underlineStyle={styles.inputContainer}
            />

            <TextInput
                mode="flat"
                label="תאריך לידה"
                value={birthDate}
                placeholder='yyyy-mm-dd'
                onChangeText={birthDate => setBirthDate(birthDate)}
                selectionColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                underlineColor={COLORS.grey}
                style={styles.inputText}
                underlineStyle={styles.inputContainer}
            />

            <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
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
});

export default PersonalDetails;
