import React from 'react';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';

import styles from './styles';

export default (props) => {
  const { children } = props;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
