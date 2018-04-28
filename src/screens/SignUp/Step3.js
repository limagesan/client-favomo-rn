import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

class Step3 extends Component {
  constructor() {
    super();
    this.state = {
      validationMessage: '',
    };
  }

  render() {
    return <View>Step2{this.state.validationMessage}</View>;
  }
}

export default connect()(Step3);
