import {View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native'
import React, {useState} from 'react'
import {Input} from 'react-native-elements';
import {useDispatch} from "react-redux";
import {login} from "../redux/actions";
import COLORS from "../consts/colors";
import {Button} from '@rneui/themed';
import {useFocusEffect} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';


const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    function navToRegister() {
        navigation.navigate('RegisterScreen');
    }

    function navToForgotPassword() {
        navigation.navigate('ForgotPasswordScreen');
    }

    function validateUsername(username) {
        let re = /['"\\|]+/
        if (!username) {
            setUsernameError('נדרש שם משתמש');
            return false
        } else if (re.test(username)) {
            setUsernameError('שם משתמש לא תקין')
            return false
        } else if (username.includes(' ')) {
            setUsernameError('שם משתמש מכיל רווחים');
            return false
        } else {
            setUsernameError('')
            return true
        }
    }

    function validatePassword(password) {
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

    async function handleSubmitPress() {
        if (validateUsername(username) && validatePassword(userPassword)) {
            try{
                let status = await dispatch(login(username,userPassword));
                if(status===403) {
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
            } catch (error) {
                console.log(error)
            }
        }
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

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
                    errorStyle={{color: 'red', fontFamily: "Rubik-Regular"}}
                    errorMessage={usernameError}
                    autoCapitalize='none'
                    containerStyle={styles.input}
                    inputContainerStyle={styles.input}
                    inputStyle={styles.text}
                />
                <Input
                    value={userPassword}
                    onChangeText={(UserPassword) => {
                        setUserPassword(UserPassword)
                        validatePassword(UserPassword)
                    }}
                    placeholder="סיסמה"
                    secureTextEntry={!isPasswordVisible}
                    maxLength={16}
                    errorStyle={{color: 'red', fontFamily: "Rubik-Regular"}}
                    errorMessage={passwordError}
                    containerStyle={styles.input}
                    inputContainerStyle={styles.input}
                    autoCapitalize='none'
                    inputStyle={styles.text}
                    rightIcon={
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                            <Ionicons
                                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                                size={24}
                                color="#999"
                            />
                        </TouchableOpacity>
                    }
                />
                <Button
                    title="התחבר"
                    onPress={handleSubmitPress}
                    color={COLORS.lightGreen}
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
        alignItems: "center",
    },
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingTop: '50%',
        backgroundColor: COLORS.white,
    },
    title: {
        bottom: '10%',
    },
    input: {
        borderBottomColor: COLORS.lightGreen,
        width: '98%',
    },
    text: {
        textAlign: "right",
        fontFamily: "Rubik-Regular"
    },
    nextButton: {
        marginTop: 10,
        width: '85%',
        marginBottom: '7%',
        alignSelf: "center"
    },
    nextText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 20
    },
    register: {
        fontFamily: 'Rubik-Bold',
        // fontWeight: 'bold',
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
        fontFamily: 'Rubik-Regular',
        fontSize: 16,
        marginBottom: 5,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
    image: {
        width: 271,
        height: 130,
    },
    iconContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        bottom: 8,
        justifyContent: 'center',
    }
})

export default LoginScreen;