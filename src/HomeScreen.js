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
import Api from "./Api";

import basicStyles, { Color } from "./styles";

import { StackNavigator } from "react-navigation";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.api = new Api();
    this.state = { text: "" };

    this._onPressButton = this._onPressButton.bind(this);
  }

  static navigationOptions = {
    title: "Home"
  };

  _onPressButton() {
    Alert.alert("You tapped the button!");
    this.api.get().then(res => {
      console.log("result", res);
    });
    this.props.navigation.navigate("Post");
  }

  render() {
    return (
      <View style={basicStyles.container}>
        <Text style={basicStyles.title}>Favomo</Text>
        <View style={{ padding: 10 }}>
          <TouchableHighlight
            onPress={this._onPressButton}
            underlayColor={Color.base}
          >
            <View style={basicStyles.button}>
              <Text style={basicStyles.buttonText}>ログイン</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
