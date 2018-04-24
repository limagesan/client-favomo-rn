import React, { Component } from 'react';
import { Linking } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import RootStack from './config/route';

EStyleSheet.build({
  $white: '#FFFFFF',
});

export default class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     loading: true,
  //   };
  // }

  /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null
   * (logged out) or an Object (logged in)
   */
  componentDidMount() {
    // this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
    //   this.setState({
    //     loading: false,
    //     user,
    //   });
    // });
    Linking.addEventListener('url', this.handleOpenURL);
  }
  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
  componentWillUnmount() {
    // this.authSubscription();
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
