import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";

const InfoPopUp = ({icon, explanation, right}) => {

    return (
        <View>
            <Menu>
                <MenuTrigger>
                    {icon}
                </MenuTrigger>
                <MenuOptions
                    customStyles={right ? styles.menuStyle : styles.menuStyleNoMargin}>
                    <MenuOption
                        customStyles={styles.optionStyle}>
                        <Text>{explanation}</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    );
};

export default InfoPopUp

const styles = StyleSheet.create({
    menuStyle: {
        optionsContainer: {
            borderRadius: 10,
            marginTop: 25,
            marginRight: 100,
            width: "40%"
        }
    },
    menuStyleNoMargin: {
        optionsContainer: {
            borderRadius: 10,
            marginTop: 25,
            width: "40%"
        }
    },
    optionStyle: {
        optionWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: 1,
        },
    },
    optionStyleDisable: {
        optionWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: 0.2,
        },
    },
});