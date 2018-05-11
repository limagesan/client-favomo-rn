import React, { Component } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { OpenGraphParser } from 'react-native-opengraph-kit';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { MidiumButton } from '../components/Button';
import Container from '../components/Container';
import basicStyles, { Color } from '../styles';

class Post extends Component {
  state = {
    url: '',
    caption: '',
    urlValidationMsg: '',
    captionValidationMsg: '',
    content: null,
  };

  onPressButton = async () => {
    const db = firebase.firestore();

    const { uid } = this.props.user;
    const { url, caption } = this.state;

    const doc = await db.doc(`users/${uid}`).get();

    const value = doc.data();

    db
      .collection('posts')
      .add({
        url,
        caption,
        poster: {
          uid,
          id: value.id,
          name: value.name,
          thumbIconURL: value.thumbIconURL,
          follower: value.follower,
        },
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('Document successfully written!');

        this.props.navigation.goBack();
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  handleChange = async (text) => {
    this.setState({ url: text, urlValidationMsg: '' });
    try {
      const contents = await OpenGraphParser.extractMeta(text);
      if (contents.length > 0) {
        this.setState({ content: contents[0] });
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  comopnentWillMount() {
    this.setState();
  }

  render() {
    const {
      url, caption, urlValidationMsg, captionValidationMsg, content,
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
              onChangeText={this.handleChange}
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
          {content && (
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 4 }}>
                <Image
                  style={{
                    width: 94,
                    height: 94,
                    borderRadius: 10,
                  }}
                  source={{ uri: content.image }}
                />
              </View>
              <View style={{ paddingLeft: 10, flex: 11 }}>
                <View>
                  <Text
                    style={{
                      marginTop: 7,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}
                  >
                    {content.title}
                  </Text>
                  <Text style={{ fontSize: 11 }} numberOfLines={3}>
                    {content.description}
                  </Text>
                </View>
              </View>
            </View>
          )}

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            <MidiumButton onPress={this.onPressButton} value="シェア" />
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Post);
