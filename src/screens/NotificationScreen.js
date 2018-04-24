import React, { Component } from 'react';
import { Text, View } from 'react-native';

import basicStyles from '../styles';

export default class NotificationScreen extends Component {
  constructor() {
    super();
  }

  static navigationOptions = {
    title: 'Notification',
  };

  render() {
    return (
      <View style={basicStyles.container}>
        <Text style={basicStyles.title}>Post</Text>
      </View>
    );
  }
}
