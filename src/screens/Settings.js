import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

class Settings extends Component {
  static navigationOptions = {
    title: 'Settings',
  };
  render() {
    return (
      <View>
        <Text>Setting</Text>
        <FlatList
          data={[{ key: 'a' }, { key: 'b' }]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
          ItemSeparatorComponent={() => (
            <View
              style={{ width: 100, height: StyleSheet.hairlineWidth, backgroundColor: 'black' }}
            />
          )}
        />
      </View>
    );
  }
}

export default Settings;
