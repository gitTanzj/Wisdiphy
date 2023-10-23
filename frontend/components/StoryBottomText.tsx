import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { NativeSyntheticEvent } from 'react-native';
import { TextInputChangeEventData } from 'react-native';
import useNotesContext from '../hooks/useNotesContext';
import { LOCAL_IP } from '@env'

import { NotesElement } from '../navigation/screens/StoriesScreen';

interface StoryBottomTextProps {
  associatedStory: string
}


const StoryBottomText:React.FC<StoryBottomTextProps> = (props) => {
  const { notes, dispatch } = useNotesContext()

  const currNote = notes.find((note: NotesElement) => note.associatedStory === props.associatedStory)

  const [value, onChangeText] = useState(currNote ? currNote.noteBody : '');

  const handleTextSubmit = () => {
    const data = {
      noteBody: value,
      associatedStory: props.associatedStory
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
  console.log(requestOptions)
  fetch(`http://${LOCAL_IP}:8000/notes`, requestOptions)
    .then(response => response.json())
    .then(dispatch({type: 'CREATE_NOTE', payload: data}))
    .catch((err: Error) => console.error(err))
  
  }

  return (
    <View style={styles.textarea}>
      <TextInput
      editable
      numberOfLines={4}
      value={value}
      onChange={(e:NativeSyntheticEvent<TextInputChangeEventData>) => {
        onChangeText(e.nativeEvent.text)
    }}
      onSubmitEditing={() => {handleTextSubmit()}}
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