import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

// screens
import HomeScreen from './screens/HomeScreen'
import StoriesScreen from './screens/StoriesScreen'
import SettingsScreen from './screens/SettingsScreen'
import NotesScreen from './screens/NotesScreen'

// screen names
const homeName = 'Home'
const storiesName = 'Stories'
const settingsName = 'Settings'
const notesName = 'Notes'

const Tab = createBottomTabNavigator()

const MainContainer: React.FC = () => {
  return (
        <Tab.Navigator
            initialRouteName={storiesName}
            screenOptions={(route) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.route.name

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    }
                    else if (rn === storiesName) {
                        iconName = focused ? 'list' : 'list-outline'
                    }
                    else if (rn === settingsName) {
                        iconName = focused ? 'settings' : 'settings-outline'
                    }
                    else if (rn === notesName) {
                        iconName = focused ? 'document-text' : 'document-text-outline'
                    }
                    return <Ionicons name={iconName!} size={size} color={color}/>
                },
                tabBarActiveTintColor: 'tomato',
                headerTitleAlign: 'center',
                tabBarLabelStyle: {
                    paddingBottom: 10,
                    fontSize: 10
                },
                tabBarStyle: {
                    padding: 10,
                    height: 75
                }
            })}
            
        
            >
            
            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={storiesName} component={StoriesScreen}/>
            <Tab.Screen name={notesName} component={NotesScreen}/>
            <Tab.Screen name={settingsName} component={SettingsScreen}/>
        </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})

export default MainContainer