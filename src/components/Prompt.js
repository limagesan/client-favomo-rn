import React from 'react';
import { View, Text } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  emailContainer: {
    height: 40,
    width: '100%',
    backgroundColor: '#59c323',
  },
  text: {
    color: '#FFF',
  },
});

const EmailVerifyPrompt = ({ onPress }) => (
  <View style={styles.emailContainer}>
    <Text>メールアドレスが認証されていません。</Text>
  </View>
);

export { EmailVerifyPrompt }; // eslint-disable-line import/prefer-default-export
