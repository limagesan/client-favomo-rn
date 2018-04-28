import React from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';

import basicStyles, { Color } from '../styles';
import { Container } from '../components/Container';

export default props => (
  <Container>
    <View style={{ flex: 1 }}>
      <Text style={{ marginTop: 70, fontSize: 36 }}>Favomo</Text>
    </View>
    <View style={{ flex: 1 }}>
      <TouchableHighlight
        onPress={() => {
          props.navigation.navigate('SignUp');
        }}
        underlayColor={Color.white}
        style={basicStyles.button}
      >
        <View>
          <Text style={basicStyles.buttonText}>サインアップ</Text>
        </View>
      </TouchableHighlight>
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
