import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { createStackNavigator } from '@react-navigation/stack';
import StoryScreen from './StoryScreen';
import StoriesList from '../../components/StoriesList';
import { NavigationContainer } from '@react-navigation/native'

interface StoriesElement {
  _id: any
  title: string,
  body: string
}

const Stack = createStackNavigator()

const Stories: React.FC = () => {


  const [stories, setStories] = useState<StoriesElement[]>([])

  useEffect(() => {
    const FetchData = async () => {
        axios.get('http://10.15.17.127:8000/')
        .then(res => {
          setStories(res.data)
        })
        .catch(err => console.error(err))
    }
    FetchData()
  }, [])

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
      initialRouteName="StoriesList"
      screenOptions={{ headerTitleAlign:'left' }}
      >
        <Stack.Screen
          name="StoriesList"
          component={StoriesList}
          initialParams={{stories:stories}}
        />
        <Stack.Screen
        name="StoryScreen"
        component={StoryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Stories