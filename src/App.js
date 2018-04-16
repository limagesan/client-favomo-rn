import React, { Component } from "react";
import { Linking, View, Text, Button } from "react-native";

import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";

import { Color } from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  MyboxScreen,
  PostScreen,
  FeedScreen,
  LoginScreen,
  RegisterScreen,
  NotificationScreen,
  ProfileScreen
} from "./screens";

import TestScreen from "./screens/TestScreen";

import firebase from "react-native-firebase";
import { log } from "./utils";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null 
   * (logged out) or an Object (logged in)
   */
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loading: false,
        user
      });
    });
    Linking.addEventListener("url", this.handleOpenURL);
  }
  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
  componentWillUnmount() {
    this.authSubscription();
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  handleOpenURL(event) {
    console.log("DeepLink: ", event.url);
    const route = e.url.replace(/.*?:\/\//g, "");
    // do something with the url, in our case navigate(route)
  }

  render() {
    return <RootStack />;
  }
}

class ModalScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

const FeedStack = StackNavigator({
  Feed: {
    screen: FeedScreen
  }
});

const MyboxStack = StackNavigator({
  Mybox: {
    screen: MyboxScreen
  }
});

const NotificationStack = StackNavigator({
  Notification: {
    screen: NotificationScreen
  }
});

const ProfileStack = StackNavigator({
  Profile: {
    screen: ProfileScreen
  }
});


const TabNav = TabNavigator(
  {
    Feed: { screen: FeedStack },
    Mybox: { screen: MyboxStack },
    Post: { screen: FeedStack },
    Notification: { screen: NotificationStack },
    Profile: { screen: ProfileStack }
  },
  {
    tabBarComponent: ({ jumpToIndex, ...props, navigation }) => (
      <TabBarBottom
        {...props}
        jumpToIndex={index => {
          if (index === 2) {
              navigation.navigate('MyModal')
          }
          else {
              jumpToIndex(index)
          }
        }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Mybox") {
          iconName = `ios-filing${focused ? "" : "-outline"}`;
        } else if (routeName === "Feed") {
          iconName = `ios-list${focused ? "" : "-outline"}`;
        } else if (routeName === "Profile") {
          iconName = `ios-person${focused ? "" : "-outline"}`;
        } else if (routeName === "Notification") {
          iconName = `ios-notifications${focused ? "" : "-outline"}`;
        } else if (routeName === "Post") {
          iconName = `ios-add-circle-outline`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "orange",
      inactiveTintColor: "gray"
    },
    animationEnabled: false,
    swipeEnabled: false
  }
);

const RootStack = StackNavigator({
    TabNav: { screen: TabNav },
    MyModal: { screen: ModalScreen }, 
    Login: { screen: LoginScreen }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);