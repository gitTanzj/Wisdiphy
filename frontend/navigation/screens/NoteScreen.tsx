import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useNotesContext from '../../hooks/useNotesContext'
import { useRoute } from '@react-navigation/native'

type NoteScreenRouteParams = {
    associatedStory: string;
    noteBody: string;
}

const NoteScreen:React.FC = () => {
  
  const { dispatch } = useNotesContext()

  // gets params from navigation
  const route = useRoute()
  const params = route?.params as NoteScreenRouteParams
  
  if (!params) {
    return (
      <View>
        <Text>No story data available.</Text>
      </View>
    );
  }

  const { associatedStory, noteBody } = params;
  // Should have a text area, button to save the note, button to delete the note
  return (
    <View>
        <Text>{params.noteBody}</Text>
    </View>
  )
}

export default NoteScreen

const styles = StyleSheet.create({})