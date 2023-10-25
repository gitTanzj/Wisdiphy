import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

interface SettingsOption {
  id: string
  name: string
  onPress: () => void
}

const settingsOptions = [
    {
      id: 's1',
      name: 'Account',
      onPress: () => {}
    },
    {
      id: 's2',
      name: 'Privacy',
      onPress: () => {}
    },
    {
      id: 's3',
      name: 'Notifications',
      onPress: () => {}
    },
    {
      id: 's4',
      name: 'About',
      onPress: () => {}
    },
    {
      id: 's5',
      name: 'Logout',
      onPress: () => {}
    }
  ]

const SettingsList: React.FC = () => {
  return (
    <ScrollView style={styles.settingsList}>
        {settingsOptions.map(({name, onPress, id}) => (
          <TouchableOpacity onPress={onPress} key={id}>
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
        width: '100%',
        padding: 30,
        borderBottomWidth: 2,
      },
      settingsText: {
        fontWeight: 'bold',
        fontSize: 16,
      }
})