import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios'

type RootStackParamList = {
    StoriesList: undefined;
    StoryScreen: { story: { title: string; body: string } };
};
  
type StoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StoriesList'>;

interface StoriesListProps {
    navigation: StoryScreenNavigationProp;
}

interface StoriesElement {
    _id: any
    title: string,
    storyBody: string
}

const StoriesList:React.FC<StoriesListProps> = ({ navigation }) => {

  const [stories, setStories] = useState<StoriesElement[]>([])

  useEffect(() => {
    const FetchData = async () => {
        axios.get('http://192.168.1.202:8000/')
        .then(res => {
          setStories(res.data)
        })
        .catch(err => console.error(err))
    }
    FetchData()
  }, [])

  return (
    <View>
        <View style={styles.stories}>
            {stories.map((story: StoriesElement) => {
              return (
                  <View key={story._id}>
                  <Pressable onPress={() => navigation.navigate('StoryScreen', {story: {title: story.title, body: story.storyBody}})}>
                      <Text style={styles.storyTitle}>{story.title}</Text>
                  </Pressable>
                  </View>
              )
            })}
        </View>
    </View>
  )
}

export default StoriesList

const styles = StyleSheet.create({
    stories: {
      flexDirection: 'column'
    },
    storyTitle: {
      fontSize: 24,
      textAlign: 'center',
      margin: 10,
      padding: 10,
      borderWidth: 2,
      borderRadius: 5
    }
  })
  