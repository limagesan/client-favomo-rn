import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

import styles from './styles';

export default (props) => {
  const { children } = props;

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.container}>{children}</View>
    </KeyboardAvoidingView>
  );
};
