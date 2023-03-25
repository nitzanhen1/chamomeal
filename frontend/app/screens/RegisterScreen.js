import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import React, {useState} from 'react'
import {Input} from "react-native-elements";
import {register} from "../redux/actions";
import {useDispatch} from "react-redux";
import COLORS from "../consts/colors";
import { Button} from '@rneui/themed';


const RegisterScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

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
    function validatePassword(password){
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if (re.test(password)) {
            setPasswordError('')
            return true
        } else {
            setPasswordError("8-16 תווים - אותיות גדולות וקטנות, מספרים, ותו מיוחד")
            return false
        }
    }
    function validateConfirmPassword(confirmPassword){
        if (!confirmPassword) {
            setConfirmPassword("נדרשת סיסמה")
            return false
        } else if (password != confirmPassword) {
            setConfirmPasswordError("סיסמה לא נכונה");
            return false
        } else {
            setConfirmPasswordError('')
            return true
        }
    }
    function handleSubmitPress(){
        if (validateUsername(username) && validateFirstName(firstName) && validateLastName(lastName) &&
        validateEmail(email) && validatePassword(password) && validateConfirmPassword(confirmPassword)){
            dispatch(register(username,firstName,lastName,password,email)).then((success)=>{
                if(success) {
                    navigation.navigate('Login')
                } else {
                    alert('שם משתמש קיים')
                }});
        }
    }

    return (
        <View style={styles.view}>
            <ScrollView style={styles.container}>
                <Input
                    onChangeText={(username) => {
                        setUsername(username);
                        validateUsername(username)
                    }}
                    placeholder='שם משתמש'
                    errorStyle={{ color: 'red' }}
                    errorMessage={usernameError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}

                />
                <Input
                    onChangeText={(firstName) => {
                        setFirstName(firstName)
                        validateFirstName(firstName)
                    }}
                    placeholder='שם פרטי'
                    errorStyle={{ color: 'red' }}
                    errorMessage={firstNameError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}

                />
                <Input
                    onChangeText={(lastName) => {
                        setLastName(lastName)
                        validateLastName(lastName)
                    }}
                    placeholder='שם משפחה'
                    errorStyle={{ color: 'red' }}
                    errorMessage={lastNameError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}

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
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}

                />
                <Input
                    onChangeText={(password) => {
                        setPassword(password)
                        validatePassword(password)
                    }}
                    placeholder="סיסמה"
                    secureTextEntry={true}
                    maxLength={16}
                    errorStyle={{ color: 'red' }}
                    errorMessage={passwordError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}
                    inputStyle={styles.text}

                />
                <Input
                    onChangeText={(confirmPassword) => {
                        setConfirmPassword(confirmPassword)
                        validateConfirmPassword(confirmPassword)
                    }}
                    placeholder="אימות סיסמה"
                    secureTextEntry={true}
                    errorStyle={{ color: 'red' }}
                    errorMessage={confirmPasswordError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}
                    inputStyle={styles.text}

                />
                <Button
                    title="הירשם"
                    onPress={handleSubmitPress}
                    color = {COLORS.lightGreen}
                    containerStyle={styles.nextButton}
                    titleStyle={styles.nextText}
                    radius={8}
                />
                <TouchableOpacity onPress={navToLogin} style={styles.registerLink}>
                    <Text style={styles.account}>יש לך משתמש? </Text>
                    <Text style={styles.register}>התחבר!</Text>
                </TouchableOpacity>
            </ScrollView>


        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems:  "center",
    },
    container: {
        height: '100%',
        width: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingTop: 30,

    },
    input:{
        borderBottomColor: COLORS.lightGreen
    },
    text:{
        textAlign:"right"
    },
    nextButton: {
        marginTop: 10,
        width: '85%',
        height: 65,
        alignSelf: "center"
    },
    nextText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    register: {
        fontSize: 16,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
    registerLink: {
        flexDirection: "row"
    },
    account: {
        fontSize: 16,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
})

export default RegisterScreen;