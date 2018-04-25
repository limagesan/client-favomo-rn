import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import basicStyles, { Color } from '../styles';
import log, { sub } from '../utils/log';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

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
      <View style={basicStyles.container}>
        <Text>
          {this.props.user && (
            <View>
              <Text>{this.props.user.email}</Text>
              <TouchableHighlight onPress={this.logout} underlayColor={Color.base}>
                <View style={basicStyles.button}>
                  <Text style={basicStyles.buttonText}>ログアウト</Text>
                </View>
              </TouchableHighlight>
            </View>
          )}
          {!this.props.user && <Text>ログインしていません</Text>}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(ProfileScreen);
