import React from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';

import basicStyles, { Color } from '../styles';

export default props => (
  <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFF ' }}>
    <View style={{ flex: 1 }}>
      <Text style={{ marginTop: 70, fontSize: 36 }}>Favomo</Text>
    </View>
    <View style={{ flex: 1 }}>
      <TouchableHighlight
        onPress={() => {
          props.navigation.navigate('SignUp');
        }}
        underlayColor={Color.base}
      >
        <View style={basicStyles.button}>
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
  </View>
);
