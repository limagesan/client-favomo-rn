import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";

import basicStyles, { Color } from "../styles";

import { StackNavigator } from "react-navigation";

import SafariView from "react-native-safari-view";
// var SafariView = require("react-native-safari-view");

const items = [
  { id: 1, title: "kimu" },
  { id: 2, title: "kimu" },
  { id: 3, title: "kimu" },
  { id: 4, title: "kimu" },
  { id: 5, title: "kimu" },
  { id: 6, title: "kimu" },
  { id: 7, title: "kimu" },
  { id: 8, title: "kimu" },
  { id: 9, title: "kimu" }
];

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
        <MultiSelectList data={items} />
      </View>
    );
  }
}

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
      <View style={{ borderTopWidth: 1, padding: 10, height: 140 }}>
        <TouchableOpacity onPress={this._onPress}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 4 }}>
              <Image
                style={{ width: 94, height: 94, borderRadius: 10 }}
                source={require("../assets/bruno.png")}
              />
            </View>
            <View style={{ paddingLeft: 10, flex: 11 }}>
              <View
                style={{
                  flexDirection: "row",
                  overflow: "hidden",
                  alignItems: "center"
                }}
                removeClippedSubviews={true}
              >
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require("../assets/spotify.png")}
                />
                <Text
                  style={{ flex: 1, marginLeft: 5, fontSize: 13 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  https://open.spotify.com/track/3Vo4wInECJQuz9BIBMOu8i?si=AV6Nzqj3T321tPm43iLdfw
                </Text>
              </View>
              <Text style={{ marginTop: 7, fontSize: 15, fontWeight: "bold" }}>
                finesse(Remix) [feat. Cardi B]
              </Text>
              <Text style={{ fontSize: 11 }}>
                Finesse (Remix) [feat. Cardi B], an album by Bruno Mars, Cardi B
                on Spotify
              </Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Image
                  style={{ width: 35, height: 35, borderRadius: 17.5 }}
                  source={require("../assets/moriyama.jpg")}
                />
                <View
                  style={{
                    paddingTop: 11.5,
                    marginLeft: 10,
                    flexDirection: "row",
                    flex: 1
                  }}
                >
                  <View style={{ flex: 4 }}>
                    <Text style={{ fontSize: 10 }}>limagesan</Text>
                    <Text style={{ marginTop: 5 }}>"かっこいい"</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    paddingRight: 10
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      console.log("liked");
                    }}
                  >
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require("../assets/thumbs-up.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      console.log("smiled");
                    }}
                  >
                    <Image
                      style={{ marginLeft: 10, width: 25, height: 25 }}
                      source={require("../assets/happiness.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class MultiSelectList extends React.PureComponent {
  state = { selected: new Map() };

  _keyExtractor = (item, index) => item.id;

  _onPressItem = id => {
    // updater functions are preferred for transactional updates
    SafariView.isAvailable()
      .then(
        SafariView.show({
          url:
            "https://open.spotify.com/track/3Vo4wInECJQuz9BIBMOu8i?si=AV6Nzqj3T321tPm43iLdfw"
        })
      )
      .catch(error => {
        // Fallback WebView code for iOS 8 and earlier
      });
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _renderItem = ({ item }) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        style={{ width: 375 }}
      />
    );
  }
}
