import {View, StyleSheet, Alert} from 'react-native'
import React, {useState} from 'react'
import {Input} from "react-native-elements";
import {useDispatch} from "react-redux";
import COLORS from "../consts/colors";
import { Button} from '@rneui/themed';
import {AntDesign} from "@expo/vector-icons";
import {verifyResetPasswordCode} from "../redux/actions";


const ForgotEnterCode = ({navigation, route}) => {

    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const [Email, setEmail] = useState(route.params.email)

    const handleSubmit = () => {
            dispatch(verifyResetPasswordCode(Email, code)).then((status)=>{
                if(status===401) {
                    Alert.alert('הקוד אינו תקף יותר', null,
                    [{text: 'אוקיי', style: 'cancel'}],
                    { cancelable: true });
                }
                else if(status===408){
                    Alert.alert('הקוד שהוזן אינו נכון', null,
                        [{text: 'אוקיי', style: 'cancel'}],
                        { cancelable: true });
                }
                else if(status===200){
                    navigation.navigate('EnterNewPassword', {email: Email});
                }
                else if(status===419){
                    Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                        [{text: 'אוקיי', style: 'cancel'}],
                        { cancelable: true });
                    navigation.navigate('Login');
                }
                else{
                    Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                        [{text: 'אוקיי', style: 'cancel'}],
                        { cancelable: true });
                }
            });
    };


    return (
        <View style={styles.container}>
            <AntDesign name="unlock" size={50} style={styles.editIcon}/>

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
    }
})

export default ForgotEnterCode;