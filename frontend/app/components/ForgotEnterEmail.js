import {View, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {Input} from "react-native-elements";
import {forgotPassword} from "../redux/actions";
import {useDispatch} from "react-redux";
import COLORS from "../consts/colors";
import { Button} from '@rneui/themed';
import {AntDesign} from "@expo/vector-icons";


const ForgotEnterEmail = ({navigation}) => {

    const dispatch = useDispatch();
    const [Email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');


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

    const handleSubmit = () => {
        if (validateEmail(Email)){
            dispatch(forgotPassword(Email)).then((status)=>{
                if(status===404) {
                    alert('אימייל לא קיים')
                }
                else if(status===400){
                    alert('אימייל לא נשלח');
                }
                else if(status===200){
                    navigation.navigate('EnterCode',{email: Email});
                }
                else{
                    alert('אוי לא משהו קרה! נסה שוב')
                }
            });
        }
    };


    return (
        <View style={styles.container}>
            <AntDesign name="lock" size={50} style={styles.editIcon}/>

            <Input
                label='אימייל'
                labelStyle={styles.label}
                value={Email}
                onChangeText={(email) => {
                    setEmail(email)
                    validateEmail(email)
                }}
                keyboardType="email-address"
                errorStyle={{ color: 'red' }}
                errorMessage={emailError}
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
    }
})

export default ForgotEnterEmail;