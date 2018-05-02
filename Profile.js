import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import Repositories from './Repositories';

const styles = StyleSheet.create({
  profile: {
    padding: 10,
    backgroundColor: 'rgba(240, 240, 240, 0.75)',
    borderColor: 'rgba(200, 200, 200, 0.75)',
    borderWidth: 1,
  },
  userImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  userName: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 36,
    color: '#444',
  },
  userlogin: {
    fontSize: 24,
    marginBottom: 10,
    color: '#666',
  },
  userInfo: {
    color: '#444',
    paddingBottom: 10,
  },
  repositories: {
    marginTop: 20,
  },
});

const propTypes = {
  userId: PropTypes.string.isRequired,
  navigator: PropTypes.object,
};

const defaultProps = {
  navigator: undefined,
};

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };

    this.fetchUser = this.fetchUser.bind(this);
  }

  componentWillMount() {
    this.fetchUser(this.props.userId);
  }

  fetchUser(userId) {
    fetch(`https://api.github.com/users/${userId}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw new Error('We experienced an unknown issue');
      })
      .then(response => response.json())
      .then((results) => {
        this.setState({ user: results });
      });
  }

  render() {
    const {
      user,
    } = this.state;

    if (!user) {
      return <ActivityIndicator animating size="large" color="#0000ff" />;
    }

    return (
      <View style={[styles.profile, this.props.navigator && { marginTop: 40 }]}>
        <Image
          source={{ uri: user.avatar_url }}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userlogin}>{user.login}</Text>
        {user.bio && <Text style={styles.userInfo}>{user.bio}</Text>}
        {user.blog && <Text style={styles.userInfo}>Blog: {user.blog}</Text>}
        {user.company && <Text style={styles.userInfo}>Company: {user.company}</Text>}
        {user.location && <Text style={styles.userInfo}>Location: {user.location}</Text>}
        <Repositories style={styles.repositories} repos_url={user.repos_url} />
      </View>
    );
  }
}

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;
