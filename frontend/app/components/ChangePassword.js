import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {Input} from "react-native-elements";
import {updatePassword} from "../redux/actions";
import {useDispatch} from "react-redux";
import COLORS from "../consts/colors";
import { Button} from '@rneui/themed';
import {AntDesign, Ionicons} from "@expo/vector-icons";


const ChangePassword = ({navigation}) => {
    const dispatch = useDispatch();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    function validateOldPassword(oldPassword){
        if (!oldPassword) {
            setOldPasswordError("אנא הכנס סיסמה נוכחית")
            return false
        } else {
            setOldPasswordError('')
            return true
        }
    }

    function validatePassword(newPassword){
        let re = /^(?!.* )^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{6,16}$/;
        if (re.test(newPassword)) {
            setPasswordError('')
            return true
        } else {
            setPasswordError("6-16 תווים - אותיות גדולות וקטנות")
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

    function handleSubmitPress(){
        if (validatePassword(newPassword) && validateConfirmPassword(confirmPassword) && validateOldPassword(oldPassword)){
            dispatch(updatePassword(oldPassword,newPassword)).then((status)=>{
                if(status===403) {
                    Alert.alert('סיסמה נוכחית שגויה', null,
                        [{text: 'אוקיי', style: 'cancel'}],
                        { cancelable: true });
                }
                else if(status===202){
                    Alert.alert('הסיסמה שונתה בהצלחה!', null,
                        [{text: 'אוקיי', style: 'cancel'}],
                        { cancelable: true });
                    navigation.goBack();
                }
                else{
                    Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                        [{text: 'אוקיי', style: 'cancel'}],
                        { cancelable: true });
                }
            });
        }
    }

    const toggleOldPasswordVisibility = () => {
        setIsOldPasswordVisible(!isOldPasswordVisible);
    };
    const toggleNewPasswordVisibility = () => {
        setIsNewPasswordVisible(!isNewPasswordVisible);
    };
    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    return (
            <View style={styles.container}>
                <AntDesign name="edit" size={50} style={styles.editIcon}/>
                <Input
                    label='סיסמה נוכחית'
                    labelStyle={styles.label}
                    onChangeText={(password) => {
                        setOldPassword(password)
                        validateOldPassword(password)
                    }}
                    secureTextEntry={!isOldPasswordVisible}
                    maxLength={16}
                    errorStyle={{ color: 'red' }}
                    errorMessage={oldPasswordError}
                    autoCapitalize='none'
                    inputContainerStyle={styles.input}
                    inputStyle={styles.text}
                    // placeholder="••••••••"
                    rightIcon={
                        <TouchableOpacity onPress={toggleOldPasswordVisibility} style={styles.iconContainer}>
                            <Ionicons
                                name={isOldPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                                size={24}
                                color="#999"
                            />
                        </TouchableOpacity>
                    }
                />
                <Input
                    label='סיסמה חדשה'
                    labelStyle={styles.label}
                    onChangeText={(password) => {
                        setNewPassword(password)
                        validatePassword(password)
                    }}
                    // placeholder="••••••••"
                    secureTextEntry={!isNewPasswordVisible}
                    maxLength={16}
                    errorStyle={{ color: 'red' }}
                    errorMessage={passwordError}
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
                    // placeholder="••••••••"
                    secureTextEntry={!isConfirmPasswordVisible}
                    errorStyle={{ color: 'red' }}
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
    label:{
        fontFamily: 'Rubik-Regular',
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

export default ChangePassword;