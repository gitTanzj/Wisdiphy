import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../App';
import { IP_ADDRESS } from '../../config'

interface StoriesElement {
  _id: any
  title: string
  storyBody: string
}

const StoriesScreen:React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams, 'Stories'>>()

  const [stories, setStories] = useState<StoriesElement[]>([])

  useEffect(() => {
    const FetchData = async () => {
        axios.get(`https://${IP_ADDRESS}:8000/`)
        .then(res => {
          setStories(res.data)
        })
        .catch(err => console.error(err))
    }
    FetchData()
  }, [])

  return (
    <View style={styles.stories}>
        <FlatList
          data={stories}
          renderItem={({item}) => <Pressable onPress={() => navigation.navigate('StoryScreen', {title: item.title, storyBody: item.storyBody})}>
              <Text style={styles.storyTitle}>{item.title}</Text>
          </Pressable>}
          keyExtractor={item => item._id}
          numColumns={2}
        />
    </View>
  )
}

export default StoriesScreen

const styles = StyleSheet.create({
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
  