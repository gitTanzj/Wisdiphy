import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    StoriesList: undefined;
    StoryScreen: undefined;
  };
  
type StoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StoriesList'>;

interface StoriesListProps {
    navigation: StoryScreenNavigationProp;
}

interface StoriesElement {
    _id: any
    title: string,
    body: string
}

const StoriesList:React.FC<StoriesListProps> = ({ navigation }) => {



  return (
    <View>
        <View style={styles.stories}>
            {/* {stories.map((story: StoriesElement) => (
                <View key={story._id}>
                <Pressable onPress={() => navigation.navigate('StoryScreen', {stories: stories})}>
                    <Text style={styles.storyTitle}>{story.title}</Text>
                </Pressable>
                </View>
            ))} */}
            <Pressable onPress={() => navigation.navigate('StoryScreen')}>
                <Text>Press me</Text>
            </Pressable>
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
  