import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import Login from './Login';
import AuthService from './AuthService';
import Container from './Container';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: undefined,
      checkingAuth: true,
    };

    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    AuthService.getAuthInfo((err, authInfo) => {
      let user;
      if (authInfo) {
        ({ user } = authInfo);
      }
      this.setState({
        checkingAuth: false,
        loggedIn: authInfo !== undefined,
        user,
      });
    });
  }

  onLogin(user) {
    const newState = Object.assign({}, this.state, { loggedIn: true, user });
    this.setState(newState);
  }

  render() {
    let renderedComponent;
    if (this.state.checkingAuth) {
      renderedComponent = <ActivityIndicator animating size="large" color="#0000ff" />;
    } else if (this.state.loggedIn) {
      renderedComponent = <Container currentUserId={this.state.user.login} />;
    } else {
      renderedComponent = <Login onLoginSuccess={this.onLogin} />;
    }
    return (
      <View style={styles.container}>
        {renderedComponent}
      </View>
    );
  }
}
