import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity} from 'react-native';
import {TextInput, RadioButton, HelperText} from 'react-native-paper';
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {setPersonalDetails} from "../redux/actions";
import {Button} from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';

const PersonalDetails = ({navigation}) => {
    const {
        height,
        weight,
        year_of_birth,
        gender
    } = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();
    const [newHeight, setHeight] = useState(height);
    const [newWeight, setWeight] = useState(weight);
    const [newGender, setGender] = useState(gender);
    const [newBirthYear, setBirthYear] = useState(year_of_birth);
    const [showBDayError, setShowBDayError] = useState(false);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [dateChanged, setDateChanged] = useState(false);

    const [newHeightError, setHeightError] = useState('');
    const [newWeightError, setWeightError] = useState('');
    const [newGenderError, setGenderError] = useState('');
    const [newBirthYearError, setBirthYearError] = useState('');

    const handleSubmit = () => {
        if (validateHeight(newHeight) && validateWeight(newWeight) && validateBirthday(newBirthYear) && validateGender()){
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
        let re = /^[+]?\d+([.]\d+)?$/;
        if(height==0) {
            setHeightError("גובה לא תקין")
            return false
        }else if (re.test(height)) {
            setHeightError('')
            return true
        } else {
            setHeightError("גובה לא תקין")
            return false
        }
    }

    function validateWeight(weight){
        let re = /^[+]?\d+([.]\d+)?$/;
        if(weight==0) {
            setWeightError("משקל לא תקין")
            return false
        }else if (re.test(weight)) {
            setWeightError('')
            return true
        } else {
            setWeightError("משקל לא תקין")
            return false
        }
    }

    function validateBirthday(birthYear){
        let re = /^\d{4}$/;
        if (birthYear == "") {
            setBirthYearError('אנא הכנס שנת לידה');
            setShowBDayError(true);
            return false
        }else if (birthYear > (new Date().getFullYear() + -16)){
            setBirthYearError('עליך להיות מעל גיל 16 על מנת להשתמש באפליקציה');
            setShowBDayError(true);
            return false
        }else if (birthYear < (new Date().getFullYear() + -120)){
            setBirthYearError('אנא ודא שגילך קטן מ-120');
            setShowBDayError(true);
            return false
        }else if (re.test(birthYear)){
            setBirthYearError('')
            setShowBDayError(false);
            return true
        }
        else {
            setBirthYearError('שנה לא תקינה');
            setShowBDayError(true);
            return false
        }
        // if (!dateChanged) {
        //     setBirthYearError('אנא בחר את תאריך הלידה שלך');
        //     return false
        // }else {
        //     setBirthYearError('')
        //     return true
        // }
    }

    function validateGender() {
        if (!newGender) {
            setGenderError('אנא בחר מין');
            return false
        } else {
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
                    validateHeight(height)
                }}
                selectionColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                underlineColor={COLORS.darkGrey}
                style={styles.inputText}
                underlineStyle={styles.inputContainer}
                theme={
                    {
                        fonts: {
                            regular: {
                                fontFamily: 'Rubik-Regular'
                            }
                        }
                    }
                }
            />
            <HelperText
                type="error"
                visible={newHeightError}
                style={{fontFamily: 'Rubik-Regular'}}
            >
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
                    validateWeight(weight)
                }}
                selectionColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                underlineColor={COLORS.darkGrey}
                style={styles.inputText}
                underlineStyle={styles.inputContainer}
                theme={
                    {
                        fonts: {
                            regular: {
                                fontFamily: 'Rubik-Regular'
                            }
                        }
                    }
                }
            />
            <HelperText
                type="error"
                visible={newWeightError}
                style={{fontFamily: 'Rubik-Regular'}}
            >
                {newWeightError}
            </HelperText>

            <TextInput
                mode="flat"
                label="שנת לידה"
                value={newBirthYear}
                placeholder='yyyy'
                keyboardType='numeric'
                onChangeText={(newBirthYear) => {
                    setBirthYear(newBirthYear);
                    validateBirthday(newBirthYear)
                }}
                selectionColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                underlineColor={COLORS.grey}
                style={styles.inputText}
                underlineStyle={styles.inputContainer}
                theme={
                    {
                        fonts: {
                            regular: {
                                fontFamily: 'Rubik-Regular'
                            }
                        }
                    }
                }
            />
            <HelperText
                type="error"
                visible={showBDayError}
                style={{fontFamily: 'Rubik-Regular'}}
            >
                {newBirthYearError}
            </HelperText>

            <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={newGender}>
                <View style={styles.genderContainer}>
                    <Text style={styles.genderTitle}>מין</Text>
                    <View style={styles.genderOptions}>
                        <TouchableOpacity onPress={() => setGender("0")}>
                            <View style={styles.radioButtonContainer}>
                                <RadioButton color={COLORS.lightGreen} value="0"></RadioButton>
                                <Text style={styles.optionText}>זכר</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setGender("1")}>
                            <View style={styles.radioButtonContainer}>
                                <RadioButton color={COLORS.lightGreen} value="1"/>
                                <Text style={styles.optionText}>נקבה</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <HelperText
                        type="error"
                        visible={!newGender}
                        style={{fontFamily: 'Rubik-Regular'}}
                    >
                        {newGenderError}
                    </HelperText>
                </View>
            </RadioButton.Group>
            <Button
                title="המשך"
                onPress={handleSubmit}
                color={COLORS.lightGreen}
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
        // fontWeight: '700',
        color: COLORS.darkGrey,
        fontSize: 14,
        marginHorizontal: 10,
        marginTop: 10
    },
    inputText: {
        fontWeight: 'normal',
        backgroundColor: COLORS.white,
        width: '96%',
        alignSelf: "center"
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
        alignSelf: "center"
    },
    nextText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 20
    }
});

export default PersonalDetails;
