import React, { Component } from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import { Container } from '../components/Container';

import { clearIdToken, clearUser, logout } from '../actions';
import basicStyles, { Color } from '../styles';
import log, { sub } from '../utils/log';

class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddFriends');
        }}
        style={basicStyles.leftBarButtonContainer}
      >
        <Ionicons name="ios-person-add" size={30} color="black" />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          console.log('tap settings');
        }}
        style={basicStyles.rightBarButtonContainer}
      >
        <Ionicons name="ios-settings" size={30} color="black" />
      </TouchableOpacity>
    ),
  });

  state = {
    downloadURL: '',
  };

  uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);

      // Create a root reference
      const storageRef = firebase.storage().ref('images');

      // Create a reference to 'mountains.jpg'
      // const mountainsRef = storageRef.child('mountains.jpg');

      // Create a reference to 'images/mountains.jpg'
      const { uid } = this.props.user;
      if (!uid) return;
      const mountainImagesRef = storageRef.child(`${uid}/profile.jpg`);

      // While the file names are the same, the references point to different files
      // mountainsRef.name === mountainImagesRef.name; // true
      // mountainsRef.fullPath === mountainImagesRef.fullPath; // false

      const file = image.path; // use the Blob or File API
      mountainImagesRef
        .put(file)
        .then((snapshot) => {
          console.log('Uploaded a blob or file!', snapshot);
          this.setState({ downloadURL: snapshot.downloadURL });
        })
        .catch((err) => {
          console.error('Uploading error', err);
        });
    });
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        log(sub.firebase, 'logout', res);
        this.props.dispatch(clearIdToken());
        this.props.dispatch(clearUser());
        this.props.dispatch(logout());
      });
  };

  verifyEmail() {
    if (!this.state.user) {
      return;
    }

    this.state.user
      .sendEmailVerification({
        iOS: {
          bundleId: 'com.limage.clientfavomorn',
        },
        url: 'favomoapp://',
      })
      .then((res) => {
        log(sub.firebase, 'send email', res);
      });
  }

  render() {
    const { user, idToken } = this.props;
    return (
      <Container>
        {user && (
          <View>
            <Text>ユーザー情報</Text>
            <Text>{user.email}</Text>
            <Text>{user.emailVerified ? 'メール認証済み' : 'メール未認証'}</Text>
            <Image source={{ uri: this.state.downloadURL }} style={{ width: 100, height: 100 }} />
          </View>
        )}
        {idToken && (
          <View>
            <TouchableHighlight
              onPress={this.logout}
              underlayColor={Color.white}
              style={basicStyles.button}
            >
              <View>
                <Text style={basicStyles.buttonText}>ログアウト</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.uploadImage}
              underlayColor={Color.white}
              style={basicStyles.button}
            >
              <View>
                <Text style={basicStyles.buttonText}>画像を変更</Text>
              </View>
            </TouchableHighlight>
          </View>
        )}
        {!idToken && <Text>ログインしていません</Text>}
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Profile);
