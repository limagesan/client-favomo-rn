import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';
import ImageResizer from 'react-native-image-resizer'; // eslint-disable-line import/no-unresolved,import/extensions

import Container from '../components/Container';
import Loader from '../components/Loader';

import basicStyles, { Color } from '../styles';

const db = firebase.firestore();

class ProfileEdit extends Component {
  static navigationOptions = {
    title: 'ProfileEdit',
  };

  constructor(props) {
    super();

    const { params } = props.navigation.state;
    const name = params ? params.name : null;
    const iconURL = params ? params.iconURL : null;

    this.state = {
      nameValidationMsg: '',
      loading: false,
      name,
      iconURL,
      selectedImagePath: '',
      resizedImagePath: '',
    };
  }

  submit = () => {
    if (!this.validate()) return;

    const { uid } = this.props.user;
    const { name, selectedImagePath, resizedImagePath } = this.state;
    if (!uid) return;

    if (!selectedImagePath) {
      return db
        .doc(`users/${uid}`)
        .update({ name })
        .then(() => {
          console.log('Document successfully written!');

          this.props.navigation.goBack();
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
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

    Promise.all([promise1, promise2]).then(async (values) => {
      const iconURL = values[0];
      const thumbIconURL = values[1];

      const { docs } = await db
        .collection('posts')
        .where('poster.uid', '==', uid)
        .get();

      const userDoc = await db.doc(`users/${uid}`).get();
      const userRef = userDoc.ref;

      const batch = db.batch();

      const postsUpdate = {};
      postsUpdate['poster.thumbIconURL'] = thumbIconURL;
      postsUpdate['poster.name'] = name;

      console.log('userDoc', userDoc, 'userRef', userRef);

      console.log('docs', docs);
      for (let i = 0; i < docs.length; i += 1) {
        batch.update(docs[i].ref, postsUpdate);
      }

      batch.update(userRef, { iconURL, thumbIconURL, name });

      batch.commit().then(() => {
        console.log('Document successfully written!');

        this.props.navigation.goBack();
      });
    });
  };

  validate = () => {
    this.setState({
      nameValidationMsg: '',
    });
    const { name } = this.state;

    if (name.length <= 0) {
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
    const {
      name, nameValidationMsg, iconURL, selectedImagePath, resizedImagePath,
    } = this.state;

    const uri = selectedImagePath || iconURL;

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
          <Image source={{ uri }} style={{ width: 100, height: 100 }} />

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
            this.setState({ name: value, nameValidationMsg: '' });
          }}
          value={name}
          maxLength={40}
          style={{
            height: 40,
            width: 300,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 20,
          }}
        />
        <Text style={{ fontSize: 12, marginTop: 5, color: 'red' }}>{nameValidationMsg}</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <TouchableHighlight
            onPress={this.submit}
            underlayColor={Color.white}
            style={basicStyles.button}
          >
            <View>
              <Text style={basicStyles.buttonText}>変更</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(ProfileEdit);
