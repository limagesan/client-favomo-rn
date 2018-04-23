import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';

import basicStyles, { Color } from '../styles';

import log from '../utils/log';

const sub = {
  firebase: 'Firebase',
};

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor() {
    super();
    this.onPressButton = this.onPressButton.bind(this);
    this.state = {
      email: '',
      password: '',
      loading: true,
    };

    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  onPressButton() {
    this.onLogin();
  }

  onRegister() {
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then((user) => {
        log(sub.firebase, 'create user', user);
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error;
        log(sub.firebase, 'error create user', message);

        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }

  onLogin() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('Firebasecreate user', user);

        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        console.log('Firebase: signOut', res);
      });
  }

  verifyEmail() {
    if (!this.state.user) {
      return;
    }

    this.state.user
      .sendEmailVerification({
        iOS: {
          bundleId: 'com.limage.clientfavomorn',
        },
        url: 'favomoapp://',
      })
      .then((res) => {
        log(sub.firebase, 'send email', res);
      });
  }

  render() {
    const {
      email, password, user, loading,
    } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={basicStyles.container}>
          <Text style={{ fontSize: 30, marginBottom: 20 }}>ログイン</Text>
          {loading ? <Text>loading</Text> : <Text>didload</Text>}
          {user ? user.emailVerified ? (
            <Text>logined (verified)</Text>
          ) : (
            <Text>logined (not verified)</Text>
          ) : (
            <Text>not logined</Text>
          )}
          {user && (
            <TouchableHighlight onPress={this.logout} underlayColor={Color.base}>
              <View style={basicStyles.button}>
                <Text style={basicStyles.buttonText}>ログアウト</Text>
              </View>
            </TouchableHighlight>
          )}
          <TextInput
            style={{
              height: 40,
              width: 300,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 20,
            }}
            onChangeText={email => this.setState({ email })}
            value={email}
            maxLength={40}
            keyboardType="default"
          />

          <TextInput
            style={{
              height: 40,
              width: 300,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 20,
            }}
            onChangeText={password => this.setState({ password })}
            value={password}
            maxLength={40}
            secureTextEntry
          />
          <TouchableHighlight onPress={this.onPressButton} underlayColor={Color.base}>
            <View style={basicStyles.button}>
              <Text style={basicStyles.buttonText}>ログイン</Text>
            </View>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
