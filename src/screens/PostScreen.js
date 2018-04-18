import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Button,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

import basicStyles, { Color } from "../styles";
import Ionicons from "react-native-vector-icons/Ionicons";

import { StackNavigator } from "react-navigation";

export default class PostScreen extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{ alignSelf: "flex-start", marginTop: 30, marginLeft: 30 }}
        >
          <Ionicons name="ios-close" size={30} color="black" />;
        </TouchableOpacity>
        <Text>シェア</Text>
      </View>
    );
  }
}
