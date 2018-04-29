import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import logo from './Octocat/Octocat.png';
import AuthService from './AuthService';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
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
  error: {
    color: 'red',
    fontSize: 12,
  },
  input: {
    height: 40,
    width: 250,
    padding: 5,
    margin: 15,
    marginTop: 10,
    backgroundColor: 'rgb(245, 245, 245)',
    color: 'rgb(0,0,0)',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.25)',
  },
  emptyInput: {
    borderColor: 'rgba(255, 0, 0, 0.25)',
  },
  button: {
    backgroundColor: 'blue',
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
});

const propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginInProgress: false,
      loginPressed: false,
      error: undefined,
    };

    this.onLoginPress = this.onLoginPress.bind(this);
  }

  onLoginPress() {
    const {
      username,
      password,
    } = this.state;

    if (username === '' || password === '') {
      this.setState(Object.assign({}, this.state, { loginPressed: true }));
      return;
    }
    this.setState(Object.assign({}, this.state, { loginInProgress: true }));

    const credentials = { username, password };
    AuthService.login(credentials, this.props.onLoginSuccess, (error) => {
      this.setState(Object.assign({}, this.state, { error, loginInProgress: false }));
    });
  }

  render() {
    let usernameStyle = styles.input;
    let passwordStyle = styles.input;

    if (this.state.username === '' && this.state.loginPressed) {
      usernameStyle = [styles.input, styles.emptyInput];
    }

    if (this.state.password === '' && this.state.loginPressed) {
      passwordStyle = [styles.input, styles.emptyInput];
    }

    let errorMessage;
    if (this.state.error) errorMessage = this.state.error.message;

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={logo}
        />
        <Text style={styles.title}>
          Github Client
        </Text>
        <Text style={styles.error}>
          {errorMessage}
        </Text>
        <TextInput
          placeholder="Username"
          style={usernameStyle}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={username => this.setState({ username, loginPressed: false, error: undefined })}
        />
        <TextInput
          placeholder="Password"
          style={passwordStyle}
          secureTextEntry
          onChangeText={password => this.setState({ password, loginPressed: false, error: undefined })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onLoginPress}
        >
          <Text
            style={styles.buttonText}
          >
            Log In
          </Text>
        </TouchableOpacity>
        <ActivityIndicator
          animating={this.state.loginInProgress}
          size="large"
          color="#0000ff"
        />
      </View>
    );
  }
}

Login.propTypes = propTypes;
