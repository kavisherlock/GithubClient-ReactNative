import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Tabbar from 'react-native-tabbar-bottom';

import Feed from './Feed';
import Search from './Search';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eff',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    paddingTop: 40,
  },
});

export default class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 'Feed',
    };
  }

  render() {
    const {
      currentTab,
    } = this.state;

    return (
      <View style={styles.container}>
        {currentTab === 'Feed' && <View style={styles.wrapper}><Feed /></View>}
        {currentTab === 'Search' && <View style={styles.wrapper}><Search /></View>}
        {currentTab === 'Profile' && <View style={styles.wrapper}><Text>Profile</Text></View>}
        <Tabbar
          selectedIconColor="skyblue"
          stateFunc={(tab) => {
            this.setState({ currentTab: tab.page });
          }}
          activePage={currentTab}
          tabs={[
            {
              page: 'Feed',
              icon: 'home',
            },
            {
              page: 'Search',
              icon: 'search',
            },
            {
              page: 'Profile',
              icon: 'person',
            },
          ]}
        />
      </View>
    );
  }
}
