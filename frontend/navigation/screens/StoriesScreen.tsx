import React from 'react'
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

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
      initialRouteName="StoriesList"
      screenOptions={{ headerTitleAlign:'center' }}
      >
        <Stack.Screen
          name="StoriesList"
          component={StoriesList}
          options={{headerLeft: () => null}}
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