import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { OpenGraphParser } from 'react-native-opengraph-kit';
import SafariView from 'react-native-safari-view';
import EStyleSheet from 'react-native-extended-stylesheet';

import UserProfileView from '../components/UserProfileView';
import ListItem from '../components/ListItem';
import YoutubeListItem from '../components/YoutubeListItem';
import Container from '../components/Container';
import { EmailVerifyPrompt } from '../components/Prompt';
import basicStyles from '../styles';
import log, { sub } from '../utils/log';

const db = firebase.firestore();

const styles = EStyleSheet.create({
  flatList: {
    width: '100%',
    backgroundColor: '#E4E4E4',
    flex: 1,
  },
  itemSeparator: {
    width: '100%',
    height: EStyleSheet.hairlineWidth,
    backgroundColor: 'gray',
  },
});

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
          navigation.navigate('Settings');
        }}
        style={basicStyles.rightBarButtonContainer}
      >
        <Ionicons name="ios-settings" size={30} color="black" />
      </TouchableOpacity>
    ),
  });

  state = {
    userData: {},
    posts: [{ id: 0 }],
    refreshing: false,
  };

  componentWillMount() {
    this.fetchUser();
    this.getFeed();
  }

  componentWillUpdate() {
    this.fetchUser();
  }

  onPressButton = () => {
    this.props.navigation.goBack();
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getFeed();
    this.setState({ refreshing: false });
  };

  getFeed = async () => {
    if (!this.props.user) {
      return;
    }
    const { uid } = this.props.user;

    try {
      const snapshot = await db
        .collection('posts')
        .where('poster.uid', '==', uid)
        .get();

      console.log('feed res', snapshot, snapshot.query.selectFields);

      const { docs } = snapshot;
      console.log('feed docs', docs);

      let posts = [];

      docs.forEach((doc, i) => {
        posts[i] = doc.data();
        posts[i].id = doc.id;
      });

      let urls = '';
      posts.forEach((post) => {
        urls = `${urls} + ${post.url} + ' '`;
      });
      console.log('posts', posts);

      const data = await OpenGraphParser.extractMeta(urls);
      console.log('data', data);
      posts = posts.map((post, i) => {
        const newPost = post;
        newPost.data = data[i];
        return newPost;
      });

      this.setState(prevState => ({ posts: prevState.posts.concat(posts) }));
      return;
    } catch (error) {
      console.error('error', error);
    }
  };

  fetchUser = () => {
    const { uid } = this.props.user;
    return db
      .doc(`users/${uid}`)
      .get()
      .then((snapshot) => {
        const userData = snapshot.data();
        this.setState({ userData });
      });
  };

  handleIconPress = () => {
    console.log('Pressed X');
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

  // TODO レンダリングが多すぎるのをなんとかしたい
  render() {
    const user = Object.assign({}, this.props.user._user, this.state.userData); // eslint-disable-line no-underscore-dangle

    return (
      <Container>
        {user.emailVerified || <EmailVerifyPrompt />}
        <MultiSelectList
          data={this.state.posts}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          user={user}
          onLogout={this.logout}
          navigation={this.props.navigation}
        />
      </Container>
    );
  }
}

class MultiSelectList extends React.PureComponent {
  onPressItem = (item) => {
    // updater functions are preferred for transactional updates
    SafariView.isAvailable()
      .then(SafariView.show({
        url: item.url,
      }))
      .catch((error) => {
        // Fallback WebView code for iOS 8 and earlier
      });
  };

  keyExtractor = (item, index) => item.id;

  renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <UserProfileView
          user={this.props.user}
          onLogout={this.props.onLogout}
          navigation={this.props.navigation}
        />
      );
    }

    const Item =
      item.url.indexOf('youtube.com') >= 0 || item.url.indexOf('youtu.be') >= 0 ? (
        <YoutubeListItem id={item.id} item={item} />
      ) : (
        <ListItem id={item.id} index={index} onPressItem={this.onPressItem} item={item} />
      );

    return Item;
  };

  render() {
    const view =
      this.props.data.length > 0 ? (
        <FlatList
          data={this.props.data}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          style={styles.flatList}
          refreshControl={
            <RefreshControl refreshing={this.props.refreshing} onRefresh={this.props.onRefresh} />
          }
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            padding: 20,
          }}
          refreshControl={
            <RefreshControl refreshing={this.props.refreshing} onRefresh={this.props.onRefresh} />
          }
        >
          <View>
            <Text style={{ fontSize: 26 }}>投稿はありません</Text>
          </View>
        </ScrollView>
      );
    return view;
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Profile);
