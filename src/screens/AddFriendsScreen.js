import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import baseStyles, { Color } from '../styles';
import Loader from '../components/Loader';
import { Container } from '../components/Container';

class AddFriendScreen extends Component {
  static navigationOptions = {
    title: 'AddFriends',
    headerTintColor: 'black',
  };

  constructor() {
    super();
    this.state = { searchId: '', loading: false };
    this.search = this.search.bind(this);
  }

  search() {
    const { searchId } = this.state;
    this.setState({ loading: true });
    setTimeout(() => {
      console.log('searched', searchId);
      this.setState({ loading: false });
    }, 2000);
  }

  render() {
    const buttonStyle = [baseStyles.button];
    buttonStyle.push({ marginTop: 20 });

    return (
      <Container>
        <Text>AddFriends</Text>
        <TextInput
          onChangeText={(value) => {
            this.setState({ searchId: value });
          }}
          value={this.state.searchId}
          maxLength={40}
          style={{
            height: 40,
            width: 300,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 20,
          }}
        />
        <TouchableHighlight onPress={this.search} style={buttonStyle} underlayColor={Color.white}>
          <View>
            <Text style={baseStyles.buttonText}>検索</Text>
          </View>
        </TouchableHighlight>
        <Loader loading={this.state.loading} />
      </Container>
    );
  }
}

export default AddFriendScreen;
