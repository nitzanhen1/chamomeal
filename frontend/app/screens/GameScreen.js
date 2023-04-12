import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {useSelector} from "react-redux";

export default function GameScreen() {
    const {badges, first_name, score} = useSelector(state => state.mealReducer);
    const badge_details = [
        {id:1, badge: badges[0], source: require('../assets/badges/flower1.png'), text: '10 פרחים', showText: false},
        {id:2, badge: badges[1], source: require('../assets/badges/flower2.png'), text: '20 פרחים', showText: false},
        {id:3, badge: badges[2], source: require('../assets/badges/flower3.png'), text: '50 פרחים', showText: false},
        {id:4, badge: badges[3], source: require('../assets/badges/flower4.png'), text: '100 פרחים', showText: false},
        {id:5, badge: badges[4], source: require('../assets/badges/flower5.png'), text: '200 פרחים', showText: false},
        {id:6, badge: badges[5], source: require('../assets/badges/flower6.png'), text: '350 פרחים', showText: false},
        {id:7, badge: badges[6], source: require('../assets/badges/flower6.png'), text: '500 פרחים', showText: false},
        {id:8, badge: badges[7], source: require('../assets/badges/flower6.png'), text: '750 פרחים', showText: false},
        {id:9, badge: badges[8], source: require('../assets/badges/flower6.png'), text: '1000 פרחים', showText: false},
        {id:10, badge: false, source: require('../assets/badges/flower6.png'), text: '', showText: false}, //TODO delete or add badges
        {id:11, badge: false, source: require('../assets/badges/flower6.png'), text: '', showText: false}, //TODO delete or add badges
        {id:12, badge: false, source: require('../assets/badges/flower6.png'), text: '', showText: false}, //TODO delete or add badges
    ]
    const [visibleTextMap, setVisibleTextMap] = useState({});
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
                            style={[styles.image,styles.bw_image]}
                        />
                    </View>
                )}
                {visibleTextMap[item.id] && <Image source={item.source} style={[styles.image,styles.clicked_effect]}/>}
                {visibleTextMap[item.id] && <Text style={styles.textImg}>{item.text}</Text>}
            </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textCals}>{first_name} שלום</Text>
            <Text style={styles.textCals}>עד כה צברת: {score}</Text>
            <FlatList
                data={badge_details}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}`}
                numColumns={3}
                contentContainerStyle={styles.list_img}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textCals: {
        fontSize: 24,
        alignSelf: 'center',
        top: 20,
        fontWeight: 'bold',
    },
    textImg: {
        fontSize: 18,
        alignSelf: 'center',
        top: '60%',
        fontWeight: 'bold',
        position: 'absolute',
    },
    list_img: {
        top: 50,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        margin: 12,
        resizeMode: 'contain',
        borderRadius:10,
    },
    bw_image: {
        opacity: 0.25,
    },
    grey_background: {
        position: 'absolute',
        tintColor: 'gray'
    },
    clicked_effect:{
        position: 'absolute',
        tintColor: 'white',
        opacity: 0.7,
    }
});