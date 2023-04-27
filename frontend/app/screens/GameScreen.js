import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
    TouchableWithoutFeedback
} from 'react-native'
import React, {useState} from 'react'
import {useSelector} from "react-redux";
import COLORS from "../consts/colors";
import {AntDesign, FontAwesome} from "@expo/vector-icons";

export default function GameScreen() {
    const {badges, first_name, score} = useSelector(state => state.mealReducer);
    const badge_details = [
        {id: 1, badge: badges[0], source: require('../assets/badges/flower6.png'), text: '5 קיימות', showText: false},
        {id: 2, badge: badges[1], source: require('../assets/badges/flower6.png'), text: '15 קיימות', showText: false},
        {id: 3, badge: badges[2], source: require('../assets/badges/flower6.png'), text: '30 קיימות', showText: false},
        {id: 4, badge: badges[3], source: require('../assets/badges/flower6.png'), text: '50 קיימות', showText: false},
        {id: 5, badge: badges[4], source: require('../assets/badges/flower6.png'), text: '80 קיימות', showText: false},
        {id: 6, badge: badges[5], source: require('../assets/badges/flower6.png'), text: '120 קיימות', showText: false},

        {id: 7, badge: badges[6], source: require('../assets/badges/flower1.png'), text: '10 פרחים', showText: false},
        {id: 8, badge: badges[7], source: require('../assets/badges/flower2.png'), text: '50 פרחים', showText: false},
        {id: 9, badge: badges[8], source: require('../assets/badges/flower3.png'), text: '100 פרחים', showText: false},
        {id: 10, badge: badges[9], source: require('../assets/badges/flower4.png'), text: '200 פרחים', showText: false},
        {
            id: 11,
            badge: badges[10],
            source: require('../assets/badges/flower5.png'),
            text: '500 פרחים',
            showText: false
        },
        {
            id: 12,
            badge: badges[11],
            source: require('../assets/badges/flower6.png'),
            text: '1000 פרחים',
            showText: false
        },

        {id: 13, badge: badges[12], source: require('../assets/badges/flower6.png'), text: 'יומיים', showText: false},
        {id: 14, badge: badges[13], source: require('../assets/badges/flower6.png'), text: '4 ימים', showText: false},
        {id: 15, badge: badges[14], source: require('../assets/badges/flower6.png'), text: '7 ימים', showText: false},
        {id: 16, badge: badges[15], source: require('../assets/badges/flower6.png'), text: '10 ימים', showText: false},
        {id: 17, badge: badges[16], source: require('../assets/badges/flower6.png'), text: '14 ימים', showText: false},
        {id: 18, badge: badges[17], source: require('../assets/badges/flower6.png'), text: '20 ימים', showText: false},
    ]
    const [visibleTextMap, setVisibleTextMap] = useState({});
    const [modalVisibleOne, setModalVisibleOne] = useState(false);
    const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
    const [modalVisibleThree, setModalVisibleThree] = useState(false);
    const renderItem = ({item}) => {
        const onPressImage = () => {
            setVisibleTextMap(prevState => ({...prevState, [item.id]: true}));
            setTimeout(() => {
                setVisibleTextMap(prevState => ({...prevState, [item.id]: false}));
            }, 2000); // hide text after 2 seconds
        };

        return (
            <TouchableOpacity onPress={onPressImage}>
                <View style={styles.view}>
                    {item.badge ? (
                        <Image
                            source={item.source}
                            style={styles.image}
                        />
                    ) : (
                        <View>
                            <Image source={item.source} style={[styles.image, styles.grey_background]}/>
                            <Image
                                source={item.source}
                                style={[styles.image, styles.bw_image]}
                            />
                        </View>
                    )}
                    {visibleTextMap[item.id] &&
                        <Image source={item.source} style={[styles.image, styles.clicked_effect]}/>}
                    {visibleTextMap[item.id] && <Text style={styles.textImg}>{item.text}</Text>}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView>

            <View style={styles.container}>
                {/*<Text style={styles.textCals}>{first_name} שלום</Text>*/}
                {/*<Text style={styles.textCals}>עד כה צברת {score} פרחים</Text>*/}
                <View style={styles.header}>
                    <Text style={styles.subtitles}>קיימות</Text>
                    <TouchableOpacity onPress={() => setModalVisibleOne(true)}>

                        <FontAwesome name="question-circle-o" size={25} style={styles.qIcon}/>
                    </TouchableOpacity>

                </View>
                <FlatList
                    data={badge_details.slice(0, 6)}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${index}`}
                    numColumns={3}
                    contentContainerStyle={styles.list_img}
                    scrollEnabled={false}
                />
                <View style={styles.header}>
                    <Text style={styles.subtitles}>פרחים</Text>
                    <TouchableOpacity onPress={() => setModalVisibleTwo(true)}>

                        <FontAwesome name="question-circle-o" size={25} style={styles.qIcon} o/>
                    </TouchableOpacity>

                </View>
                <FlatList
                    data={badge_details.slice(6, 12)}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${index}`}
                    numColumns={3}
                    contentContainerStyle={styles.list_img}
                    scrollEnabled={false}

                />
                <View style={styles.header}>
                    <Text style={styles.subtitles}>רצף התחברות</Text>
                    <TouchableOpacity onPress={() => setModalVisibleThree(true)}>

                        <FontAwesome name="question-circle-o" size={25} style={styles.qIcon} o/>
                    </TouchableOpacity>

                </View>
                <FlatList
                    data={badge_details.slice(12, 18)}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${index}`}
                    numColumns={3}
                    contentContainerStyle={styles.list_img}
                    scrollEnabled={false}

                />

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisibleOne}
                    onRequestClose={() => {
                        setModalVisibleOne(false)
                    }}
                >
                    <TouchableOpacity
                        style={styles.modalContainer}
                        activeOpacity={1}
                        onPressOut={() => {
                            setModalVisibleOne(false)
                        }}
                    >
                        <ScrollView
                            directionalLockEnabled={true}
                            contentContainerStyle={styles.modalBackGround}
                        >
                            <TouchableWithoutFeedback>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalTitle}>נקודות קיימות</Text>
                                    <Text style={styles.modalText}>נקודות אלה נצברות כאשר משדרגים ארוחה ועוזרים
                                        לסביבה!</Text>
                                    <TouchableOpacity onPress={() => setModalVisibleOne(false)}>
                                        <Text style={styles.modalButton}>סגור</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </ScrollView>
                    </TouchableOpacity>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisibleTwo}
                    onRequestClose={() => {
                        setModalVisibleTwo(false)
                    }}
                >
                    <TouchableOpacity
                        style={styles.modalContainer}
                        activeOpacity={1}
                        onPressOut={() => {
                            setModalVisibleTwo(false)
                        }}
                    >
                        <ScrollView
                            directionalLockEnabled={true}
                            contentContainerStyle={styles.modalBackGround}
                        >
                            <TouchableWithoutFeedback>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalTitle}>פרחים</Text>
                                    <Text style={styles.modalText}>נקודות אלה נצברות כאשר אתם מסמנים שאכלתם ארוחה, בהתאם
                                        להשפעה
                                        הסביבתית שלה.</Text>
                                    <TouchableOpacity onPress={() => setModalVisibleTwo(false)}>
                                        <Text style={styles.modalButton}>סגור</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </ScrollView>
                    </TouchableOpacity>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisibleThree}
                    onRequestClose={() => {
                        setModalVisibleThree(false)
                    }}
                >
                    <TouchableOpacity
                        style={styles.modalContainer}
                        activeOpacity={1}
                        onPressOut={() => {
                            setModalVisibleThree(false)
                        }}
                    >
                        <ScrollView
                            directionalLockEnabled={true}
                            contentContainerStyle={styles.modalBackGround}
                        >
                            <TouchableWithoutFeedback>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalTitle}>רצף התחברות</Text>
                                    <Text style={styles.modalText}>מתחברים ברציפות וצוברים תגים! </Text>
                                    <TouchableOpacity onPress={() => setModalVisibleThree(false)}>
                                        <Text style={styles.modalButton}>סגור</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </ScrollView>
                    </TouchableOpacity>
                </Modal>
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textImg: {
        fontSize: 18,
        alignSelf: 'center',
        top: '60%',
        fontWeight: 'bold',
        position: 'absolute',
    },
    list_img: {
        marginTop: 7,
        marginBottom: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        margin: 12,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    bw_image: {
        opacity: 0.25,
    },
    grey_background: {
        position: 'absolute',
        tintColor: 'gray'
    },
    clicked_effect: {
        position: 'absolute',
        tintColor: 'white',
        opacity: 0.7,
    },
    subtitles: {
        fontFamily: 'Rubik-Bold',
        fontSize: 22,
        alignSelf: 'center',
        textAlignVertical: "center",
        color: COLORS.darkGrey
    },
    header: {
        flexDirection: "row",
        width: '100%',
        backgroundColor: COLORS.subtitles,
        justifyContent: "space-between",
        height: 32,
        paddingHorizontal: '6%',
    },
    qIcon: {
        marginTop: 3,
        color: COLORS.darkGrey,
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
        marginVertical: 15,
        textAlign: 'center',
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
    }
});