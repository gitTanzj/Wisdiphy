import { StyleSheet, Text, View, TextInput, NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity } from 'react-native'
import React from 'react'
import useNotesContext from '../../hooks/useNotesContext'
import { useRoute } from '@react-navigation/native'
import { LOCAL_IP } from '@env'

type NoteScreenRouteParams = {
    associatedStory: string;
    noteBody: string;
}

interface NotesElement {
  associatedStory: string
  noteBody: string
}


const NoteScreen:React.FC = () => {


  const { notes, dispatch } = useNotesContext()

  
  // gets params from navigation
  const route = useRoute()
  const params = route?.params as NoteScreenRouteParams
  const { associatedStory, noteBody } = params;

  
  const [value, onChangeNoteText] = React.useState(noteBody ? noteBody : '');

  const handleNoteSubmit = () => {
    const data = {
      noteBody: value,
      associatedStory: associatedStory
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    console.log(requestOptions)
    fetch(`http://${LOCAL_IP}:8000/notes`, requestOptions)
      .then(response => response.json())
      .then(dispatch({type: 'UPDATE_NOTE', payload: data}))
      .catch((err: Error) => console.error(err))
  }

  const handleNoteDelete = () => {
    const data = {
      noteBody: value,
      associatedStory: associatedStory
    }
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    console.log(requestOptions)
    dispatch({type: 'DELETE_NOTE', payload: data})
  }
  
  if (!params || !noteBody) {
    return (
      <View>
        <Text>No story data available.</Text>
      </View>
    );
  }

  // Should have a text area, button to save the note, button to delete the note
  return (
    <View style={styles.noteScreen}>
        <TextInput
          editable
          style={styles.noteInput}
          value={value}
          onChange={(e:NativeSyntheticEvent<TextInputChangeEventData>) => onChangeNoteText(e.nativeEvent.text)}
          onSubmitEditing={() => {handleNoteSubmit()}}
        />
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleNoteDelete()}>
            <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
    </View>
  )
}

export default NoteScreen

const styles = StyleSheet.create({
  noteScreen: {
    height: '100%'
  },
  noteInput: {
    margin: 20,
  },
  deleteButton: {
    right: 0,
    bottom: 0,
    position: 'absolute',
    width: 70,
    height: 70,
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 10,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center'  
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})