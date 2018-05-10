import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import firebase from 'react-native-firebase';

import baseStyles, { Color } from '../styles';
import Loader from '../components/Loader';
import { Container } from '../components/Container';
import { BaseTextInput } from '../components/TextInput';

const db = firebase.firestore();

class AddFriends extends Component {
  static navigationOptions = {
    title: 'AddFriends',
    headerTintColor: 'black',
  };

  constructor() {
    super();
    this.state = {
      searchId: '',
      validationMsg: '',
      searchedUser: null,
      loading: false,
    };
    this.search = this.search.bind(this);
  }

  search() {
    const { searchId } = this.state;
    this.setState({ loading: true });

    db
      .collection('users')
      .where('id', '==', searchId)
      .get()
      .then((snapshot) => {
        this.setState({ loading: false });

        console.log('res', snapshot);

        const { docs } = snapshot;
        if (docs.length === 0) {
          this.setState({ validationMsg: 'ユーザーが見つかりませんでした' });
          return;
        }

        const searchedUser = docs[0].data();
        const { ref } = docs[0];

        this.setState({ searchedUser });

        this.searchedUserRef = ref;

        console.log('user', searchedUser.iconURL, ref, ref.path);
      });
  }

  follow = async () => {
    const { uid } = this.props.user;
    const usersUpdate = {};
    usersUpdate[`follower.${uid}`] = true;

    const arr = this.searchedUserRef.path.split('/');
    const searchedUserId = arr[1];

    const postsUpdate = {};
    postsUpdate[`poster.follower.${uid}`] = true;

    const { docs } = await db
      .collection('posts')
      .where('poster.uid', '==', searchedUserId)
      .get();

    // 複数のトランザクション
    const batch = db.batch();

    batch.update(this.searchedUserRef, usersUpdate);

    for (let i = 0; i < docs.length; i += 1) {
      batch.update(docs[i].ref, postsUpdate);
    }

    batch.commit().then(() => {
      console.log('follow process completed');
    });
  };

  render() {
    const buttonStyle = [baseStyles.button];
    buttonStyle.push({ marginTop: 20 });

    const { searchId, validationMsg, searchedUser } = this.state;

    return (
      <Container>
        <Text>AddFriends</Text>
        <BaseTextInput
          onChangeText={(value) => {
            this.setState({ searchId: value, validationMsg: '' });
          }}
          value={searchId}
          maxLength={40}
        />
        <Text style={{ fontSize: 12, marginTop: 5, color: 'black' }}>{validationMsg}</Text>
        <TouchableHighlight onPress={this.search} style={buttonStyle} underlayColor={Color.white}>
          <View>
            <Text style={baseStyles.buttonText}>検索</Text>
          </View>
        </TouchableHighlight>
        {searchedUser && (
          <View>
            <Text>{searchedUser.name}</Text>
            <Image source={{ uri: searchedUser.iconURL }} style={{ width: 100, height: 100 }} />
            <TouchableHighlight
              onPress={this.follow}
              style={buttonStyle}
              underlayColor={Color.white}
            >
              <View>
                <Text style={baseStyles.buttonText}>フォローする</Text>
              </View>
            </TouchableHighlight>
          </View>
        )}
        <Loader loading={this.state.loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(AddFriends);
