import React, { Component } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from 'react-native-firebase';

import { updateIdToken, updateUser } from './actions';
import { MainStack, AuthStack } from './config/route';

EStyleSheet.build({
  $white: '#FFFFFF',
  $base: '#FFFA73',
});

class App extends Component {
  componentDidMount() {
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
    if (this.props.idToken) {
      Stack = MainStack;
    }

    return <Stack />;
  }
}

const mapStateToProps = state => ({ idToken: state.idToken });

export default connect(mapStateToProps)(App);
