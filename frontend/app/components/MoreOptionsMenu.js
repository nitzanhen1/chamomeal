import { StyleSheet, Text} from "react-native";
import React from "react";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const OptionsMenu = () => {
    return (
            <Menu>
                <MenuTrigger>
                    <MaterialIcons name="more-vert" size={25} color="black" style={styles.moreIcon} />
                </MenuTrigger>
                <MenuOptions
                    customStyles={{
                        optionsContainer: {
                            borderRadius: 10,
                            marginTop: -45,
                            marginRight: 30,
                        },
                    }}
                >
                    <MenuOption
                        onSelect={(value) => alert(`You clicked ${value}`)}
                        customStyles={styles.optionStyle}
                    >
                        <Text>הוספה למועדפים</Text>
                        <MaterialCommunityIcons name="cards-heart-outline" size={24} color="black" />
                    </MenuOption>
                    <MenuOption
                        onSelect={(value) => alert(`You clicked ${value}`)}
                        customStyles={styles.optionStyle}
                    >
                        <Text>הגרל מתכון רנדומלי</Text>
                        <FontAwesome name="random" size={24} color="black" />
                    </MenuOption>
                    <MenuOption
                        onSelect={(value) => alert(`You clicked ${value}`)}
                        customStyles={styles.optionStyle}
                    >
                        <Text>חפש מתכון אחר</Text>
                        <MaterialCommunityIcons name="find-replace" size={24} color="black" />
                    </MenuOption>
                    <MenuOption
                        onSelect={(value) => alert(`You clicked ${value}`)}
                        customStyles={styles.optionStyle}
                    >
                        <Text>החלף מהמועדפים</Text>
                        <Ionicons name="md-heart-circle-outline" size={24} color="black" />
                    </MenuOption>
                </MenuOptions>
            </Menu>
    );
};
export default OptionsMenu;

const styles = StyleSheet.create({
    optionStyle:{
        optionWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
    },
    moreIcon: {
        marginTop: 7,
    }
});