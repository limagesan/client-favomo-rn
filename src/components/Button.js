import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  largeContainer: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 10,
  },
  largeText: {
    padding: 20,
    color: 'black',
    fontSize: 20,
  },
  midiumContainer: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 10,
  },
  midiumText: {
    padding: 20,
    color: 'black',
    fontSize: 20,
  },
  smallContainer: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 10,
  },
  smallText: {
    padding: 20,
    color: 'black',
    fontSize: 20,
  },
});

const LargeButton = ({ onPress, value }) => (
  <TouchableHighlight onPress={onPress} underlayColor="#FFF" style={styles.largeContainer}>
    <View>
      <Text style={styles.largeText}>{value}</Text>
    </View>
  </TouchableHighlight>
);

const MidiumButton = ({ onPress, value }) => (
  <TouchableHighlight onPress={onPress} underlayColor="#FFF" style={styles.midiumContainer}>
    <View>
      <Text style={styles.midiumText}>{value}</Text>
    </View>
  </TouchableHighlight>
);

const SmallButton = ({ onPress, value }) => (
  <TouchableHighlight onPress={onPress} underlayColor="#FFF" style={styles.smallContainer}>
    <View>
      <Text style={styles.smallText}>{value}</Text>
    </View>
  </TouchableHighlight>
);

export { LargeButton, MidiumButton, SmallButton };
