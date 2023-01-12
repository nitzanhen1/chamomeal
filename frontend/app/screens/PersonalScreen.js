import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function PersonalScreen() {
  return (
    <View style={styles.view}>
      <Text>PersonalScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems:  "center",
    }, 
})