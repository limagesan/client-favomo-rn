import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

import styles from './styles';

export default (props) => {
  const { children } = props;

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {children}
    </KeyboardAvoidingView>
  );
};
