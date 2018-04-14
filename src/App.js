import React, { Component } from "react";

import { StackNavigator } from "react-navigation";

import { Color } from "./styles";

import HomeScreen from "./HomeScreen";
import PostScreen from "./PostScreen";

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Post: {
      screen: PostScreen
    }
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {
        backgroundColor: Color.base
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
