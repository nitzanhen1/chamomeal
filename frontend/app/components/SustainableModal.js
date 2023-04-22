import React from 'react';
import {Modal, StyleSheet, View, ScrollView, TouchableOpacity, Text} from "react-native";
import COLORS from "../consts/colors";
import PreviewCard from "./PreviewCard";
import {AntDesign, Ionicons} from "@expo/vector-icons";


const SustainableModal = ({
                              visibleSustainableModal,
                              handleCloseSustainableModal,
                              getMoreSustainableRecipes,
                              recipes
                          }) => {

    return (
        <Modal
            transparent
            visible={visibleSustainableModal}
            onRequestClose={handleCloseSustainableModal}
            animationType="slide">
            <TouchableOpacity
                style={{height: '100%', width: '100%'}}
                activeOpacity={1}
                onPressOut={handleCloseSustainableModal
                }
            >
                <View style={styles.modalBackGround}>
                    <View style={styles.modalContainer}>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={handleCloseSustainableModal}
                                              style={{position: 'absolute', top: 10, right: 10}}>
                                <AntDesign name="closecircleo" size={25} style={styles.exitIcon}/>
                            </TouchableOpacity>
                            <Ionicons style={styles.iconMore} name="sync-circle-outline"
                                      onPress={getMoreSustainableRecipes}/>
                            <Text style={styles.textHeader}>ארוחות מקיימות לסביבה</Text>
                        </View>
                        <ScrollView style={styles.information}>
                            {recipes.map(recipe =>
                                <View key={recipe.recipe_id}>
                                    <PreviewCard recipe={recipe} sustainable={true}
                                                 handleCloseSustainableModal={handleCloseSustainableModal}
                                                 from={'sustainability'}/>
                                </View>
                            )}
                            {recipes.length == 0 && <Text style={styles.helloText}>אין תוצאות</Text>}
                        </ScrollView>
                    </View>
                </View>
            </TouchableOpacity>
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
        width: '83%',
        height: '63%',
        backgroundColor: COLORS.light,
        borderRadius: 10,
        // paddingHorizontal: 10
    },
    container: {
        flexDirection: "row",
        borderRadius: 10,

    },
    exitIcon: {
        color: COLORS.darkGrey,
        backgroundColor: COLORS.white,
        borderRadius: 100
    },
    information: {
        marginTop: 40,
        marginHorizontal: 10,
        // borderRadius: 10,
        borderBottomLeftRadius: 10, // apply the bottom radius to the scroll view
        borderBottomRightRadius: 10,
        paddingBottom: 10,
        flex: 1
    },
    textHeader: {
        fontSize: 20,
        position: 'absolute',
        top: 10,
        left: 50,
        fontFamily: 'Rubik-Bold',
        letterSpacing: 0.5,
        color: COLORS.darkGrey

    },
    iconMore: {
        fontSize: 30,
        position: 'absolute',
        top: 6,
        left: 8
    },
    helloText: {
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        height: 30,
        marginTop: 20,
        marginBottom: 15,
        paddingRight: 20,
        fontFamily: 'Rubik-Bold',
        letterSpacing: 1,
        color: COLORS.darkGrey
    },

});

export default SustainableModal;