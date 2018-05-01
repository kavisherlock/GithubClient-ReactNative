import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import moment from 'moment';

import AuthService from './AuthService';

const styles = StyleSheet.create({
  feed: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderColor: '#222',
    borderWidth: 1,
  },
  rowImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  itemInfo: {
    flex: 1,
  },
  itemText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  createdAt: {
    color: '#aaa',
  },
  userName: {
    fontSize: 18,
  },
  action: {
    color: '#333',
  },
  repoName: {
    fontSize: 16,
  },
});

const renderRow = (rowItem) => {
  let { action } = rowItem.payload;
  if (rowItem.type === 'CreateEvent') {
    action = 'created';
  } if (rowItem.type === 'ForkEvent') {
    action = 'forked';
  } else if (action === 'started') {
    action = 'starred';
  }

  return (
    <View style={styles.row}>
      <Image
        source={{ uri: rowItem.actor.avatar_url }}
        style={styles.rowImage}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.createdAt}>{moment(rowItem.created_at).fromNow()}</Text>
        <View style={styles.itemText}>
          <Text style={styles.userName}>{rowItem.actor.login} </Text>
          <Text style={styles.action}>{action} </Text>
        </View>
        <Text style={styles.repoName}>{rowItem.repo.name} </Text>
      </View>
    </View>
  );
};

export default class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };

    this.fetchFeed = this.fetchFeed.bind(this);
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    AuthService.getAuthInfo((err, authInfo) => {
      let url;
      if (authInfo) {
        url = `https://api.github.com/users/${authInfo.user.login}/received_events`;
      }

      fetch(url, {
        headers: authInfo.headers,
      })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response;
          }
          throw new Error('We experienced an unknown issue');
        })
        .then(response => response.json())
        .then((results) => {
          this.setState({
            dataSource: results.map((item, index) => {
              const newItem = Object.assign({}, item);
              newItem.key = index.toString();
              return newItem;
            }),
          });
        });
    });
  }

  render() {
    const {
      dataSource,
    } = this.state;

    if (dataSource.length < 1) {
      return <ActivityIndicator animating size="large" color="#0000ff" />;
    }

    return (
      <View>
        <FlatList
          data={dataSource}
          renderItem={({ item }) => renderRow(item)}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('Feed', () => Feed);
