import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import useNotesContext from '../../hooks/useNotesContext'
import { useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../App'
import { StackNavigationProp } from '@react-navigation/stack'   

const NotesScreen:React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams, 'Notes'>>()

  const { notes } = useNotesContext()


  return (
    <View style={styles.notes}>
      <FlatList
        data={notes}
        renderItem={({item}) => (
            <TouchableOpacity style={styles.note} onPress={() => navigation.navigate('NoteScreen', {associatedStory: item.associatedStory, noteBody: item.noteBody})}>
                <View>
                    <Text style={styles.noteText}>{item.associatedStory}</Text>
                </View>
            </TouchableOpacity>
        )}
        numColumns={1}
      />
    </View>
  )
}

export default NotesScreen

const styles = StyleSheet.create({
    notes : {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    note: {
        flex: 1,
        marginVertical: 10,
        borderRadius: 5,
        borderWidth: 2,
        padding: 30,
    },
    noteText: {
        fontWeight: 'bold'
    }
})