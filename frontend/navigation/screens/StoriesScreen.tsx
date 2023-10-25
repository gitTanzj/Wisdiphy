import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../App';
import { LOCAL_IP } from '@env'
import useNotesContext from '../../hooks/useNotesContext'

interface StoriesElement {
  _id: any
  title: string
  storyBody: string
}

export interface NotesElement {
  noteBody: string
  associatedStory: string
}

const StoriesScreen:React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams, 'Stories'>>()

  const { notes, dispatch } = useNotesContext()

  const [stories, setStories] = useState<StoriesElement[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const associatedNote = (associatedStory: string) => {
    const ans = notes.find((note:NotesElement) => note.associatedStory === associatedStory)
    return ans ? ans.noteBody : ''
  }

  useEffect(() => {
    const fetchStories = () => {
      setLoading(true)
      axios.get(`http://${LOCAL_IP}:8000/stories`)
        .then(res => {
          setStories(res.data)
        })
        .catch(err => {
          console.error(err)
        })
    }
    fetchStories()
  }, [])

  useEffect(() => {
    const fetchNotes = () => {
      axios.get(`http://${LOCAL_IP}:8000/notes`)
        .then(res => {
          dispatch({type: 'SET_NOTES', payload: res.data})
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    fetchNotes()
  }, [])
  
  
    return (
    <View style={styles.stories}>
      {loading ? <Text style={styles.loading}>Loading...</Text> : 
        (<FlatList
          data={stories}
          renderItem={({item}) => <TouchableOpacity onPress={() => navigation.navigate('StoryScreen', {title: item.title, storyBody: item.storyBody})}>
            <View style={styles.story}>
              <Text style={styles.storyTitle}>{item.title}</Text>
              {associatedNote(item.title) !== '' && <Text style={styles.storyNote}>{associatedNote(item.title)}</Text>}
            </View>
          </TouchableOpacity>}
          keyExtractor={item => item._id}
          numColumns={2}
        />)}
    </View>
  )
}

export default StoriesScreen

const styles = StyleSheet.create({
    loading: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 10,
      padding: 10,
      borderWidth: 2,
      borderRadius: 5,
      width: 160,
      height: 'auto',
    },
    stories: {
      flexDirection: 'column',
      flex:2,
      alignItems: 'center',
    },
    story: {
      flex: 1,
      margin: 10,
      borderRadius: 5,
      borderWidth: 2,
      width: 160,
    },
    storyTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 10,
      height: 'auto',
      minHeight: 80,
    },
    storyNote: {
      borderTopWidth: 2,
      textAlign: 'center',
      padding: 10,
    }
  })
  