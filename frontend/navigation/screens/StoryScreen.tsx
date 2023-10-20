import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

interface StoriesElement {
  _id: any
  title: string,
  body: string
}


const StoryScreen:React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>{}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default StoryScreen