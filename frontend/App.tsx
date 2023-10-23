import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import TitleScreen from './navigation/screens/TitleScreen';
import MainContainer from './navigation/MainContainer';
import StoryScreen from './navigation/screens/StoryScreen';

//context
import { NotesContextProvider } from './context/NotesContext';

const Stack = createStackNavigator();

export type RootStackParams = {
  TitleScreen: undefined
  MainContainer: undefined
  Stories: undefined
  Home: undefined
  Settings: undefined
  StoryScreen: {
    title: string
    storyBody: string
  }
}

export default function App() {

  return (
    <NotesContextProvider>
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
          <Stack.Screen
          name="StoryScreen"
          component={StoryScreen}
          options={{headerTitle:''}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesContextProvider>
  );
}