import {View, StyleSheet, Alert, ScrollView} from 'react-native'
import React, {useState} from 'react'
import { Input } from '@rneui/themed';
import { updateUserDetails} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import COLORS from "../consts/colors";
import { Button} from '@rneui/themed';
import {AntDesign, } from "@expo/vector-icons";



const EditUserInfo = ({navigation}) => {
    const { first_name, last_name, email } = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(first_name);
    const [lastName, setLastName] = useState(last_name);
    const [Email, setEmail] = useState(email);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    function validateFirstName(firstName){
        if (!firstName) {
            setFirstNameError('נדרש שם פרטי');
            return false
        } else if (firstName.includes(' ')) {
            setFirstNameError('שם פרטי מכיל רווחים');
            return false
        } else {
            setFirstNameError('')
            return true
        }
    }

    function validateLastName(lastName){
        if (!lastName) {
            setLastNameError('נדרש שם משפחה');
            return false
        } else if (lastName.includes(' ')) {
            setLastNameError('שם משפחה מכיל רווחים');
            return false
        } else {
            setLastNameError('')
            return true
        }
    }

    function validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            setEmailError('')
            return true
        } else {
            setEmailError("אימייל לא תקין")
            return false
        }
    }

    function handleSubmitPress(){
        if (validateFirstName(firstName) && validateLastName(lastName) && validateEmail(Email)){
            dispatch(updateUserDetails(firstName,lastName,Email)).then((success)=>{
                if(success) {
                    Alert.alert('הפרטים עודכנו בהצלחה!', null,
                        [{text: 'אוקיי', style: 'cancel'}],
                        { cancelable: true });
                    navigation.goBack();
                } else {
                    Alert.alert('עדכון הפרטים נכשל', null,
                        [{text: 'אוקיי', style: 'cancel'}],
                        { cancelable: true });
                    navigation.navigate('Login');
                }});
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center',}}>
            <AntDesign name="edit" size={50} style={styles.editIcon}/>
            <Input
                label='שם פרטי'
                labelStyle={styles.label}
                value={firstName}
                onChangeText={(firstName) => {
                    setFirstName(firstName)
                    validateFirstName(firstName)
                }}
                errorStyle={{ color: 'red' }}
                errorMessage={firstNameError}
                autoCapitalize='none'
                inputContainerStyle={styles.input}
                inputStyle={styles.inputText}
            />
            <Input
                label='שם משפחה'
                labelStyle={styles.label}
                value={lastName}
                onChangeText={(lastName) => {
                    setLastName(lastName)
                    validateLastName(lastName)
                }}
                errorStyle={{ color: 'red' }}
                errorMessage={lastNameError}
                autoCapitalize='none'
                inputContainerStyle={styles.input}
                inputStyle={styles.inputText}
            />
            <Input
                label='אימייל'
                labelStyle={styles.label}
                value={Email}
                onChangeText={(email) => {
                    setEmail(email)
                    validateEmail(email)
                }}
                keyboardType="email-address"
                errorStyle={{ color: 'red' }}
                errorMessage={emailError}
                autoCapitalize='none'
                inputContainerStyle={styles.input}
                inputStyle={styles.inputText}
            />
            <Button
                title="שמור"
                onPress={handleSubmitPress}
                color = {COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        direction: 'rtl',
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.white,
        paddingTop:30,
    },
    input:{
        borderBottomColor: COLORS.lightGreen,
        width: '97%',
        alignSelf: "center",

    },
    nextButton: {
        marginTop: 10,
        width: '85%',
        height: 65,
        alignSelf: "center"
    },
    nextText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 23
    },
    label:{
        fontFamily: 'Rubik-Bold',
        fontWeight: "normal",
        fontSize: 17,
        color: COLORS.grey,
        marginLeft: 5
    },
    editIcon:{
        color: COLORS.grey,
        margin:50,
    },
    inputText:{
        fontFamily: 'Rubik-Regular',
        fontWeight: "normal",
    }
})

export default EditUserInfo;