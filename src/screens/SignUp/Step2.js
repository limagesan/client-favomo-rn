import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';

import { Container } from '../../components/Container';
import Loader from '../../components/Loader';

import { updateSignUpName, login } from '../../actions';

import basicStyles, { Color } from '../../styles';

class Step2 extends Component {
  static navigationOptions = {
    title: 'Login2',
  };
  state = {
    nameValidationMsg: '',
    loading: false,
    selectedImagePath: '',
  };

  submit = () => {
    if (!this.validate()) return;

    const { uid } = this.props.user;
    const { signUpName } = this.props;
    if (!uid) return;

    const storageRef = firebase.storage().ref('images');

    const imageRef = storageRef.child(`${uid}/profile.jpg`);
    imageRef
      .put(this.state.selectedImagePath)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);

        const db = firebase.firestore();

        db
          .doc(`users/${uid}`)
          .update({ iconURL: snapshot.downloadURL, name: signUpName })
          .then(() => {
            console.log('Document successfully written!');

            this.props.dispatch(login());
          })
          .catch((error) => {
            console.error('Error writing document: ', error);
          });
      })
      .catch((err) => {
        console.error('Uploading error', err);
      });
  };

  validate = () => {
    this.setState({
      nameValidationMsg: '',
    });
    const { signUpName } = this.props;
    const { selectedImagePath } = this.state;

    if (signUpName.length <= 0) {
      this.setState({ nameValidationMsg: '名前を入力してください' });
      return false;
    }

    return true;
  };
  selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);

      this.setState({ selectedImagePath: image.path });
    });
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
          <Image source={{ uri: this.state.selectedImagePath }} style={{ width: 100, height: 100 }} />
          <TouchableHighlight
            onPress={this.selectImage}
            underlayColor={Color.white}
            style={basicStyles.button}
          >
            <View>
              <Text style={basicStyles.buttonText}>画像を変更</Text>
            </View>
          </TouchableHighlight>
        </View>
        <TextInput
          onChangeText={(value) => {
            this.props.dispatch(updateSignUpName(value));
            this.setState({ nameValidationMsg: '' });
          }}
          value={this.props.signUpName}
          maxLength={40}
          style={{
            height: 40,
            width: 300,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 20,
          }}
        />
        <Text style={{ fontSize: 12, marginTop: 5, color: 'red' }}>
          {this.state.nameValidationMsg}
        </Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <TouchableHighlight
            onPress={this.submit}
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

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Step2);
