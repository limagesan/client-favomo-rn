import React from 'react';
import { TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  base: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
  },
});

const BaseTextInput = props => (
  <TextInput {...props} defaultValue={props.value} value="" style={styles.base} />
);

export { BaseTextInput }; // eslint-disable-line import/prefer-default-export
