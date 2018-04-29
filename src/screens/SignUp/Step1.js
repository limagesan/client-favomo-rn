import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { updateSignUpEmail, updateSignUpPassword, updateSignUpPassword2 } from '../../actions';
import Loader from '../../components/Loader';

import basicStyles, { Color } from '../../styles';
import log, { sub } from '../../utils/log';

import { Container } from '../../components/Container';

class Step1 extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  state = {
    emailValidationMsg: '',
    passwordValidationMsg: '',
    password2ValidationMsg: '',
    loading: false,
  };

  onRegister = () => {
    this.setState({ loading: true });
    const { signUpEmail, signUpPassword } = this.props;
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(signUpEmail, signUpPassword)
      .then((user) => {
        log(sub.firebase, 'create user', user);
        this.setState({ loading: false });
        this.props.navigation.navigate('Step2');
      })
      .catch((error) => {
        this.setState({ loading: false });

        const { code, message } = error;
        log(sub.firebase, 'error create user', { message, code });
        this.handleFirebaseError(code);
      });
  };

  onPressButton = () => {
    // if (this.validate()) {
    //   this.onRegister();
    // }
    this.props.navigation.navigate('Step2');
  };

  handleFirebaseError = (code) => {
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
  };

  validate = () => {
    this.setState({
      emailValidationMsg: '',
      passwordValidationMsg: '',
      password2ValidationMsg: '',
    });
    const { signUpEmail, signUpPassword, signUpPassword2 } = this.props;

    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!signUpEmail.match(mailformat)) {
      this.setState({ emailValidationMsg: '正しいメールアドレスを入力してください' });
      return false;
    }

    if (signUpPassword !== signUpPassword2) {
      this.setState({ password2ValidationMsg: 'パスワードが一致しません' });
      return false;
    }

    if (signUpPassword.length < 6) {
      this.setState({ passwordValidationMsg: 'パスワードが短すぎます' });
      return false;
    }

    return true;
  };

  render() {
    const { emailValidationMsg, passwordValidationMsg, password2ValidationMsg } = this.state;

    const { signUpEmail, signUpPassword, signUpPassword2 } = this.props;

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
              this.props.navigation.dispatch(NavigationActions.back());
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
            <TextInput
              onChangeText={(value) => {
                this.props.dispatch(updateSignUpEmail(value));
                this.setState({ emailValidationMsg: '' });
              }}
              value={signUpEmail}
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
              onChangeText={(value) => {
                this.props.dispatch(updateSignUpPassword(value));
                this.setState({ passwordValidationMsg: '' });
              }}
              value={signUpPassword}
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
            <TextInput
              onChangeText={(value) => {
                this.props.dispatch(updateSignUpPassword2(value));
                this.setState({ password2ValidationMsg: '' });
              }}
              value={signUpPassword2}
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
              {password2ValidationMsg}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            <TouchableHighlight
              onPress={this.onPressButton}
              underlayColor={Color.white}
              style={basicStyles.button}
            >
              <View>
                <Text style={basicStyles.buttonText}>サインアップ</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Step1);
