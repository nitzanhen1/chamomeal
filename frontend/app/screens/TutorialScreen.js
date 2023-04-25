import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import {setShowTutorial} from "../redux/actions";
import {useDispatch} from "react-redux";

export const TutorialOverlay = () => {

    const dispatch = useDispatch();

    return (
        <TouchableOpacity activeOpacity={1}  style={styles.tutorialOverlay} onPress={() =>dispatch(setShowTutorial(false))}>
            <Image source={require('../assets/tutorial2-removebg.png')} style={styles.tutorialPhoto} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tutorialOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
        zIndex: 1,
    },
    tutorialPhoto: {
        width: '100%',
        height: '100%',
    },
    tutorialArrows: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

