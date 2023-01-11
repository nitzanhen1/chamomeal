import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity  } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('')

    function navToMain(){
        navigation.navigate('BottomNavigator');
    }

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
            setPasswordError('סיסמה מכיל רווחים');
            return false
        } else {
            setPasswordError('')
            return true
        }
    }
    function handleSubmitPress(){
        if (validateUsername(username) && validatePassword(userPassword)) {
            alert('true')
        } else {
            alert('false')
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
            />
            <Button title="התחבר" onPress={handleSubmitPress}/>
            <Button title="Login" onPress={navToMain}/>
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