import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { MidiumButton } from '../components/Button';
import Container from '../components/Container';

export default props => (
  <Container>
    <View style={{ flex: 1 }}>
      <Text style={{ marginTop: 70, fontSize: 36 }}>Favomo</Text>
    </View>
    <View style={{ flex: 1 }}>
      <MidiumButton
        onPress={() => {
          props.navigation.navigate('SignUp');
        }}
        value="サインアップ"
      />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Login');
        }}
      >
        <Text>アカウントをお持ちの方は ログイン</Text>
      </TouchableOpacity>
    </View>
  </Container>
);
