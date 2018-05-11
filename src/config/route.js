import React from 'react';
import { StatusBar } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Mybox,
  Post,
  Feed,
  Login,
  Notification,
  Profile,
  ProfileEdit,
  Welcome,
  AddFriends,
  Settings,
} from '../screens';

import { Step1, Step2, Step3 } from '../screens/SignUp';

const navStyle = {
  headerStyle: {
    backgroundColor: 'orange',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const FeedStack = StackNavigator(
  {
    Feed: {
      screen: Feed,
    },
  },
  {
    navigationOptions: navStyle,
  },
);

const MyboxStack = StackNavigator(
  {
    Mybox: {
      screen: Mybox,
    },
  },
  {
    navigationOptions: navStyle,
  },
);

const NotificationStack = StackNavigator(
  {
    Notification: {
      screen: Notification,
    },
  },
  {
    navigationOptions: navStyle,
  },
);

const ProfileStack = StackNavigator(
  {
    Profile: {
      screen: Profile,
    },
    ProfileEdit: {
      screen: ProfileEdit,
    },
    AddFriends: {
      screen: AddFriends,
    },
    Notice: {
      screen: Notification,
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    navigationOptions: navStyle,
    headerMode: 'screen',
  },
);

const SignUpStack = StackNavigator(
  {
    Step1: { screen: Step1 },
    Step2: { screen: Step2 },
    Step3: { screen: Step3 },
  },
  { headerMode: 'none' },
);

export const AuthStack = StackNavigator(
  {
    Welcome: { screen: Welcome },
    SignUp: {
      screen: SignUpStack,
    },

    Login: { screen: Login },
  },
  { headerMode: 'none' },
);

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
              navigation.navigate('PostModal');
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

export const MainStack = StackNavigator(
  {
    TabNav: { screen: TabNav },
    PostModal: { screen: Post },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: { paddingTop: StatusBar.currentHeight },
  },
);
