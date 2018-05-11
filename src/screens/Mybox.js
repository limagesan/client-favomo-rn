import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { OpenGraphParser } from 'react-native-opengraph-kit';

import SafariView from 'react-native-safari-view';
import firebase from 'react-native-firebase';

import ListItem from '../components/ListItem';
import YoutubeListItem from '../components/YoutubeListItem';
import { logout } from '../actions';

const db = firebase.firestore();

class Mybox extends Component {
  static navigationOptions = {
    title: 'Mybox',
  };

  state = { posts: [], refreshing: false };

  componentWillMount() {
    this.getFeed();
  }

  componentWillUpdate() {
    console.log('will update');
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

  handleIconPress = () => {
    console.log('Pressed X');
  };

  render() {
    return (
      <MultiSelectList
        data={this.state.posts}
        onRefresh={this.onRefresh}
        refreshing={this.state.refreshing}
      />
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

export default connect(mapStateToProps)(Mybox);
