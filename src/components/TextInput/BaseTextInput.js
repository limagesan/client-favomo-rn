import React from 'react';
import { TextInput } from 'react-native';

import styles from './styles';

const BaseTextInput = props => (
  <TextInput {...props} defaultValue={props.value} value="" style={styles.base} />
);

export default BaseTextInput;
