import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight, TouchableOpacity, Button } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { NavigationActions } from 'react-navigation';

import basicStyles, { Color } from '../styles';

import log from '../utils/log';

const sub = {
  firebase: 'Firebase',
};

function getMessage(code) {}

class SignUpScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor() {
    super();
    this.onPressButton = this.onPressButton.bind(this);
    this.state = {
      email: '',
      password: '',
      password2: '',
      emailValidationMsg: '',
      passwordValidationMsg: '',
      loading: true,
    };

    this.onRegister = this.onRegister.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.handleFirebaseError = this.handleFirebaseError.bind(this);
  }

  componentDidMount() {
    console.log('check store', this.props);

    // this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
    //   const action = {
    //     type: 'UPDATE_USER',
    //     user,
    //   };

    //   this.props.dispatch(action);
    //   this.setState({
    //     loading: false,
    //     user,
    //   });
    // });
  }

  componentWillUnmount() {
    // this.authSubscription();
  }

  onPressButton() {
    console.log('press');
    this.onRegister();
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
        log(sub.firebase, 'error create user', { message, code });
        this.handleFirebaseError(code);

        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
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

  handleChange = (e) => {
    console.log('handleChage', e);
  };

  render() {
    const {
      email,
      password,
      password2,
      loading,
      emailValidationMsg,
      passwordValidationMsg,
    } = this.state;

    const { user, navigation } = this.props;

    console.log('check in render', this.props);

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
            <Text style={{ alignSelf: 'center', fontSize: 20 }}>サインアップ</Text>
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
              placeholder="メールアドレス"
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
              placeholder="パスワード"
              style={{
                height: 40,
                width: 300,
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 20,
              }}
            />
            <TextInput
              onChangeText={value => this.setState({ password2: value, passwordValidationMsg: '' })}
              value={password2}
              maxLength={40}
              secureTextEntry
              placeholder="パスワード(確認用)"
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
                <Text style={basicStyles.buttonText}>サインアップ</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(SignUpScreen);
