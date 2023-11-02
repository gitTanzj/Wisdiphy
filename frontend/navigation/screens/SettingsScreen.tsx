import { Settings, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//settings screens
import SettingsList from '../../settingsNavigation/SettingsList';
import Account from '../../settingsNavigation/settings-screens/Account';
import Privacy from '../../settingsNavigation/settings-screens/Privacy';
import Notifications from '../../settingsNavigation/settings-screens/Notifications';
import About from '../../settingsNavigation/settings-screens/About';
import EaseOfAccess from '../../settingsNavigation/settings-screens/EaseOfAccess';

export type SettingsStackParams = {
  SettingsList: undefined
  Account: undefined
  Privacy: undefined
  Notifications: undefined
  About: undefined
  EaseOfAcess: undefined
}

const SettingsStack = createStackNavigator();

export default function SettingsScreen() {

  return (
    <SettingsStack.Navigator
    initialRouteName="SettingsList"
    screenOptions={{headerTitle:''}}
    >
      <SettingsStack.Screen
        name="SettingsList"
        component={SettingsList}
        options={{headerShown: false}}
      />
      <SettingsStack.Screen
        name="Account"
        component={Account}
      />
      <SettingsStack.Screen
        name="Privacy"
        component={Privacy}
      />
      <SettingsStack.Screen
        name="Notifications"
        component={Notifications}
      />
      <SettingsStack.Screen
        name="About"
        component={About}
      />
      <SettingsStack.Screen
        name="EaseOfAccess"
        component={EaseOfAccess}
      />
    </SettingsStack.Navigator>
  )
}

const styles = StyleSheet.create({
  
})