import { StyleSheet, Text, View, Pressable, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../App';
import { LOCAL_IP } from '@env'

interface StoriesElement {
  _id: any
  title: string
  storyBody: string
}

const StoriesScreen:React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams, 'Stories'>>()

  const [stories, setStories] = useState<StoriesElement[]>([])
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    const fetchData = () => {
      setLoading(true)
      axios.get(`http://${LOCAL_IP}:8000`)
        .then(res => {
          setStories(res.data)
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    fetchData()
  }, [])

  return (
    <View style={styles.stories}>
      {loading ? <Text style={styles.loading}>Loading...</Text> : 
        (<FlatList
          data={stories}
          renderItem={({item}) => <TouchableOpacity onPress={() => navigation.navigate('StoryScreen', {title: item.title, storyBody: item.storyBody})}>
              <Text style={styles.storyTitle}>{item.title}</Text>
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
      height: 'auto'
    },
    stories: {
      flexDirection: 'column',
      flex:2,
      alignItems: 'center'
    },
    storyTitle: {
      flex: 1,
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 10,
      padding: 10,
      borderWidth: 2,
      borderRadius: 5,
      width: 160,
      height: 'auto'
    }
  })
  