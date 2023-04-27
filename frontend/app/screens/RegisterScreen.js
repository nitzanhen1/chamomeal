import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native'
import React, {useState} from 'react'
import {Input} from "react-native-elements";
import {login, register} from "../redux/actions";
import {useDispatch} from "react-redux";
import COLORS from "../consts/colors";
import {Button} from '@rneui/themed';


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

    function navToLogin() {
        navigation.navigate('Login');
    }

    function validateUsername(username) {
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

    function validateFirstName(firstName) {
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

    function validateLastName(lastName) {
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

    function validatePassword(password) {
        let re = /^(?!.* )^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{6,16}$/;
        if (re.test(password)) {
            setPasswordError('')
            return true
        } else {
            setPasswordError("6-16 תווים - אותיות גדולות וקטנות")
            return false
        }
    }

    function validateConfirmPassword(confirmPassword) {
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

    function handleSubmitPress() {
        if (validateUsername(username) && validateFirstName(firstName) && validateLastName(lastName) &&
            validateEmail(email) && validatePassword(password) && validateConfirmPassword(confirmPassword)) {
            dispatch(register(username, firstName, lastName, password, email)).then((status) => {
                if (status === 201) {
                    Alert.alert('תנאי שימוש', 'אפליקציה זו היא פרויקט הגמר של קבוצת סטודנטים ומיועדת למטרות מחקר בלבד. סימוני האלרגיות וההעדפות התזונתיות המופיעים באפליקציה מקורם באתר אחר ואיננו לוקחים אחריות על דיוקם או שלמותם. ברצוננו להזכיר למשתמשים שלנו שאיננו דיאטנים מוסמכים ואין לראות במידע המסופק באפליקציה זו ייעוץ רפואי. כל החלטה שתתקבל על סמך המידע המסופק באפליקציה זו היא באחריות המשתמש בלבד. על ידי שימוש באפליקציה זו, אתה מסכים לשחרר אותנו מכל אחריות הקשורה לשימוש בה.',
                        [
                            {text: 'אישור', onPress: console.log('OK')},

                        ],
                        {cancelable: false});

                    try {
                        dispatch(login(username, password)).then((status) => {
                            if (status === 202) {
                                navigation.navigate('QuestionnaireScreen', {prevRouteName: 'RegisterScreen'});
                            } else if (status === 200) {
                                navigation.navigate('LoadingScreen');
                            } else {
                                navigation.navigate('Login');

                            }
                        });
                    } catch (error) {
                        console.log(error)
                    }
                } else if (status === 409) {
                    Alert.alert('שם המשתמש כבר קיים במערכת', null,
                        [{text: 'אוקיי', style: 'cancel'}],
                        {cancelable: true});
                } else if (status === 412) {
                    Alert.alert('האימייל כבר קיים במערכת', null,
                        [{text: 'אוקיי', style: 'cancel'}],
                        {cancelable: true});
                } else {
                    Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                        [{text: 'אוקיי', style: 'cancel'}],
                        {cancelable: true});
                }
            });
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
                    errorStyle={{color: 'red'}}
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
                    errorStyle={{color: 'red'}}
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
                    errorStyle={{color: 'red'}}
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
                    errorStyle={{color: 'red'}}
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
                    errorStyle={{color: 'red'}}
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
                    errorStyle={{color: 'red'}}
                    errorMessage={confirmPasswordError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}
                    inputStyle={styles.text}
                />
                <Button
                    title="הירשם"
                    onPress={handleSubmitPress}
                    color={COLORS.lightGreen}
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
        alignItems: "center",
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.white,
        paddingTop: 30,
    },
    input: {
        borderBottomColor: COLORS.lightGreen,
        width: '98%',
    },
    text: {
        textAlign: "right"
    },
    nextButton: {
        marginTop: 10,
        width: '85%',
        marginBottom: '5%',
        alignSelf: "center"
    },
    nextText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    register: {
        fontSize: 16,
        color: COLORS.lightGreen,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: COLORS.darkGreen,
    },
    registerLink: {
        flexDirection: "row",
        justifyContent: 'center',
        alignSelf: "center"
    },
    account: {
        fontSize: 16,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
})

export default RegisterScreen;