import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 44,
    '@media ios': {
      marginTop: 20,
    },
  },
  rightButton: {
    alignSelf: 'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  leftButton: {
    alignSelf: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    alignSelf: 'center',
    paddingVertical: 20,
  },
  icon: {
    width: 18,
  },
});

const Header = ({ children }) => <View style={styles.container}>{children}</View>;

const LeftButton = ({ onPress, children }) => (
  <View style={styles.leftButton}>
    <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  </View>
);

const RightButton = ({ onPress, source }) => (
  <TouchableOpacity onPress={onPress} style={styles.rightButton}>
    <Image resizeMode="contain" source={source} style={styles.icon} />
  </TouchableOpacity>
);

const Title = ({ children }) => <View style={styles.title}>{children}</View>;

export { Header, LeftButton, RightButton, Title };
