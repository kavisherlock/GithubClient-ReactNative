import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Profile from './Profile';

const styles = StyleSheet.create({
  event: {
    marginTop: 40,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(240, 240, 240, 0.75)',
    borderColor: 'rgba(200, 200, 200, 0.75)',
    borderWidth: 1,
  },
  actorImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  userName: {
    color: 'skyblue',
    marginTop: 20,
    padding: 10,
    fontSize: 36,
  },
  action: {
    fontSize: 16,
    color: '#333',
  },
  repoName: {
    color: 'skyblue',
    padding: 10,
    fontSize: 24,
  },
});

const propTypes = {
  event: PropTypes.object.isRequired,
  navigator: PropTypes.object,
};

const defaultProps = {
  navigator: undefined,
};

const handleUsernamePress = (user, navigator) => {
  if (navigator) {
    navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: {
        userId: user,
      },
    });
  }
};

const EventDetails = (props) => {
  const {
    event,
  } = props;

  let { action } = event.payload;
  if (event.type === 'CreateEvent') {
    action = 'created';
  } else if (event.type === 'ForkEvent') {
    action = 'forked';
  } else if (event.type === 'PushEvent') {
    action = 'pushed to';
  } else if (action === 'started') {
    action = 'starred';
  }

  return (
    <View style={styles.event}>
      <Image
        source={{ uri: event.actor.avatar_url }}
        style={styles.actorImage}
      />
      <TouchableOpacity onPress={() => handleUsernamePress(event.actor.login, props.navigator)}>
        <Text style={styles.userName}>{event.actor.login}</Text>
      </TouchableOpacity>
      <Text style={styles.action}>{action}</Text>
      <Text style={styles.repoName}>{event.repo.name}</Text>
    </View>
  );
};

EventDetails.propTypes = propTypes;
EventDetails.defaultProps = defaultProps;
export default EventDetails;
