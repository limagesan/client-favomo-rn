import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';


import Ionicons from 'react-native-vector-icons/Ionicons';

import { BaseTextInput } from '../components/TextInput';
import { Container } from '../components/Container';


import basicStyles, { Color } from '../styles';

import log from '../utils/log';

const sub = {
  firebase: 'Firebase',
};

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
      loading: true,
    };

    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  componentDidMount() {
    console.log('check store', this.props);

    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      const action = {
        type: 'UPDATE_USER',
        user,
      };

      this.props.dispatch(action);
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
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then((user) => {
        log(sub.firebase, 'login', user);
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
      email, password, loading,
    } = this.state;

    const {
      user,
    } = this.props;

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
          padding: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{ alignSelf: 'flex-start', marginTop: 30, marginLeft: 30 }}
        >
          <Ionicons name="ios-close" size={30} color="black" />;
        </TouchableOpacity>
        <Text style={{ marginTop: 40, fontSize: 30, marginBottom: 20 }}>サインイン</Text>
        {LoadingState}
        {user && (
          <TouchableHighlight onPress={this.logout} underlayColor={Color.base}>
            <View style={basicStyles.button}>
              <Text style={basicStyles.buttonText}>ログアウト</Text>
            </View>
          </TouchableHighlight>
        )}
        <TextInput
          onChangeText={value => this.setState({ email: value })}
          value={email}
          maxLength={40}
          keyboardType="default"
          style={{
            height: 40,
            width: 300,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 20,
          }}
        />
        <TextInput
          onChangeText={value => this.setState({ password: value })}
          value={password}
          maxLength={40}
          secureTextEntry
          style={{
            height: 40,
            width: 300,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 20,
          }}
        />
        <TouchableHighlight onPress={this.onPressButton} underlayColor={Color.base}>
          <View style={basicStyles.button}>
            <Text style={basicStyles.buttonText}>ログイン</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });


export default connect(mapStateToProps)(LoginScreen);
