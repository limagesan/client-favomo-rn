import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import styles from './styles';

export default ({ onPress, source }) => (
  <TouchableOpacity onPress={onPress} style={styles.rightButton}>
    <Image resizeMode="contain" source={source} style={styles.icon} />
  </TouchableOpacity>
);
