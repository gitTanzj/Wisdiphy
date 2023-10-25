import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { SettingsStackParams } from '../navigation/screens/SettingsScreen'

interface SettingsOption {
  id: string
  name: string
  onPress: () => void
}

const settingsOptions = [
    {
      id: 's1',
      name: 'Account',
    },
    {
      id: 's2',
      name: 'Privacy',
    },
    {
      id: 's3',
      name: 'Notifications',
    },
    {
      id: 's4',
      name: 'About',
    },
    {
      id: 's5',
      name: 'Logout',
    }
  ]

const SettingsList: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<SettingsStackParams, 'SettingsList'>>()

  return (
    <ScrollView style={styles.settingsList}>
        {settingsOptions.map(({name, id}) => (
          <TouchableOpacity onPress={
            () => {
              if (name === 'Logout') {
                console.log('logout')
              } else{
                navigation.navigate(name as keyof SettingsStackParams)
              }
            }
            
            } key={id}>
            <View style={styles.settingsElement}>
              <Text style={styles.settingsText}>{name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
  )
}

export default SettingsList

const styles = StyleSheet.create({
    settingsList: {
        flex: 1,
        flexDirection: 'column'
      },
      settingsElement: {
        flex: 1,
        padding: 30,
        borderWidth: 2,
        borderRadius: 5,
        margin: 10,
        marginBottom: 5
      },
      settingsText: {
        fontWeight: 'bold',
        fontSize: 16,
      }
})