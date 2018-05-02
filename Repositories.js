import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderColor: 'rgba(200, 200, 200, 0.75)',
    borderWidth: 1,
  },
  resultItem: {
    fontWeight: 'bold',
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  stats: {
    flex: 1,
    color: 'rgba(150, 150, 150, 0.75)',
  },
});

const renderRow = rowItem => (
  <View style={styles.row}>
    <Text style={styles.resultItem}>{rowItem.full_name} </Text>
    <View style={styles.resultStats}>
      <Text style={styles.stats}>{rowItem.stargazers_count} stars</Text>
      <Text style={styles.stats}>{rowItem.forks} forks</Text>
      <Text style={styles.stats}>{rowItem.open_issues} open issues</Text>
    </View>
  </View>
);

const propTypes = {
  repos_url: PropTypes.string.isRequired,
};

export default class Repositories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
    };
  }

  componentWillMount() {
    this.fetchRepos();
  }

  fetchRepos() {
    fetch(this.props.repos_url)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw new Error('We experienced an unknown issue');
      })
      .then(response => response.json())
      .then((results) => {
        this.setState({
          repos: results.map((item, index) => {
            const newItem = Object.assign({}, item);
            newItem.key = index.toString();
            return newItem;
          }),
        });
      });
  }

  render() {
    const {
      repos,
    } = this.state;

    if (!repos) {
      return <ActivityIndicator animating size="large" color="#0000ff" />;
    }

    return (
      <View style={styles.repositories}>
        <FlatList
          data={repos}
          renderItem={({ item }) => renderRow(item)}
        />
      </View>
    );
  }
}

Repositories.propTypes = propTypes;
