import React, { useState, useEffect } from 'react'
import { CheckBox, Alert, Modal, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'



export default function Task() {



    const [done, setDone] = useState(false);


    return (
        <ScrollView>
            <View style={styles.body}>
                <View style={styles.checkbox}>
                    <CheckBox
                        value={done}
                        onValueChange={(newValue) => setDone(newValue)}
                    />
                    <Text style={styles.text}>
                        Is Done
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    checkbox: {
        flexDirection: 'row',
        margin: 10,
    },

})