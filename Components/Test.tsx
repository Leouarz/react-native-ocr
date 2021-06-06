import React from 'react'
import { StyleSheet, View, Platform, Text } from 'react-native'

export default function Test() {
    return (
        <View style={styles.main_container}>
            <View style={styles.subview_container}>
                <Text>Hello {Platform.OS === "ios" ? "IOS" : "Android"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subview_container: {
    ...Platform.select({
        ios: {
          backgroundColor: 'red',
          height: 300,
          width: 150
        },
        android: {
          backgroundColor: 'blue',
          height: 150,
          width: 300
        }
      })
  }
})