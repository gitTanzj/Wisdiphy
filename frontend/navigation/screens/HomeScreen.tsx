import { StyleSheet, SafeAreaView, Platform, StatusBar, Text, Button, View } from 'react-native'
import React from 'react'

export default function HomeScreen() {
  return (
      <SafeAreaView style={styles.container}>
        
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: 'grey'
    }
})