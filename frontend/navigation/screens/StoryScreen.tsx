import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/native';
import useNotesContext from '../../hooks/useNotesContext';


type StoryScreenRouteParams = {
  title: string;
  storyBody: string;
};

interface NotesElement {
  associatedStory: string
  noteBody: string
}

const StoryScreen:React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams, 'StoryScreen'>>()

  const { notes } = useNotesContext()
  // checks if the user has scrolled to the bottom of the screen
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }:any) => {
    const paddingToBottom = 40;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const [bottom, setBottom] = useState<boolean>(false)

  // gets params from navigation
  const route = useRoute()
  const params = route?.params as StoryScreenRouteParams
  
  if (!params) {
    return (
      <View style={styles.container}>
        <Text>No story data available.</Text>
      </View>
    );
  }

  const { title, storyBody } = params;

  const noteData = notes.find((note: NotesElement) => note.associatedStory === title)

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          setBottom(true)
        }
      }}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{storyBody}</Text>
        {bottom && 
          <View style={styles.button}>
            <TouchableOpacity
            onPress={() => navigation.navigate('NoteScreen', {
                associatedStory: title,
                noteBody: noteData.noteBody
              })}>
              <Text style={styles.buttonText}>Leave a note</Text>
            </TouchableOpacity>
          </View>
        }

      </ScrollView>
    </View>
  );
}


// styles for the screen
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  scrollView: {
    marginHorizontal: 20
  },
  title:{
    fontSize: 42,
    fontWeight: 'bold',
    marginHorizontal: 10,
    textAlign: 'center',
    paddingBottom: 30,
  },
  text:{
    fontSize: 24,
    rowGap: 12
  },
  button: {
    marginVertical: 20,
    height: 60,
    borderWidth: 3,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    height: 'auto',
    minHeight: 80,
  }
})

export default StoryScreen