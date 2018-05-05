import React, { Component } from 'react';
import { Linking, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from 'react-native-firebase';

import { updateIdToken, updateUser, login, logout } from './actions';
import { MainStack, AuthStack } from './config/route';

EStyleSheet.build({
  $white: '#FFFFFF',
  $base: '#FFFA73',
});

class App extends Component {
  constructor(props) {
    super();
    AsyncStorage.getItem('logined').then((logined) => {
      if (logined) {
        props.dispatch(login());
      }
    });
  }

  componentDidMount() {
    // this.props.dispatch(logout());

    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.props.dispatch(updateUser(user));
      if (user) {
        user.getIdToken(/* fourceRefresh */ true).then((idToken) => {
          this.props.dispatch(updateIdToken(idToken));
        });
      }
    });
    Linking.addEventListener('url', this.handleOpenURL);
  }

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
    let Stack = AuthStack;
    if (this.props.logined) {
      Stack = MainStack;
    }

    return <Stack />;
  }
}

const mapStateToProps = state => ({ logined: state.logined });

export default connect(mapStateToProps)(App);
