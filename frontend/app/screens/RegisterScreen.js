import { View, Text, StyleSheet, Button } from 'react-native'
import React, {useState} from 'react'
import {Input} from "react-native-elements";

const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password1Error, setPassword1Error] = useState('');
    const [password2Error, setPassword2Error] = useState('');

    function handlePress(){
        navigation.navigate('PreferenceScreen');
    }
    function navToLogin(){
        navigation.navigate('Login');
    }
    function validateUsername(username){
        if (!username) {
            setUsernameError('נדרש שם משתמש');
            return false
        } else if (username.includes(' ')) {
            setUsernameError('שם משתמש מכיל רווחים');
            return false
        } else {
            setUsernameError('')
            return true
        }
    }
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
    function validatePassword1(password1){
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if (re.test(password1)) {
            setPassword1Error('')
            return true
        } else {
            setPassword1Error("על הסיסמה להכיל 8-16 תווים, ולכלול אותיות, מספרים, ותו מיוחד")
            return false
        }
    }
    function validatePassword2(password2){
        if (!password2) {
            setPassword2("נדרשת סיסמה")
            return false
        } else if (password1 != password2) {
            setPassword2Error("סיסמה לא נכונה");
            return false
        } else {
            setPassword2Error('')
            return true
        }
    }
    function handleSubmitPress(){
        if (validateUsername(username) && validateFirstName(firstName) && validateLastName(lastName) &&
        validateEmail(email) && validatePassword1(password1) && validatePassword2(password2)){
            alert("true")
        } else {
            alert("false")
        }
    }

    return (
        <View style={styles.view}>
            <Text>RegisterScreen</Text>
            <Input
                onChangeText={(username) => {
                    setUsername(username);
                    validateUsername(username)
                }}
                placeholder='שם משתמש'
                errorStyle={{ color: 'red' }}
                errorMessage={usernameError}
            />
            <Input
                onChangeText={(firstName) => {
                    setFirstName(firstName)
                    validateFirstName(firstName)
                }}
                placeholder='שם פרטי'
                errorStyle={{ color: 'red' }}
                errorMessage={firstNameError}
            />
            <Input
                onChangeText={(lastName) => {
                    setLastName(lastName)
                    validateLastName(lastName)
                }}
                placeholder='שם משפחה'
                errorStyle={{ color: 'red' }}
                errorMessage={lastNameError}
            />
            <Input
                onChangeText={(email) => {
                    setEmail(email)
                    validateEmail(email)
                }}
                placeholder='אימייל'
                keyboardType="email-address"
                errorStyle={{ color: 'red' }}
                errorMessage={emailError}
            />
            <Input
                onChangeText={(password1) => {
                    setPassword1(password1)
                    validatePassword1(password1)
                }}
                placeholder="סיסמה"
                secureTextEntry={true}
                maxLength={16}
                errorStyle={{ color: 'red' }}
                errorMessage={password1Error}
            />
            <Input
                onChangeText={(password2) => {
                    setPassword2(password2)
                    validatePassword2(password2)
                }}
                placeholder="אימות סיסמה"
                secureTextEntry={true}
                errorStyle={{ color: 'red' }}
                errorMessage={password2Error}
            />
            <Button title="submit"
                    // disabled={!isValid}
                    onPress={handleSubmitPress}/>
            <Button title="הירשם" onPress={handlePress}/>
            <Button title="login" onPress={navToLogin}/>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems:  "center",
    },
})

export default RegisterScreen;