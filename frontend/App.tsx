import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import TitleScreen from './navigation/screens/TitleScreen';
import MainContainer from './navigation/MainContainer';
import StoryScreen from './navigation/screens/StoryScreen';
import NoteScreen from './navigation/screens/NoteScreen';

//context
import { NotesContextProvider } from './context/NotesContext';

const Stack = createStackNavigator();

export type RootStackParams = {
  TitleScreen: undefined
  MainContainer: undefined
  Stories: undefined
  Home: undefined
  Settings: undefined
  Notes: undefined
  StoryScreen: {
    title: string
    storyBody: string
  }
  NoteScreen: {
    associatedStory: string
    noteTitle: string
    noteBody: string
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
          <Stack.Screen
          name="NoteScreen"
          component={NoteScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesContextProvider>
  );
}