import { StyleSheet, Text, Image, SafeAreaView } from 'react-native';

export default function App() {

  const handlePress = () => {
    console.log('clicked')
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text onPress={handlePress}>I am creating a React Native app!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
