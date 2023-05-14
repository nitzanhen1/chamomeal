import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback,
    Modal} from 'react-native'
import React, {useState} from 'react'
import {Input} from "react-native-elements";
import {register} from "../redux/actions";
import {useDispatch} from "react-redux";
import COLORS from "../consts/colors";
import {Button, CheckBox} from '@rneui/themed';
import {Ionicons} from "@expo/vector-icons";


const RegisterScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [checked, setChecked] = useState(false);

    const [usernameError, setUsernameError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    function navToLogin() {
        navigation.navigate('Login');
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

    function validateFirstName(firstName) {
        let re = /[0-9!@#$%^&*()_+=\[\]{};':"\\|.,<>?]+/
        if (!firstName) {
            setFirstNameError('נדרש שם פרטי');
            return false
        } else if (re.test(firstName)) {
            setFirstNameError('שם פרטי לא יכול להכיל מספרים ותווים מיוחדים')
            return false
        } else {
            setFirstNameError('')
            return true
        }
    }

    function validateLastName(lastName) {
        let re = /[0-9!@#$%^&*()_+=\[\]{};':"\\|.,<>?]+/
        if (!lastName) {
            setLastNameError('נדרש שם משפחה');
            return false
        } else if (re.test(lastName)) {
            setLastNameError('שם משפחה לא יכול להכיל מספרים ותווים מיוחדים')
            return false
        } else {
            setLastNameError('')
            return true
        }
    }

    function validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:'\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
            if(confirmPassword && password != confirmPassword){
                setConfirmPasswordError("הסיסמה אינה תואמת");
            }
            else {
                setConfirmPasswordError('')
            }
            return true
        } else {
            setPasswordError("6-16 תווים - אותיות גדולות וקטנות")
            setConfirmPasswordError('')
            return false
        }
    }

    function validateConfirmPassword(confirmPassword) {
        if (!confirmPassword) {
            setConfirmPassword("נדרשת סיסמה")
            return false
        } else if (password != confirmPassword) {
            setConfirmPasswordError("הסיסמה אינה תואמת");
            return false
        } else {
            setConfirmPasswordError('')
            return true
        }
    }

    function handleOpenModal(){
        if (validateUsername(username) && validateFirstName(firstName) && validateLastName(lastName) &&
            validateEmail(email) && validatePassword(password) && validateConfirmPassword(confirmPassword)) {
            setModalVisible(true);
        }
    }

    async function handleSubmitPress() {
        setModalVisible(false);
        if (validateUsername(username) && validateFirstName(firstName) && validateLastName(lastName) &&
            validateEmail(email) && validatePassword(password) && validateConfirmPassword(confirmPassword)) {
            let status = await dispatch(register(username, firstName, lastName, password, email))
            if (status === 201) {
                try {
                    navigation.navigate('QuestionnaireScreen', {prevRouteName: 'RegisterScreen'});
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
        }
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    return (
        <View style={styles.view}>
            <ScrollView style={styles.container}>
                <Input
                    onChangeText={(username) => {
                        setUsername(username);
                        validateUsername(username)
                    }}
                    placeholder='שם משתמש'
                    errorStyle={{color: 'red', fontFamily:'Rubik-Regular'}}
                    errorMessage={usernameError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}
                    inputStyle={styles.text}
                />
                <Input
                    onChangeText={(firstName) => {
                        setFirstName(firstName)
                        validateFirstName(firstName)
                    }}
                    placeholder='שם פרטי'
                    errorStyle={{color: 'red', fontFamily:'Rubik-Regular'}}
                    errorMessage={firstNameError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}
                    inputStyle={styles.text}

                />
                <Input
                    onChangeText={(lastName) => {
                        setLastName(lastName)
                        validateLastName(lastName)
                    }}
                    placeholder='שם משפחה'
                    errorStyle={{color: 'red', fontFamily:'Rubik-Regular'}}
                    errorMessage={lastNameError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}
                    inputStyle={styles.text}

                />
                <Input
                    onChangeText={(email) => {
                        setEmail(email)
                        validateEmail(email)
                    }}
                    placeholder='אימייל'
                    keyboardType="email-address"
                    errorStyle={{color: 'red', fontFamily:'Rubik-Regular'}}
                    errorMessage={emailError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}
                    inputStyle={styles.text}

                />
                <Input
                    onChangeText={(password) => {
                        setPassword(password)
                        validatePassword(password)
                    }}
                    placeholder="סיסמה"
                    secureTextEntry={!isPasswordVisible}
                    maxLength={16}
                    errorStyle={{color: 'red', fontFamily:'Rubik-Regular'}}
                    errorMessage={passwordError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}
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
                <Input
                    onChangeText={(confirmPassword) => {
                        setConfirmPassword(confirmPassword)
                        validateConfirmPassword(confirmPassword)
                    }}
                    placeholder="אימות סיסמה"
                    secureTextEntry={!isConfirmPasswordVisible}
                    errorStyle={{ color: 'red', fontFamily:'Rubik-Regular'}}
                    errorMessage={confirmPasswordError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}
                    inputStyle={styles.text}
                    rightIcon={
                        <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.iconContainer}>
                            <Ionicons
                                name={isConfirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                                size={24}
                                color="#999"
                            />
                        </TouchableOpacity>
                    }
                />
                <Button
                    title="הירשם"
                    onPress={()=>handleOpenModal()}
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
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {setModalVisible(false)}}
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPressOut={() => {setModalVisible(false)}}
                >
                    <ScrollView
                        directionalLockEnabled={true}
                        contentContainerStyle={styles.modalBackGround}
                    >
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <Text style={styles.modalTitle}>תנאי שימוש</Text>

                                <Text style={styles.modalText}>
                                    · אפליקציה זו היא פרויקט הגמר של קבוצת סטודנטים ומיועדת למטרות מחקר בלבד.{'\n'}
                                    · סימוני האלרגיות וההעדפות התזונתיות המופיעים באפליקציה מקורם באתר אחר ואיננו לוקחים אחריות על דיוקם או שלמותם.{'\n'}
                                    · ברצוננו להזכיר למשתמשים שלנו שאיננו דיאטנים מוסמכים ואין לראות במידע המסופק באפליקציה זו ייעוץ רפואי.{'\n'}
                                    · כל החלטה שתתקבל על סמך המידע המסופק באפליקציה זו היא באחריות המשתמש בלבד.{'\n'}
                                    · על ידי שימוש באפליקציה זו, את/ה מסכימ/ה לשחרר אותנו מכל אחריות הקשורה לשימוש בה.{'\n'}
                                    · כל הזכויות למתכונים ופרטיהם שמורות לאתר foody.    </Text>
                                <CheckBox
                                    title="אני מסכימ/ה לתנאי השימוש."
                                    checked={checked}
                                    onPress={() => setChecked(!checked)}
                                    containerStyle={styles.checkContainer}
                                    textStyle={styles.optionText}
                                    checkedColor={COLORS.darkGrey}
                                    uncheckedColor={COLORS.dark}
                                />
                                <Button
                                    title="אישור"
                                    onPress={handleSubmitPress}
                                    color={COLORS.primary}
                                    containerStyle={styles.okButton}
                                    titleStyle={styles.okText}
                                    radius={8}
                                    disabled={!checked}
                                />
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Text style={styles.modalButton}>סגור</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </TouchableOpacity>
            </Modal>

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
        textAlign: "right",
        fontFamily: 'Rubik-Regular'

    },
    nextButton: {
        marginTop: 10,
        width: '85%',
        marginBottom: '5%',
        alignSelf: "center"
    },
    nextText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 20
    },
    register: {
        fontFamily: 'Rubik-Bold',
        fontSize: 16,
        color: COLORS.darkGreen,
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
        fontFamily: 'Rubik-Regular',
        fontSize: 16,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
    iconContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        bottom: 8,
        justifyContent: 'center',
    },
    modalContainer: {
        direction: 'rtl',
        height: '100%',
        width: '100%',
    },
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontFamily: 'Rubik-Regular',
        marginVertical: 10,
        // textAlign: 'center',
        fontSize: 16,
    },
    modalTitle: {
        fontFamily: 'Rubik-Bold',
        fontSize: 16,
        color: COLORS.primary

    },
    modalButton: {
        fontFamily: 'Rubik-Bold',
        color: COLORS.primary,
    },
    optionText: {
        fontFamily: 'Rubik-Regular',
        fontWeight: "normal",
        fontSize: 15,
        color: COLORS.dark,
    },
    checkContainer: {
        // flexDirection: 'row',
        alignSelf: 'center',
    },
    okButton:{
        width: 70,
        height:50,
        alignSelf: "center"
    },
    okText:{
        fontFamily: 'Rubik-Bold',
        fontSize: 16
    }
})

export default RegisterScreen;