import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import StoryBottomText from '../../components/StoryBottomText';


type StoryScreenRouteParams = {
  title: string;
  storyBody: string;
};

const StoryScreen:React.FC = () => {

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
        {bottom && <StoryBottomText associatedStory={title}/>}
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
  }
})

export default StoryScreen