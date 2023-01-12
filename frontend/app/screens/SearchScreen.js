import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

export default function SearchScreen() {
  return (
    <View style={styles.view}>
      <Text>SearchScreen</Text>
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

