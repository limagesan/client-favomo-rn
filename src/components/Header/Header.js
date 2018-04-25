import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const Header = ({ children }) => <View style={styles.container}>{children}</View>;

export default Header;
