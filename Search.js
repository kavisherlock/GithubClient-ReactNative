import React, { Component } from 'react';
import { AppRegistry, View, TextInput, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const styles = StyleSheet.create({
  search: {
    flex: 1,
  },
  searchBar: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    padding: 10,
  },
  row: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(240, 240, 240, 0.75)',
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

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      searchResults: [],
    };

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch() {
    fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(this.state.searchString)}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw new Error('We experienced an unknown issue');
      })
      .then(response => response.json())
      .then((results) => {
        this.setState({
          searchResults: results.items.map((item, index) => {
            const newItem = Object.assign({}, item);
            newItem.key = index.toString();
            return newItem;
          }),
        });
      });
  }

  render() {
    return (
      <View style={styles.search}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            value={this.state.searchString}
            onChangeText={text => this.setState({ searchString: text })}
            placeholder="Enter Repository Name..."
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.onSearch}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.searchResults}
          renderItem={({ item }) => renderRow(item)}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
