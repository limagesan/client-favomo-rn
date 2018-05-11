import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

import { clearIdToken, clearUser, logout } from '../actions';

import { MidiumButton } from '../components/Button';
import log, { sub } from '../utils/log';

class Settings extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        log(sub.firebase, 'logout', res);
        this.props.dispatch(clearIdToken());
        this.props.dispatch(clearUser());
        this.props.dispatch(logout());
      });
  };
  render() {
    return (
      <View>
        <Text>Setting</Text>
        <FlatList
          data={[{ key: 'a' }, { key: 'b' }]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
          ItemSeparatorComponent={() => (
            <View
              style={{ width: 100, height: StyleSheet.hairlineWidth, backgroundColor: 'black' }}
            />
          )}
        />
        <MidiumButton onPress={this.logout} value="ログアウト" />
      </View>
    );
  }
}

export default Settings;
