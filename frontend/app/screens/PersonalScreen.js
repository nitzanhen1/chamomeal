import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native'
import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {
    getQuestionnaireDetails,
    logout,
    getUserDetails
} from "../redux/actions";
import COLORS from "../consts/colors";
import { Button} from '@rneui/themed';

export default function PersonalScreen({navigation}) {
    const { first_name } = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);


    function logoutUser() {
        dispatch(logout()).then(()=> {
                navigation.navigate('Login')
        });
    }

    async function updateQuestionnaire() {
        await dispatch(getQuestionnaireDetails()).then(result => {
            if(result){
                navigation.navigate('QuestionnaireScreen', { prevRouteName: 'PersonalScreen' });
            } else {
                Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                    [{text: 'אוקיי', style: 'cancel'}],
                    { cancelable: true });
            }
        });
    }

    async function updateUserDetails() {
        await dispatch(getUserDetails()).then(result =>{
            if(result){
                navigation.navigate('EditUserInfo');
            }else{
                Alert.alert('אוי לא משהו קרה! נסה שוב', null,
                    [{text: 'אוקיי', style: 'cancel'}],
                    { cancelable: true });
            }
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.helloText}>שלום {first_name}!</Text>
            <Button
                title="עדכון פרטי חשבון"
                onPress={() => updateUserDetails()}
                color = {COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
                buttonStyle={{height: 50}}
            />
            <Button
                title="עדכון פרטים אישיים"
                onPress={() => updateQuestionnaire()}
                color = {COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
                buttonStyle={{height: 50}}
            />
            <Button
                title="עדכון סיסמה"
                onPress={() => navigation.navigate('ChangePassword')}
                color = {COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
                buttonStyle={{height: 50}}
            />
            <Button
                title="תנאי שימוש"
                onPress={() => setModalVisible(true)}
                color = {COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
                buttonStyle={{height: 50}}
            />
            <Button
                title="התנתק"
                onPress={() => logoutUser()}
                color = {COLORS.lightGreen}
                containerStyle={styles.nextButton}
                titleStyle={styles.nextText}
                radius={8}
                buttonStyle={{height: 50}}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {setModalVisible(false)}}
            >
                <TouchableOpacity
                    style={styles.container}
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

                                <Text style={styles.modalText} >אפליקציה זו היא פרויקט הגמר של קבוצת סטודנטים ומיועדת למטרות מחקר בלבד. סימוני האלרגיות וההעדפות התזונתיות המופיעים באפליקציה מקורם באתר אחר ואיננו לוקחים אחריות על דיוקם או שלמותם. ברצוננו להזכיר למשתמשים שלנו שאיננו דיאטנים מוסמכים ואין לראות במידע המסופק באפליקציה זו ייעוץ רפואי. כל החלטה שתתקבל על סמך המידע המסופק באפליקציה זו היא באחריות המשתמש בלבד. על ידי שימוש באפליקציה זו, את/ה מסכימ/ה לשחרר אותנו מכל אחריות הקשורה לשימוש בה.</Text>
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
    container: {
        direction: 'rtl',
        height: '100%',
        width: '100%',
    },
    helloText:{
        fontSize: 25,
        textAlign: 'left',
        alignItems: 'center',
        width: '100%',
        height: 30,
        marginTop: 10,
        marginBottom: 15,
        paddingRight: 20,
        fontFamily: 'Rubik-Bold',
        letterSpacing: 1,
        color: COLORS.darkGrey
    },
    nextButton: {
        marginTop: 0,
        width: '85%',
        height: 65,
        alignSelf: "center"
    },
    nextText: {
        fontFamily: 'Rubik-Bold',
        fontSize: 22
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
        textAlign: 'center',
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
})