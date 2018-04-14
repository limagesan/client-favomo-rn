import React, { Component } from "react";

import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";

import { Color } from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./HomeScreen";
import PostScreen from "./PostScreen";
import FeedScreen from "./FeedScreen";

// export default class App extends Component {
//   render() {
//     return <RootTab />;
//   }
// }

const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Post: {
    screen: PostScreen
  }
});

const FeedStack = StackNavigator({
  Feed: {
    screen: FeedScreen
  }
});

export default TabNavigator(
  {
    Home: { screen: HomeStack },
    Feed: { screen: FeedStack }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-information-circle${focused ? "" : "-outline"}`;
        } else if (routeName === "Settings") {
          iconName = `ios-options${focused ? "" : "-outline"}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    },
    animationEnabled: false,
    swipeEnabled: false
  }
);
