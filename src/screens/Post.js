import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Container } from '../components/Container';
import basicStyles, { Color } from '../styles';

class Post extends Component {
  state = {
    url: '',
    caption: '',
    urlValidationMsg: '',
    captionValidationMsg: '',
  };

  onPressButton = () => {
    const db = firebase.firestore();

    const { uid } = this.props.user;
    const { url, caption } = this.state;

    db
      .collection('posts')
      .add({ url, caption, poster: { uid } })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  comopnentWillMount() {
    this.setState();
  }

  render() {
    const {
      url, caption, urlValidationMsg, captionValidationMsg,
    } = this.state;

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
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TextInput
              onChangeText={(value) => {
                this.setState({ url: value, urlValidationMsg: '' });
              }}
              value={url}
              maxLength={500}
              keyboardType="default"
              placeholder="https://"
              style={{
                height: 40,
                width: 300,
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 20,
              }}
            />
            <Text style={{ fontSize: 12, marginTop: 5, color: 'red' }}>{urlValidationMsg}</Text>
            <TextInput
              onChangeText={(value) => {
                this.setState({ caption: value, captionValidationMsg: '' });
              }}
              value={caption}
              maxLength={40}
              placeholder="キャプション"
              style={{
                height: 40,
                width: 300,
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 20,
              }}
            />
            <Text style={{ fontSize: 12, marginTop: 5, color: 'red' }}>{captionValidationMsg}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            <TouchableHighlight
              onPress={this.onPressButton}
              underlayColor={Color.white}
              style={basicStyles.button}
            >
              <View>
                <Text style={basicStyles.buttonText}>シェア</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Post);
