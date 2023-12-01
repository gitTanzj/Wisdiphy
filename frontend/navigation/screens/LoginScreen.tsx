import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../firebase'
import firebase from "firebase/compat/app"

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials: firebase.auth.UserCredential) => {
          const user = userCredentials.user
          console.log(user?.email)
        })
        .catch((e: Error) => console.log(e))
    }

    const handleLogin = () => {
      auth
      .signInUserWithEmailAndPassword(email, password)
      .then((userCredentials: firebase.auth.UserCredential) => {
        const user = userCredentials.user
        console.log(`Logged in ${user?.email}`)
      })
      .catch((e: Error) => console.log(e))
    }

  return (
    <View>
      <Text>Please Give Me Your Data</Text>
      <View>
        <TextInput
          style={styles.email}
          placeholder="Email..."
          value={email}
          onChangeText={(text) => {setEmail(text)}}
        />
        <TextInput
          style={styles.password}
          placeholder="Password..."
          value={password}
          onChangeText={(text) => {setPassword(text)}}
          secureTextEntry
        />
      </View>
      
      <View>
        <TouchableOpacity
          onPress={() => handleLogin()}
          style={styles.login}
        >
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSignUp()}
          style={styles.signup}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  email: {

  },
  password: {

  },
  login: {

  },
  signup: {

  },
})