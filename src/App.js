import React, { Component } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from 'react-native-firebase';

import { updateUser } from './actions';
import RootStack from './config/route';

EStyleSheet.build({
  $white: '#FFFFFF',
});

class App extends Component {
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.props.dispatch(updateUser(user));
    });
    Linking.addEventListener('url', this.handleOpenURL);
  }
  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
  componentWillUnmount() {
    this.authSubscription();
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL(event) {
    console.log('DeepLink: ', event.url);
    const route = event.url.replace(/.*?:\/\//g, '');
    // do something with the url, in our case navigate(route)
  }

  render() {
    return <RootStack />;
  }
}

export default connect()(App);
