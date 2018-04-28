import React, { Component } from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Container } from '../components/Container';

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
      });
  }

  render() {
    return (
      <Container>
        <Text>
          {this.props.user && (
            <View>
              <Text>{this.props.user.email}</Text>
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
          {!this.props.user && <Text>ログインしていません</Text>}
        </Text>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Profile);
