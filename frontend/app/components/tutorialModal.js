import React from 'react';
import {
    Modal,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    Image
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {setShowTutorial} from "../redux/actions";
import COLORS from "../consts/colors";
import {Entypo, Ionicons} from "@expo/vector-icons";
import Iconn from "react-native-vector-icons/MaterialCommunityIcons";


const TutorialModal = () => {

    const {showTutorial} = useSelector(state => state.mealReducer);
    const dispatch = useDispatch();


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showTutorial}
            onRequestClose={() => {
                dispatch(setShowTutorial(false))
            }}
        >
            <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
                onPressOut={() => {
                    dispatch(setShowTutorial(false))
                }}
            >
                <ScrollView
                    directionalLockEnabled={true}
                    contentContainerStyle={styles.modalBackGround}
                >
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <View style={{flexDirection: 'row'}}>
                                <Ionicons name="flower-outline" size={22} style={{color:"black"}}/>
                                <Text style={styles.flowerText}>8</Text>
                                <Text style={styles.flowerTitle}> פרחים</Text>
                            </View>
                            <Text style={styles.modalText}>פרחים הם ניקוד של הארוחה בטווח 1-10 לפי השפעתה על הסביבה, ציון גבוה מעיד על השפעה סביבתית טובה יותר. תוכלו לצבור אותם כשתסמנו שאכלתם ארוחה.</Text>
                            <View style={{flexDirection:'row'}}>
                                <Image
                                    style={{width: 26, height: 26,borderColor: COLORS.dark, borderWidth:2, borderRadius:50}}
                                    source={require('frontend/app/assets/earth-globe-12153.png')}
                                />
                                <Text style={styles.upgradeTitle}>שדרג!</Text>
                            </View>
                            <Text style={styles.modalText}>תוכלו לשדרג לארוחה עם השפעה סביבתית טובה יותר ולהרוויח נקודות.</Text>
                            <View style={{flexDirection:'row'}}>
                                <Entypo name="tree" size={22} style={{color:"black", paddingHorizontal:4}}/>
                                <Text style={styles.flowerTitle}> GHG</Text>
                                <Text style={styles.ghgTitle}>0.196</Text>
                            </View>
                            <Text style={styles.modalText}>טביעת רגל פחמנית של ארוחה מחושבת מסך גזי החממה הנפלטים ממרכיביה.</Text>
                            <View style={{flexDirection:'row'}}>
                                <Iconn name='checkbox-blank-circle-outline' size={22} color={COLORS.dark}/>
                                <Iconn name='arrow-left-thin' size={22} color={COLORS.dark}/>
                                <Iconn name='check-circle-outline' size={22} color={COLORS.dark}/>
                                <Text style={styles.flowerTitle}>סימון אכלתי</Text>
                            </View>
                            <Text style={styles.modalText}>תוכלו לסמן שאכלתם את הארוחה ובכך לעקוב אחרי התזונה שלכם ולצבור נקודות!</Text>
                            <Text style={styles.modalTitle}>תוכנית מותאמת אישית</Text>
                            <Text style={styles.modalText}>כמות הקלוריות המומלצת ליום המחושבת לפי: מין, גיל, גובה, משקל ורמת פעילות גופנית. תוכלו לשנות פרטים אלו במידת הצורך בעמוד האישי שלכם.</Text>
                            <TouchableOpacity onPress={() => dispatch(setShowTutorial(false))}>
                                <Text style={styles.modalButton}>סגור</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
        marginTop: "3%",
        textAlign: 'center',
        paddingBottom: "10%",
    },
    modalButton: {
        fontFamily: 'Rubik-Bold',

        color: COLORS.primary,
    },
    modalTitle: {
        fontFamily: 'Rubik-Bold',
        fontSize: 16,
        color: COLORS.title

    },
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        height: '100%',
        width: '100%'
    },
    upgradeTitle: {
        color: COLORS.upgrade,
        marginTop: 4,
        fontSize: 16,
        fontFamily: 'Rubik-Bold',
        marginLeft: 5,
    },
    flowerText: {
        paddingHorizontal: 3,
        fontFamily: 'Rubik-Regular',
        fontSize: 16,
        color:COLORS.flower8,
        paddingTop: 3,
    },
    flowerTitle: {
        paddingHorizontal: 3,
        fontFamily: 'Rubik-Bold',
        fontSize: 16,
        color:COLORS.title,
        paddingTop: 3,
    },
    ghgTitle: {
        fontFamily: 'Rubik-Regular',
        fontSize: 16,
        color:COLORS.title,
        paddingTop: 3,
    },
});

export default TutorialModal;