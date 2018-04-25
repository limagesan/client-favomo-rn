import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';

import basicStyles, { Color } from '../styles';

import log, { sub } from '../utils/log';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor() {
    super();
    this.onPressButton = this.onPressButton.bind(this);
    this.state = {
      email: '',
      password: '',
    };

    this.onLogin = this.onLogin.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.handleFirebaseError = this.handleFirebaseError.bind(this);
  }

  onPressButton() {
    this.onLogin();
  }

  onLogin() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then((user) => {
        log(sub.firebase, 'logined', user);
      })
      .catch((error) => {
        const { code, message } = error;
        log(sub.firebase, 'error create user', { message, code });
        this.handleFirebaseError(code);
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

  handleFirebaseError(code) {
    switch (code) {
      case 'auth/invalid-email':
        this.setState({ emailValidationMsg: '正しいメールアドレスを入力してください' });
        break;
      case 'auth/user-disabled':
        this.setState({ emailValidationMsg: 'このメールアドレスは使用できません' });
        break;
      case 'auth/weak-password':
      case 'auth/wrong-password':
        this.setState({ passwordValidationMsg: '適切なパスワードを入力してください' });
        break;
      case 'auth/user-not-found':
        break;
      default:
        break;
    }
  }

  render() {
    const {
      email, password, emailValidationMsg, passwordValidationMsg,
    } = this.state;

    const { user } = this.props;

    let LoadingState = <Text>not logined</Text>;
    if (user) {
      if (user.emailVerified) {
        LoadingState = <Text>loading (verified)</Text>;
      } else {
        LoadingState = <Text>loading (not verified)</Text>;
      }
    }

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#FFF',
        }}
      >
        <View
          style={{
            width: 375,
            height: 44,
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{
              flex: 2,
              marginLeft: 20,
              alignSelf: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Ionicons name="ios-arrow-back" size={30} color="black" />;
          </TouchableOpacity>
          <View style={{ flex: 6, justifyContent: 'center' }}>
            <Text style={{ alignSelf: 'center', fontSize: 20 }}>ログイン</Text>
          </View>
          <View style={{ flex: 2, marginRight: 20, alignItems: 'flex-end' }} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            {LoadingState}
            {user && (
              <TouchableHighlight onPress={this.logout} underlayColor={Color.base}>
                <View style={basicStyles.button}>
                  <Text style={basicStyles.buttonText}>ログアウト</Text>
                </View>
              </TouchableHighlight>
            )}
            <TextInput
              onChangeText={value => this.setState({ email: value, emailValidationMsg: '' })}
              value={email}
              maxLength={40}
              keyboardType="default"
              style={{
                height: 40,
                width: 300,
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 20,
              }}
            />
            <Text style={{ fontSize: 12, marginTop: 5, color: 'red' }}>{emailValidationMsg}</Text>

            <TextInput
              onChangeText={value => this.setState({ password: value, passwordValidationMsg: '' })}
              value={password}
              maxLength={40}
              secureTextEntry
              style={{
                height: 40,
                width: 300,
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 20,
              }}
            />
            <Text style={{ fontSize: 12, marginTop: 5, color: 'red' }}>
              {passwordValidationMsg}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            <TouchableHighlight onPress={this.onPressButton} underlayColor={Color.base}>
              <View style={basicStyles.button}>
                <Text style={basicStyles.buttonText}>ログイン</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(LoginScreen);
