import React, { Component } from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Container } from '../components/Container';

import { clearIdToken, clearUser, logout } from '../actions';
import basicStyles, { Color } from '../styles';
import log, { sub } from '../utils/log';

class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddFriends');
        }}
        style={basicStyles.leftBarButtonContainer}
      >
        <Ionicons name="ios-person-add" size={30} color="black" />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          console.log('tap settings');
        }}
        style={basicStyles.rightBarButtonContainer}
      >
        <Ionicons name="ios-settings" size={30} color="black" />
      </TouchableOpacity>
    ),
  });

  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        log(sub.firebase, 'logout', res);
        this.props.dispatch(clearIdToken());
        this.props.dispatch(clearUser());
        this.props.dispatch(logout());
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
    const { user, idToken } = this.props;
    return (
      <Container>
        {user && (
          <View>
            <Text>ユーザー情報</Text>
            <Text>{user.email}</Text>
            <Text>{user.emailVerified ? 'メール認証済み' : 'メール未認証'}</Text>
          </View>
        )}
        {idToken && (
          <View>
            <TouchableHighlight
              onPress={this.logout}
              underlayColor={Color.white}
              style={basicStyles.button}
            >
              <View>
                <Text style={basicStyles.buttonText}>ログアウト</Text>
              </View>
            </TouchableHighlight>
          </View>
        )}
        {!idToken && <Text>ログインしていません</Text>}
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Profile);
