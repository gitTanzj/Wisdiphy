import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import TitleScreen from './navigation/screens/TitleScreen';
import MainContainer from './navigation/MainContainer';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
      initialRouteName="TitleScreen"
      screenOptions={{ headerTitleAlign:'center' }}
      >
        <Stack.Screen
          name="TitleScreen"
          component={TitleScreen}
        />
        <Stack.Screen
          name="MainContainer"
          component={MainContainer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}