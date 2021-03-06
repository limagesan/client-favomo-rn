import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer'; // eslint-disable-line import/no-unresolved,import/extensions

import firebase from 'react-native-firebase';

import Container from '../../components/Container';
import Loader from '../../components/Loader';
import { BaseTextInput } from '../../components/TextInput';

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
    resizedImagePath: '',
  };

  submit = async () => {
    if (!this.validate()) return;

    const { uid } = this.props.user;
    const { signUpName } = this.props;
    const { selectedImagePath, resizedImagePath } = this.state;
    if (!uid) return;
    this.setState({ loading: true });

    if (!selectedImagePath) {
      const db = firebase.firestore();

      try {
        await db.doc(`users/${uid}`).update({ name: signUpName });
        this.props.dispatch(login());
      } catch (error) {
        console.error('Error writing document: ', error);
      }

      this.setState({ loading: false });

      return;
    }

    const storageRef = firebase.storage().ref('images');
    const imageRef = storageRef.child(`${uid}/profile.jpg`);
    const thumbImageRef = storageRef.child(`${uid}/thumb_profile.jpg`);

    const promise1 = imageRef
      .put(selectedImagePath, {
        contentType: 'image/jpeg',
      })
      .then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
        return snapshot.downloadURL;
      })
      .catch((err) => {
        console.error('Uploading error', err);
      });

    const promise2 = thumbImageRef
      .put(resizedImagePath, {
        contentType: 'image/jpeg',
      })
      .then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
        return snapshot.downloadURL;
      })
      .catch((err) => {
        console.error('Uploading error', err);
      });

    try {
      const values = await Promise.all([promise1, promise2]);

      const iconURL = values[0];
      const thumbIconURL = values[1];

      const db = firebase.firestore();

      await db.doc(`users/${uid}`).update({ iconURL, thumbIconURL, name: signUpName });
      this.props.dispatch(login());
    } catch (error) {
      console.error('Error: ', error);
    }

    this.setState({ loading: false });
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
      width: 400,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);

      this.setState({ selectedImagePath: image.path });

      ImageResizer.createResizedImage(image.path, 128, 128, 'JPEG', 80)
        .then(({ uri }) => {
          this.setState({
            resizedImagePath: uri,
          });

          console.log('resized', uri);
        })
        .catch((err) => {
          console.log(err);
        });
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
          <Image
            source={{ uri: this.state.selectedImagePath }}
            style={{ width: 100, height: 100 }}
          />
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
        <BaseTextInput
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
