import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';

import styles from './styles';

export default ({ onPress, children }) => (
  <View style={styles.leftButton}>
    <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  </View>
);
