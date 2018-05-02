import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, Image, TouchableHighlight, Platform } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import AuthService from './AuthService';
import EventDetails from './EventDetails';

const styles = StyleSheet.create({
  feed: {
    marginTop: 40,
    marginBottom: 40,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(240, 240, 240, 0.75)',
    borderColor: 'rgba(200, 200, 200, 0.75)',
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

const propTypes = {
  navigator: PropTypes.object,
};

const defaultProps = {
  navigator: undefined,
};

export default class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedItems: [],
      manualDetailsRender: false,
    };

    this.fetchFeed = this.fetchFeed.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.handleRowPress = this.handleRowPress.bind(this);
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
            feedItems: results.map((item, index) => {
              const newItem = Object.assign({}, item);
              newItem.key = index.toString();
              return newItem;
            }),
          });
        });
    });
  }

  handleRowPress(rowData) {
    const {
      navigator,
    } = this.props;

    if (navigator) {
      navigator.push({
        title: 'Details',
        component: EventDetails,
        passProps: {
          event: rowData,
        },
      });
    } else {
      this.setState({ manualDetailsRender: true, rowDetailsItem: rowData });
    }
  }

  renderRow(rowItem) {
    let { action } = rowItem.payload;
    if (rowItem.type === 'CreateEvent') {
      action = 'created';
    } else if (rowItem.type === 'ForkEvent') {
      action = 'forked';
    } else if (rowItem.type === 'PushEvent') {
      action = 'pushed to';
    } else if (action === 'started') {
      action = 'starred';
    }

    return (
      <TouchableHighlight onPress={() => this.handleRowPress(rowItem)}>
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
      </TouchableHighlight>
    );
  }

  render() {
    const {
      feedItems,
      manualDetailsRender,
      rowDetailsItem,
    } = this.state;

    if (feedItems.length < 1) {
      return <ActivityIndicator animating size="large" color="#0000ff" />;
    }

    if (manualDetailsRender && rowDetailsItem) {
      return <EventDetails event={rowDetailsItem} />;
    }

    return (
      <View>
        <FlatList
          data={feedItems}
          renderItem={({ item }) => this.renderRow(item)}
          style={Platform.OS === 'ios' && styles.feed}
        />
      </View>
    );
  }
}

Feed.propTypes = propTypes;
Feed.defaultProps = defaultProps;
