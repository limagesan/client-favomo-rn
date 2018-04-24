import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

import DismissableStackNavigator from '../components/DismissableStackNavigator';

import {
  MyboxScreen,
  PostScreen,
  FeedScreen,
  LoginScreen,
  SignUpScreen,
  NotificationScreen,
  ProfileScreen,
} from '../screens';

const FeedStack = StackNavigator({
  Feed: {
    screen: FeedScreen,
  },
});

const MyboxStack = StackNavigator({
  Mybox: {
    screen: MyboxScreen,
  },
});

const NotificationStack = StackNavigator({
  Notification: {
    screen: NotificationScreen,
  },
});

const ProfileStack = StackNavigator({
  Profile: {
    screen: ProfileScreen,
  },
});

const AuthStack = DismissableStackNavigator({
  SignUp: {
    screen: SignUpScreen,
  },

  Login: { screen: LoginScreen },
});

const TabNav = TabNavigator(
  {
    Feed: { screen: FeedStack },
    Mybox: { screen: MyboxStack },
    Post: { screen: FeedStack },
    Notification: { screen: NotificationStack },
    Profile: { screen: ProfileStack },
  },
  {
    tabBarComponent: (props) => {
      const { jumpToIndex, navigation } = props;

      return (
        <TabBarBottom
          {...props}
          jumpToIndex={(index) => {
            if (index === 2) {
              navigation.navigate('AuthModal');
            } else {
              jumpToIndex(index);
            }
          }}
        />
      );
    },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Mybox') {
          iconName = `ios-filing${focused ? '' : '-outline'}`;
        } else if (routeName === 'Feed') {
          iconName = `ios-list${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        } else if (routeName === 'Notification') {
          iconName = `ios-notifications${focused ? '' : '-outline'}`;
        } else if (routeName === 'Post') {
          iconName = 'ios-add-circle-outline';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  },
);

export default StackNavigator(
  {
    TabNav: { screen: TabNav },
    PostModal: { screen: PostScreen },
    AuthModal: { screen: AuthStack },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);
