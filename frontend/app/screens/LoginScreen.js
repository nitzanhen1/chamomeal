import { View, Text, StyleSheet, Button  } from 'react-native'
import React, {useState} from 'react'
import { Input } from 'react-native-elements';
import {useDispatch} from "react-redux";
import {login} from "../redux/actions";

const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('')


    function navToRegister(){
        navigation.navigate('RegisterScreen');
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
    function validatePassword(password){
        if (!password) {
            setPasswordError('נדרשת סיסמה');
            return false
        } else if (password.includes(' ')) {
            setPasswordError('סיסמה מכילה רווחים');
            return false
        } else {
            setPasswordError('')
            return true
        }
    }
    async function handleSubmitPress(){
        if (validateUsername(username) && validatePassword(userPassword)) {
            try{
                dispatch(login(username,userPassword)).then((success)=>{
                if(!success) {
                    navigation.navigate('QuestionnaireScreen');
                }
                else {
                    navigation.navigate('BottomNavigator');
                }});
            }catch (error){
                if(error.status==404) {
                    alert('שם משתמש או סיסמה אינם נכונים')
                }
            }
        }
    }

    return (
        <View style={styles.view}>
            <Text>LoginScreen</Text>
            <Input
                onChangeText={(username) => {
                    validateUsername(username)
                    setUsername(username)
                }}
                placeholder='שם משתמש'
                errorStyle={{ color: 'red' }}
                errorMessage={usernameError}
                autoCapitalize='none'
            />
            <Input
                onChangeText={(UserPassword) => {
                    setUserPassword(UserPassword)
                    validatePassword(UserPassword)
                }}
                placeholder="סיסמה"
                secureTextEntry={true}
                maxLength={16}
                errorStyle={{ color: 'red' }}
                errorMessage={passwordError}
                autoCapitalize='none'
            />
            <Button title="התחבר" onPress={handleSubmitPress}/>
            <Button title="Register" onPress={navToRegister}/>
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

export default LoginScreen;