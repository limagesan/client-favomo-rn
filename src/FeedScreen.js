import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Button,
  TouchableHighlight
} from "react-native";

import basicStyles, { Color } from "./styles";

import { StackNavigator } from "react-navigation";

export default class FeedScreen extends Component {
  constructor() {
    super();
    this._onPressButton = this._onPressButton.bind(this);
  }

  static navigationOptions = {
    title: "Feed"
  };

  _onPressButton() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={basicStyles.container}>
        <Text style={basicStyles.title}>Feed</Text>
      </View>
    );
  }
}
