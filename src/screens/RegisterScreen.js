import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";

import basicStyles, { Color } from "../styles";

import { StackNavigator } from "react-navigation";

import firebase from "react-native-firebase";

export default class RegisterScreen extends Component {
  constructor() {
    super();
    this._onPressButton = this._onPressButton.bind(this);
    this.state = {
      email: "",
      password: "",
      loading: true
    };

    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  static navigationOptions = {
    title: "Register"
  };

  _onPressButton() {
    this.onRegister();
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(res => {
        console.log("Firebase: signOut", res);
      });
  }

  onLogin() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch(error => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }

  onRegister() {
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(user => {
        console.log("create user", user);
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch(error => {
        const { code, message } = error;

        console.log("Error: create user", message);

        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }

  verifyEmail() {
    if (!this.state.user) {
      return;
    }

    this.state.user
      .sendEmailVerification({
        iOS: {
          bundleId: "com.limage.clientfavomorn"
        },
        url: "favomoapp://"
      })
      .then(res => {
        console.log("Send Email", res);
      });
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loading: false,
        user
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    const { email, password, user, loading } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={basicStyles.container}>
          <Text style={{ fontSize: 30, marginBottom: 20 }}>ユーザー登録</Text>
          {loading ? <Text>loading</Text> : <Text>didload</Text>}
          {user ? user.emailVerified ? (
            <Text>logined (verified)</Text>
          ) : (
            <Text>logined (not verified)</Text>
          ) : (
            <Text>not logined</Text>
          )}
          {user &&
          !user.emailVerified && (
            <TouchableHighlight
              onPress={this.verifyEmail}
              underlayColor={Color.base}
            >
              <View style={basicStyles.button}>
                <Text style={basicStyles.buttonText}>確認メールを送信</Text>
              </View>
            </TouchableHighlight>
          )}
          {user && (
            <TouchableHighlight
              onPress={this.logout}
              underlayColor={Color.base}
            >
              <View style={basicStyles.button}>
                <Text style={basicStyles.buttonText}>ログアウト</Text>
              </View>
            </TouchableHighlight>
          )}
          <TextInput
            style={{
              height: 40,
              width: 300,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20
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
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20
            }}
            onChangeText={password => this.setState({ password })}
            value={password}
            maxLength={40}
            secureTextEntry={true}
          />
          <TouchableHighlight
            onPress={this._onPressButton}
            underlayColor={Color.base}
          >
            <View style={basicStyles.button}>
              <Text style={basicStyles.buttonText}>登録</Text>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
