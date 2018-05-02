import React from 'react';
import { StyleSheet, View, NavigatorIOS, Platform } from 'react-native';
import Tabbar from 'react-native-tabbar-bottom';
import PropTypes from 'prop-types';

import Feed from './Feed';
import Search from './Search';
import Profile from './Profile';

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

const propTypes = {
  currentUserId: PropTypes.string.isRequired,
};

export default class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 'Profile',
    };
  }

  render() {
    const {
      currentTab,
    } = this.state;

    return (
      <View style={styles.container}>
        {
          currentTab === 'Feed' &&
          <View style={styles.wrapper}>
            {Platform.OS === 'ios' && <NavigatorIOS initialRoute={{ component: Feed, title: 'Feed' }} style={{ flex: 1 }} />}
            {Platform.OS !== 'ios' && <Feed />}
          </View>
        }
        {currentTab === 'Search' && <View style={styles.wrapper}><Search /></View>}
        {
          currentTab === 'Profile' &&
          <View style={styles.wrapper}><Profile userId={this.props.currentUserId} /></View>
        }
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

Container.propTypes = propTypes;
