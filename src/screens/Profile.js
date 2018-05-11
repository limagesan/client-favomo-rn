import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { OpenGraphParser } from 'react-native-opengraph-kit';
import SafariView from 'react-native-safari-view';

import ListItem from '../components/ListItem';
import YoutubeListItem from '../components/YoutubeListItem';
import Container from '../components/Container';
import { MidiumButton } from '../components/Button';
import { clearIdToken, clearUser, logout } from '../actions';
import basicStyles from '../styles';
import log, { sub } from '../utils/log';

const db = firebase.firestore();

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
    userData: {},
    posts: [],
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
      this.props.dispatch(logout());
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

      this.setState({ posts });
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
    const { iconURL, name, iconURLThumb } = this.state.userData;
    return (
      <Container>
        {user && (
          <View>
            <Text>ユーザー情報</Text>
            <Text>{user.email}</Text>
            <Text>{user.emailVerified ? 'メール認証済み' : 'メール未認証'}</Text>
            <Image
              source={{ uri: iconURL }}
              style={{ width: 150, height: 150, borderRadius: 75 }}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
            <Text>{user.id}</Text>
          </View>
        )}
        {idToken && (
          <View>
            <MidiumButton onPress={this.logout} value="ログアウト" />
            <MidiumButton
              onPress={() => {
                this.props.navigation.navigate('ProfileEdit', { iconURL, name });
              }}
              value="プロフィールを編集"
            />
          </View>
        )}
        {!idToken && <Text>ログインしていません</Text>}
        <MultiSelectList
          data={this.state.posts}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
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
          style={{
            width: 375,
            backgroundColor: '#E4E4E4',
            flex: 1,
          }}
          refreshControl={
            <RefreshControl refreshing={this.props.refreshing} onRefresh={this.props.onRefresh} />
          }
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
