import { StyleSheet, Text, View, TextInput, NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity } from 'react-native'
import React from 'react'
import useNotesContext from '../../hooks/useNotesContext'
import { useRoute } from '@react-navigation/native'
import { LOCAL_IP } from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';

type NoteScreenRouteParams = {
    associatedStory: string;
    noteTitle: string;
    noteBody: string;
    _id: string;
}


const NoteScreen:React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams, 'NoteScreen'>>()

  const { dispatch } = useNotesContext()

  
  // gets params from navigation
  const route = useRoute()
  const params = route?.params as NoteScreenRouteParams
  const { associatedStory, noteBody, noteTitle, _id } = params;

  const [editableNoteTitle, onChangeNoteTitle] = React.useState(noteTitle ? noteTitle : '')
  const [editableNoteText, onChangeNoteText] = React.useState(noteBody ? noteBody : '');

  const handleNoteSubmit = () => {
    const data = {
      noteBody: editableNoteText,
      noteTitle: editableNoteTitle,
      associatedStory: associatedStory,
      id: _id
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
    navigation.pop(1)
  }

  const handleNoteDelete = () => {
    const data = {
      noteBody: editableNoteText,
      noteTitle: editableNoteTitle,
      associatedStory: associatedStory,
      id: _id
    }
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    console.log(requestOptions)
    fetch(`http://${LOCAL_IP}:8000/notes/${_id}`, requestOptions)
      .then(dispatch({type: 'DELETE_NOTE', payload: data}))
      .catch((err: Error) => console.error(err))
    navigation.pop(1)
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
          style={styles.noteTitleInput}
          placeholder='Note Title...'
          value={editableNoteTitle}
          onChange={(e:NativeSyntheticEvent<TextInputChangeEventData>) => onChangeNoteTitle(e.nativeEvent.text)}
        />
        <TextInput
          editable
          multiline
          numberOfLines={10}
          style={styles.noteTextInput}
          value={editableNoteText}
          placeholder='Note Text...'
          onChange={(e:NativeSyntheticEvent<TextInputChangeEventData>) => onChangeNoteText(e.nativeEvent.text)}
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.saveButton} onPress={() => handleNoteSubmit()}>
            <Ionicons name='checkmark-outline' size={40}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleNoteDelete()}>
              <Ionicons name='close-outline' size={40}/>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default NoteScreen

const styles = StyleSheet.create({
  noteScreen: {
    height: '100%'
  },
  noteTitleInput: {
    margin: 20,
    marginBottom: 0,
    fontSize: 20,
    fontWeight: 'bold',
    overflow: 'scroll',
    height: 50,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
  noteTextInput: {
    margin: 20,
    fontSize: 20,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  deleteButton: {
    width: 70,
    height: 70,
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',  
    margin: 10,
  },
  saveButton: {
    width: 70,
    height: 70,
    backgroundColor: 'limegreen',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',  
    margin: 10,
  }
})