import React, { Component } from 'react';
import { View, TextInput, Text, Image, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';

import baseStyles, { Color } from '../styles';
import Loader from '../components/Loader';
import { Container } from '../components/Container';

class AddFriend extends Component {
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

    const db = firebase.firestore();
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

        this.setState({ searchedUser });

        console.log('user', searchedUser.iconURL);
      });
  }

  render() {
    const buttonStyle = [baseStyles.button];
    buttonStyle.push({ marginTop: 20 });

    const { searchId, validationMsg, searchedUser } = this.state;

    return (
      <Container>
        <Text>AddFriends</Text>
        <TextInput
          onChangeText={(value) => {
            this.setState({ searchId: value, validationMsg: '' });
          }}
          value={searchId}
          maxLength={40}
          style={{
            height: 40,
            width: 300,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 20,
          }}
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
          </View>
        )}
        <Loader loading={this.state.loading} />
      </Container>
    );
  }
}

export default AddFriend;
