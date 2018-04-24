import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import basicStyles from '../styles';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <View style={basicStyles.container}>
        <Text style={basicStyles.title}>Post</Text>
        <Text>{this.props.user ? 'logined' : 'not logined'}</Text>
        <Text>{this.props.name}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(ProfileScreen);
