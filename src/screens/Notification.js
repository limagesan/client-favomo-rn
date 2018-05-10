import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import basicStyles from '../styles';

export default class Notification extends Component {
  static navigationOptions = {
    title: 'Notification',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={basicStyles.container}>
        <Text>Post</Text>
      </ScrollView>
    );
  }
}
