import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Container } from '../components/Container';

export default class Post extends Component {
  comopnentWillMount() {
    this.setState();
  }

  render() {
    return (
      <Container>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{ alignSelf: 'flex-start', marginTop: 30, marginLeft: 30 }}
        >
          <Ionicons name="ios-close" size={30} color="black" />;
        </TouchableOpacity>
        <Text>シェア</Text>
      </Container>
    );
  }
}
