import {View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native'
import React, {useState} from 'react'
import { Input } from 'react-native-elements';
import {useDispatch} from "react-redux";
import {login} from "../redux/actions";
import COLORS from "../consts/colors";
import { Button} from '@rneui/themed';
import {useFocusEffect} from "@react-navigation/native";


const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('')


    function navToRegister(){
        navigation.navigate('RegisterScreen');
    }

    function navToForgotPassword(){
        navigation.navigate('ForgotPasswordScreen');
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
                dispatch(login(username,userPassword)).then((status)=>{
                if(status===404) {
                    Alert.alert('שם משתמש או סיסמה אינם נכונים', null,
                        [{text: 'אוקיי', style: 'cancel'}],
                        { cancelable: true });
                }
                else if(status===202){
                    navigation.navigate('QuestionnaireScreen', { prevRouteName: 'LoginScreen' });
                }
                else if(status===200){
                    navigation.navigate('LoadingScreen');
                }
                else{
                    Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                        [{text: 'אוקיי', style: 'cancel'}],
                        { cancelable: true });
                }
                });
            }catch (error){
                console.log(error)
            }
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setUsername('');
                setUserPassword('');
                setUsernameError('');
                setPasswordError('');
            };
        }, [])
    );


    return (
        <View style={styles.view}>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Image
                        style={styles.image}
                        source={require('frontend/app/assets/CHAMOMEAL.png')}
                    />
                </View>
                <Input
                    value={username}
                    onChangeText={(username) => {
                        validateUsername(username)
                        setUsername(username)
                    }}
                    placeholder='שם משתמש / אימייל'
                    errorStyle={{ color: 'red' }}
                    errorMessage={usernameError}
                    autoCapitalize='none'
                    containerStyle={styles.input}
                    inputContainerStyle={styles.input}
                />
                <Input
                    value={userPassword}
                    onChangeText={(UserPassword) => {
                        setUserPassword(UserPassword)
                        validatePassword(UserPassword)
                    }}
                    placeholder="סיסמה"
                    secureTextEntry={true}
                    maxLength={16}
                    errorStyle={{ color: 'red' }}
                    errorMessage={passwordError}
                    containerStyle={styles.input}
                    inputContainerStyle={styles.input}
                    autoCapitalize='none'
                    inputStyle={styles.text}
                />
                <Button
                    title="התחבר"
                    onPress={handleSubmitPress}
                    color = {COLORS.lightGreen}
                    containerStyle={styles.nextButton}
                    titleStyle={styles.nextText}
                    radius={8}
                />
                <TouchableOpacity onPress={navToRegister} style={styles.registerLink}>
                    <Text style={styles.account}>אין לך משתמש? </Text>
                    <Text style={styles.register}>הירשם עכשיו!</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navToForgotPassword} style={styles.registerLink}>
                    <Text style={styles.account}>שכחתי סיסמה</Text>
                </TouchableOpacity>
            </View>
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
        alignItems: 'center',
        paddingTop: 170,
        backgroundColor: COLORS.white,

    },
    title:{
        bottom: 50
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
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.darkGreen,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: COLORS.darkGreen,
    },
    registerLink: {
        flexDirection: "row",
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    account: {
        fontSize: 16,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
    image: {
        width: 271,
        height: 130,

    }
})

export default LoginScreen;