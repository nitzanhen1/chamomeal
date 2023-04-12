import React from 'react';
import {Modal, StyleSheet, View, ScrollView, TouchableOpacity, Text} from "react-native";
import COLORS from "../consts/colors";
import PreviewCard from "./PreviewCard";
import {AntDesign} from "@expo/vector-icons";


const SustainableModal = ({visibleSustainableModal, handleCloseSustainableModal, recipes}) => {

    return (
        <Modal
            transparent
            visible={visibleSustainableModal}
            onRequestClose={handleCloseSustainableModal}
            animationType="slide">
            <View style={styles.modalBackGround}>
                <View style={styles.modalContainer}>
                    <View style={styles.container} >
                        <TouchableOpacity onPress={handleCloseSustainableModal} style={{ position: 'absolute', top: 10, right: 10 }}>
                            <AntDesign  name="closecircleo" size={25} style={styles.exitIcon} />
                        </TouchableOpacity>
                        <Text style={styles.textHeader}>בחר ארוחה טובה יותר לסביבה</Text>
                    </View>
                    <ScrollView style={styles.information}>
                        {recipes.map(recipe=>
                            <View key={recipe.recipe_id}>
                                <PreviewCard recipe={recipe} sustainable={true} handleCloseSustainableModal={handleCloseSustainableModal}/>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        height: '62%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    container:{
        flexDirection: "row",
    },
    exitIcon: {
        color: COLORS.darkGrey,
        backgroundColor: COLORS.white,
        borderRadius: 100
    },
    information: {
        marginTop: 40,
    },
    textHeader: {
        fontSize: 20,
        position: 'absolute',
        top: 10, left: 10
    }
});

export default SustainableModal;