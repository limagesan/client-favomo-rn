import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Container } from '../../components/Container';
import Loader from '../../components/Loader';

import basicStyles, { Color } from '../../styles';

class Step2 extends Component {
  static navigationOptions = {
    title: 'Login2',
  };
  state = {
    validationMessage: '',
    loading: false,
  };

  render() {
    return (
      <Container>
        <Loader loading={this.state.loading} />
        <View
          style={{
            width: 375,
            height: 44,
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{
              flex: 2,
              marginLeft: 20,
              alignSelf: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Ionicons name="ios-arrow-back" size={30} color="black" />;
          </TouchableOpacity>
          <View style={{ flex: 6, justifyContent: 'center' }}>
            <Text style={{ alignSelf: 'center', fontSize: 20 }}>プロフィール</Text>
          </View>
          <View style={{ flex: 2, marginRight: 20, alignItems: 'flex-end' }} />
        </View>
        <View>
          <Text>oioi</Text>
        </View>Step2{this.state.validationMessage}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <TouchableHighlight
            onPress={this.onPressButton}
            underlayColor={Color.white}
            style={basicStyles.button}
          >
            <View>
              <Text style={basicStyles.buttonText}>はじめる</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Container>
    );
  }
}

export default connect()(Step2);
