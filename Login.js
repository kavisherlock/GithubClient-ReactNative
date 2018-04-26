import React, { Component } from 'react'
import { AppRegistry, View, StyleSheet, Image, TextInput, Text, TouchableOpacity } from 'react-native'

import logo from './Octocat/Octocat.png';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={logo}
        />
        <Text style={styles.title}>
          Github Client
        </Text>
        <TextInput
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          placeholder={'Password'}
          style={styles.input}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
          >
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: 50,
  },
  logo: {
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    margin: 10,
  },
  input: {
    height: 40,
    width: 250,
    padding: 5,
    margin: 15,
    marginTop: 10,
    backgroundColor: 'rgb(245,245,245)',
    color: 'rgb(0,0,0)',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.25)',
  },
  button: {
    backgroundColor: 'skyblue',
    margin: 15,
    padding: 10,
    width: 100,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
})
