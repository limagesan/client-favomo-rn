import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { MidiumButton } from '../components/Button';
import Container from '../components/Container';
import Loader from '../components/Loader';
import { BaseTextInput } from '../components/TextInput';

import { updateLoginEmail, updateLoginPassword, login } from '../actions';
import log, { sub } from '../utils/log';

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  state = {
    emailValidationMsg: '',
    passwordValidationMsg: '',
    loading: false,
  };

  onPressButton = () => {
    if (this.validate()) {
      this.onLogin();
    }
  };

  onLogin = () => {
    this.setState({ loading: true });
    const { loginEmail, loginPassword } = this.props;
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(loginEmail, loginPassword)
      .then((user) => {
        this.setState({ loading: false });
        this.props.dispatch(login());

        log(sub.firebase, 'logined', user);
      })
      .catch((error) => {
        this.setState({ loading: false });

        const { code, message } = error;
        log(sub.firebase, 'error create user', { message, code });
        this.handleFirebaseError(code);
      });
  };

  handleFirebaseError = (code) => {
    switch (code) {
      case 'auth/user-disabled':
        this.setState({ emailValidationMsg: 'このアカウントは使用できません' });
        break;
      default:
        this.setState({ emailValidationMsg: 'メールアドレスまたはパスワードが間違っています' });
        break;
    }
  };

  validate = () => {
    this.setState({
      emailValidationMsg: '',
      passwordValidationMsg: '',
    });
    const { loginEmail, loginPassword } = this.props;

    if (!loginEmail.length) {
      this.setState({ emailValidationMsg: 'メールアドレスを入力してください' });
      return false;
    }

    if (!loginPassword.length) {
      this.setState({ passwordValidationMsg: 'パスワードを入力してください' });
      return false;
    }

    return true;
  };

  render() {
    const { emailValidationMsg, passwordValidationMsg } = this.state;

    const { loginEmail, loginPassword } = this.props;

    return (
      <Container>
        <Loader loading={this.state.loading} />

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
            <BaseTextInput
              onChangeText={(value) => {
                this.props.dispatch(updateLoginEmail(value));
                this.setState({ emailValidationMsg: '' });
              }}
              value={loginEmail}
              maxLength={40}
              keyboardType="default"
              placeholder="メールアドレス"
              style={{
                height: 40,
                width: 300,
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 20,
              }}
            />
            <Text style={{ fontSize: 12, marginTop: 5, color: 'red' }}>{emailValidationMsg}</Text>
            <BaseTextInput
              onChangeText={(value) => {
                this.props.dispatch(updateLoginPassword(value));
                this.setState({ passwordValidationMsg: '' });
              }}
              value={loginPassword}
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
            <Text style={{ fontSize: 12, marginTop: 5, color: 'red' }}>
              {passwordValidationMsg}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            <MidiumButton onPress={this.onPressButton} value="ログイン" />
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Login);
