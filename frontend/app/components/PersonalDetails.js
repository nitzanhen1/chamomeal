import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import {TextInput, RadioButton, HelperText} from 'react-native-paper';
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {setPersonalDetails} from "../redux/actions";
import { Button} from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';

const PersonalDetails = ({navigation}) => {
    const {
        height,
        weight,
        year_of_birth,
        gender} = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();
    const [newHeight, setHeight] = useState(height);
    const [newWeight, setWeight] = useState(weight);
    const [newGender, setGender] = useState(gender);
    const [newBirthYear, setBirthYear] = useState(year_of_birth);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [dateChanged, setDateChanged] = useState(false);

    const [newHeightError, setHeightError] = useState('');
    const [newWeightError, setWeightError] = useState('');
    const [newGenderError, setGenderError] = useState('');
    const [newBirthYearError, setBirthYearError] = useState('');

    const handleSubmit = () => {
        if (validateHeight(newHeight) && validateWeight(newWeight) && validateBirthday() && validateGender()){
            const newPersonalDetails = {newWeight, newHeight, newGender, newBirthYear};
            dispatch(setPersonalDetails(newPersonalDetails))
            navigation.navigate('PhysicalActivity')
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setBirthYear(currentDate);
        setDateChanged(true);
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(true);
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    function validateHeight(height){
        if (!newHeight) {
            setHeightError('אנא הכנס גובה');
            return false
        }
        else {
            setHeightError('')
            return true
        }
    }

    function validateWeight(weight){
        if (!newWeight) {
            setWeightError('אנא הכנס משקל');
            return false
        }else {
            setWeightError('')
            return true
        }
    }

    function validateBirthday(){
        if (!newBirthYear) {
            setBirthYearError('אנא הכנס שנת לידה');
            return false
        }else if (newBirthYear > (new Date(new Date().setFullYear(new Date().getFullYear() + -16)))){
            setBirthYearError('עליך להיות מעל גיל 16 על מנת להשתמש באפליקציה');
            return false
        }else if (newBirthYear < (new Date(new Date().setFullYear(new Date().getFullYear() + -120)))){
            setBirthYearError('אנא ודא שגילך קטן מ-120');
            return false
        }
        else {
            setBirthYearError('')
            return true
        }
        // if (!dateChanged) {
        //     setBirthYearError('אנא בחר את תאריך הלידה שלך');
        //     return false
        // }else {
        //     setBirthYearError('')
        //     return true
        // }
    }

    function validateGender(){
        if (!newGender) {
            setGenderError('אנא בחר מין');
            return false
        }else {
            setGenderError('')
            return true
        }
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.disclaimer}>
                על מנת להעריך את צריכת הקלוריות היומית המומלצת עבורך, אנו משתמשים בנוסחת EER (Estimated Energy
                Requirement). נוסחה זו משתמשת בנתוני גובה, משקל, מין וגיל.
            </Text>
            <TextInput
                mode="flat"
                label="גובה"
                value={newHeight}
                placeholder='ס"מ'
                keyboardType='numeric'
                onChangeText={(height) => {
                    setHeight(height);
                    validateHeight(height)}}
                selectionColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                underlineColor={COLORS.darkGrey}
                style={styles.inputText}
                underlineStyle={styles.inputContainer}
            />
            <HelperText type="error" visible={!newHeight}>
                {newHeightError}
            </HelperText>

            <TextInput
                mode="flat"
                label="משקל"
                value={newWeight}
                placeholder='ק"ג'
                keyboardType='numeric'
                onChangeText={(weight) => {
                    setWeight(weight);
                    validateWeight(weight)}}
                selectionColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                underlineColor={COLORS.darkGrey}
                style={styles.inputText}
                underlineStyle={styles.inputContainer}
            />
            <HelperText type="error" visible={!newWeight}>
                {newWeightError}
            </HelperText>

            {/*<TextInput*/}
            {/*    mode="flat"*/}
            {/*    label="תאריך לידה"*/}
            {/*    value={!dateChanged ? '':newBirthYear.toISOString().substring(0, 10)}*/}
            {/*    onChangeText={(newBirthYear) => {*/}
            {/*        setBirthYear(newBirthYear.toISOString().substring(0, 10));*/}
            {/*        setDateChanged(true);*/}
            {/*    }}*/}
            {/*    selectionColor={COLORS.primary}*/}
            {/*    activeUnderlineColor={COLORS.primary}*/}
            {/*    underlineColor={COLORS.darkGrey}*/}
            {/*    style={styles.inputText}*/}
            {/*    underlineStyle={styles.inputContainer}*/}
            {/*    right={<TextInput.Icon icon="calendar" onPress={showDatepicker}/>}*/}
            {/*    editable={false}*/}
            {/*/>*/}
            {/*<HelperText type="error" visible={!dateChanged}>*/}
            {/*    {newBirthYearError}*/}
            {/*</HelperText>*/}

            {/*{show && (*/}
            {/*    <DateTimePicker*/}
            {/*        testID="dateTimePicker"*/}
            {/*        value={newBirthYear}*/}
            {/*        mode={mode}*/}
            {/*        is24Hour={true}*/}
            {/*        onChange={onChange}*/}
            {/*        maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + -16))}*/}
            {/*    />*/}
            {/*)}*/}

            <TextInput
                mode="flat"
                label="שנת לידה"
                value={newBirthYear}
                placeholder='yyyy'
                onChangeText={(newBirthYear) => {
                    setBirthYear(newBirthYear);
                    validateBirthday(newBirthYear)}}
                selectionColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                underlineColor={COLORS.grey}
                style={styles.inputText}
                underlineStyle={styles.inputContainer}
            />
            <HelperText type="error" visible={!newBirthYear}>
                {newBirthYearError}
            </HelperText>

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
                    </View>
                    <HelperText type="error" visible={!newGender}>
                        {newGenderError}
                    </HelperText>
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
    disclaimer: {
        fontFamily: 'Rubik-Regular',
        fontWeight: '700',
        color: COLORS.darkGrey,
        marginHorizontal: 10,
        marginTop: 10
    },
    inputText: {
        fontFamily: 'Rubik-Regular',
        backgroundColor: COLORS.white,
        marginHorizontal: 10,
        marginVertical: 0
    },
    genderTitle: {

        fontFamily: 'Rubik-Regular',
        fontSize: 17,
        color: COLORS.darkGrey,
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
        color: COLORS.darkGrey,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nextButton: {
        marginTop: 0,
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
