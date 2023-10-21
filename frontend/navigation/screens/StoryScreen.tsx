import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


type StoryScreenRouteParams = {
  title: string;
  storyBody: string;
};

const StoryScreen:React.FC = () => {

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
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{storyBody}</Text>
      </ScrollView>
    </View>
  );
}

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
    paddingBottom: 30
  },
  text:{
    fontSize: 24,
    rowGap: 12
  }
})

export default StoryScreen