import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {Input} from "react-native-elements";
import {register, updatePassword} from "../redux/actions";
import {useDispatch} from "react-redux";
import COLORS from "../consts/colors";
import { Button} from '@rneui/themed';
import {AntDesign} from "@expo/vector-icons";


const ChangePassword = ({navigation}) => {
    const dispatch = useDispatch();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    function validatePassword(newPassword){
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if (re.test(newPassword)) {
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
        } else if (newPassword != confirmPassword) {
            setConfirmPasswordError("סיסמה לא נכונה");
            return false
        } else {
            setConfirmPasswordError('')
            return true
        }
    }

    function handleSubmitPress(){
        console.log('hey');
        if (validatePassword(newPassword) && validateConfirmPassword(confirmPassword)){
            dispatch(updatePassword(oldPassword,newPassword)).then((success)=>{
                if(success) {
                    navigation.goBack();
                } else {
                    alert('סיסמה נוכחית שגויה')
                }});
        }
    }

    return (
            <View style={styles.container}>
                <AntDesign name="edit" size={50} style={styles.editIcon}/>
                <Input
                    label='סיסמה נוכחית'
                    labelStyle={styles.label}
                    onChangeText={(password) => {
                        setOldPassword(password)
                        // validatePassword(password)
                    }}
                    secureTextEntry={true}
                    maxLength={16}
                    errorStyle={{ color: 'red' }}
                    errorMessage={passwordError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}
                    inputStyle={styles.text}

                />
                <Input
                    label='סיסמה חדשה'
                    labelStyle={styles.label}
                    onChangeText={(password) => {
                        setNewPassword(password)
                        validatePassword(password)
                    }}
                    // placeholder="סיסמה"
                    secureTextEntry={true}
                    maxLength={16}
                    errorStyle={{ color: 'red' }}
                    errorMessage={passwordError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}
                    inputStyle={styles.text}

                />
                <Input
                    label='אימות סיסמה חדשה'
                    labelStyle={styles.label}
                    onChangeText={(confirmPassword) => {
                        setConfirmPassword(confirmPassword)
                        validateConfirmPassword(confirmPassword)
                    }}
                    // placeholder="אימות סיסמה"
                    secureTextEntry={true}
                    errorStyle={{ color: 'red' }}
                    errorMessage={confirmPasswordError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}
                    inputStyle={styles.text}

                />
                <Button
                    title="שמור"
                    onPress={handleSubmitPress}
                    color = {COLORS.lightGreen}
                    containerStyle={styles.nextButton}
                    titleStyle={styles.nextText}
                    radius={8}
                />
            </View>


    )
}

const styles = StyleSheet.create({
    container: {
        direction: 'rtl',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingTop:30,
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
    label:{
        fontFamily: 'Rubik-Regular',
        fontSize: 16,
        color: COLORS.grey,
    },
    editIcon:{
        color: COLORS.grey,
        margin:50,
    }
})

export default ChangePassword;