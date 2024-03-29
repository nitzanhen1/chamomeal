import {View, StyleSheet, Alert, TouchableOpacity, ScrollView} from 'react-native'
import React, {useState} from 'react'
import {Input} from "react-native-elements";
import {useDispatch} from "react-redux";
import COLORS from "../consts/colors";
import { Button} from '@rneui/themed';
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {resetPassword} from "../redux/actions";


const ForgotEnterNewPassword = ({navigation, route}) => {

    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [Email] = useState(route.params.email)

    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    function validateNewPassword(newPassword){
        let re = /^(?!.* )^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{6,16}$/;
        if (re.test(newPassword)) {
            setNewPasswordError('')
            return true
        } else {
            setNewPasswordError("6-16 תווים - אותיות גדולות וקטנות")
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

    const handleSubmitPress = async () => {
        if (validateNewPassword(newPassword) && validateConfirmPassword(confirmPassword)) {
            let success = await dispatch(resetPassword(Email, newPassword))
            if (success) {
                Alert.alert('סיסמה שונתה בהצלחה!', null,
                    [{text: 'אוקיי', style: 'cancel'}],
                    {cancelable: true});
                navigation.navigate("Login");
            } else {
                Alert.alert('משהו השתבש, נסה שוב', null,
                    [{text: 'אוקיי', style: 'cancel'}],
                    {cancelable: true});
            }
        }
    };

    const toggleNewPasswordVisibility = () => {
        setIsNewPasswordVisible(!isNewPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
            <AntDesign name="edit" size={50} style={styles.editIcon}/>
            <Input
                label='סיסמה חדשה'
                labelStyle={styles.label}
                onChangeText={(newPassword) => {
                    setNewPassword(newPassword)
                    validateNewPassword(newPassword)
                }}
                secureTextEntry={!isNewPasswordVisible}
                maxLength={16}
                errorStyle={{ color: 'red', fontFamily: 'Rubik-Regular'}}
                errorMessage={newPasswordError}
                autoCapitalize='none'
                inputContainerStyle={styles.input}
                inputStyle={styles.text}
                rightIcon={
                    <TouchableOpacity onPress={toggleNewPasswordVisibility} style={styles.iconContainer}>
                        <Ionicons
                            name={isNewPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color="#999"
                        />
                    </TouchableOpacity>
                }
            />
            <Input
                label='אימות סיסמה חדשה'
                labelStyle={styles.label}
                onChangeText={(confirmPassword) => {
                    setConfirmPassword(confirmPassword)
                    validateConfirmPassword(confirmPassword)
                }}
                secureTextEntry={!isConfirmPasswordVisible}
                errorStyle={{ color: 'red' , fontFamily: 'Rubik-Regular'}}
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
                title="שמור"
                onPress={handleSubmitPress}
                color = {COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        direction: 'rtl',
        height: '100%',
        width: '100%',
        // alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingTop:30,
    },
    input:{
        borderBottomColor: COLORS.lightGreen
    },
    text:{
        textAlign:"right",
        fontFamily: 'Rubik-Regular'
    },
    nextButton: {
        marginTop: 10,
        width: '85%',
        height: 65,
        alignSelf: "center"
    },
    nextText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 20
    },
    label:{
        fontFamily: 'Rubik-Regular',
        fontWeight: "normal",
        fontSize: 16,
        color: COLORS.grey,
    },
    editIcon:{
        color: COLORS.grey,
        margin:50,
    },
    iconContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        bottom: 8,
        justifyContent: 'center',
    }
})

export default ForgotEnterNewPassword;