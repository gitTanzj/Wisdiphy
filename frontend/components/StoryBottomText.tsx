import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { NativeSyntheticEvent } from 'react-native';
import { TextInputChangeEventData } from 'react-native';

const StoryBottomText = () => {

    const [value, onChangeText] = useState('');

  return (
    <View style={styles.textarea}>
      <TextInput
      multiline={true}
      numberOfLines={4}
      value={value}
      onChange={(e:NativeSyntheticEvent<TextInputChangeEventData>) => {
        onChangeText(e.nativeEvent.text)
    }}
      />
    </View>
  )
}

export default StoryBottomText

const styles = StyleSheet.create({
    textarea: {
        height: 80,
        borderWidth: 3,
        borderColor: 'grey',
        padding: 10,
    }
})