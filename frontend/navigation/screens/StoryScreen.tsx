import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

type StoryScreenRouteParams = {
  story: {
    title: string;
    body: string;
  };
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

  const { title, body } = params.story;

  return (
    <View style={styles.container}>
      <Text>Title: {title}</Text>
      <Text>Body: {body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default StoryScreen