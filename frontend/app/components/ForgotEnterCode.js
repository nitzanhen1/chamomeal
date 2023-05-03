import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {Input} from "react-native-elements";
import {useDispatch} from "react-redux";
import COLORS from "../consts/colors";
import { Button} from '@rneui/themed';
import {AntDesign} from "@expo/vector-icons";
import {forgotPassword, verifyResetPasswordCode} from "../redux/actions";


const ForgotEnterCode = ({navigation, route}) => {

    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const [Email] = useState(route.params.email)

    const handleSubmit = async () => {
        let status = await dispatch(verifyResetPasswordCode(Email, code));
        if (status === 401) {
            Alert.alert('הקוד אינו תקף יותר', null,
                [{text: 'אוקיי', style: 'cancel'}],
                {cancelable: true});
        } else if (status === 408) {
            Alert.alert('הקוד שהוזן אינו נכון', null,
                [{text: 'אוקיי', style: 'cancel'}],
                {cancelable: true});
        } else if (status === 200) {
            navigation.navigate('EnterNewPassword', {email: Email});
        } else if (status === 419) {
            Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                [{text: 'אוקיי', style: 'cancel'}],
                {cancelable: true});
            navigation.navigate('Login');
        } else {
            Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                [{text: 'אוקיי', style: 'cancel'}],
                {cancelable: true});
        }
    };

    const handleSendAgain = async () =>{
        await dispatch(forgotPassword(Email))
    }


    return (
        <View style={styles.container}>
            <AntDesign name="unlock" size={50} style={styles.editIcon}/>
            <Text style={styles.textUp}>שלחנו לאימייל שלך קוד אימות התקף ל10 דקות</Text>
            <Text style={styles.textUp}>אם אינך רואה את המייל בדוק בתיקיית הספאם</Text>
            <TouchableOpacity onPress={handleSendAgain}>
                <Text style={styles.textDown}>או לחץ כאן לשליחה חוזרת</Text>
            </TouchableOpacity>
            <Input
                label='קוד אימות'
                labelStyle={styles.label}
                value={code}
                onChangeText={(code) => {
                    setCode(code)
                }}
                keyboardType="numeric"
                autoCapitalize='none'
                inputContainerStyle={styles.input}
            />
            <Button
                title="המשך"
                onPress={handleSubmit}
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
    },
    textUp: {
        fontSize: 15,
        alignSelf: "center",
        textAlign: 'center',
        // alignItems: 'center',
        width: '100%',
        height: 25,
        // paddingRight: 20,
        fontFamily: 'Rubik-Bold',
        letterSpacing: 1,
        color: COLORS.darkGrey
    },
    textDown: {
        fontSize: 15,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        height: 25,
        marginBottom: 20,
        paddingRight: 20,
        fontFamily: 'Rubik-Bold',
        letterSpacing: 1,
        color: COLORS.dark,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
})

export default ForgotEnterCode;