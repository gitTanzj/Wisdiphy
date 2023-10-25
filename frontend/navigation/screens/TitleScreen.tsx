import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';


type RootStackParamList = {
    TitleScreen: undefined;
    MainContainer: undefined;
};
  
type TitleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TitleScreen'>;

interface TitleScreenProps {
    navigation: TitleScreenNavigationProp;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.titleScreen}>
        <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('MainContainer')}
        >
            <Text style={styles.text}>Continue</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    titleScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',
        borderWidth: 2,
        borderColor: 'dodgerblue',
        width: '50%',
        height: '10%',
        borderRadius: 10
    },
    text: {
        color: 'dodgerblue',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default TitleScreen