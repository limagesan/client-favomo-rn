import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Alert, Button } from "react-native";
import Api from "./Api";

export default class App extends Component {
  constructor() {
    super();
    this.api = new Api();
    this.state = { text: "" };

    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton() {
    Alert.alert("You tapped the button!");
    this.api.get().then(res => {
      console.log("result", res);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Favomo</Text>
        <View style={{ padding: 10 }}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Type here to translate!"
            onChangeText={text => this.setState({ text })}
          />
          <Text style={{ padding: 10, fontSize: 42 }}>
            {this.state.text
              .split(" ")
              .map(word => word && "🍕")
              .join(" ")}
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button onPress={this._onPressButton} title="Press Me" />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this._onPressButton}
              title="Press Me"
              color="#841584"
            />
          </View>
          <View style={styles.alternativeLayoutButtonContainer}>
            <Button onPress={this._onPressButton} title="This looks great!" />
            <Button onPress={this._onPressButton} title="OK!" color="#841584" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFA73",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 80
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
