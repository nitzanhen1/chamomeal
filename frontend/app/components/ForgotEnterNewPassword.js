import {View, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {Input} from "react-native-elements";
import {useDispatch} from "react-redux";
import COLORS from "../consts/colors";
import { Button} from '@rneui/themed';
import {AntDesign} from "@expo/vector-icons";
import {resetPassword} from "../redux/actions";


const ForgotEnterNewPassword = ({navigation, route}) => {

    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [Email, setEmail] = useState(route.params.email)

    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    function validateNewPassword(newPassword){
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if (re.test(newPassword)) {
            setNewPasswordError('')
            return true
        } else {
            setNewPasswordError("8-16 תווים - אותיות גדולות וקטנות, מספרים, ותו מיוחד")
            return false
        }
    }

    function validateConfirmPassword(confirmPassword){
        if (!confirmPassword) {
            setConfirmPasswordError("נדרשת סיסמה")
            return false
        } else if (newPassword != confirmPassword) {
            setConfirmPasswordError("סיסמה לא תואמת");
            return false
        } else {
            setConfirmPasswordError('')
            return true
        }
    }

    const handleSubmitPress = () => {
        if (validateNewPassword(newPassword) && validateConfirmPassword(confirmPassword)){
            dispatch(resetPassword(Email, newPassword)).then((success)=>{
                if(success) {
                    alert('סיסמה שונתה בהצלחה!');
                    navigation.navigate("Login");
                } else {
                    alert('סיסמה נוכחית שגויה');
                }});
        }
    };

    return (
        <View style={styles.container}>
            <AntDesign name="edit" size={50} style={styles.editIcon}/>
            <Input
                label='סיסמה חדשה'
                labelStyle={styles.label}
                onChangeText={(newPassword) => {
                    setNewPassword(newPassword)
                    validateNewPassword(newPassword)
                }}
                secureTextEntry={true}
                maxLength={16}
                errorStyle={{ color: 'red' }}
                errorMessage={newPasswordError}
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
        backgroundColor: COLORS.white,
        paddingTop:30,
    },
    input:{
        borderBottomColor: COLORS.lightGreen
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

export default ForgotEnterNewPassword;