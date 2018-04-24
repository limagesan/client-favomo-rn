import React from 'react';
import { TextInput } from 'react-native';

import styles from './styles';

const BaseTextInput = props => <TextInput {...props} style={styles.input} />;

export default BaseTextInput;
