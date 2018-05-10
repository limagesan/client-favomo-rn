import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { OpenGraphParser } from 'react-native-opengraph-kit';

import SafariView from 'react-native-safari-view';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import SharedContents from '../components/SharedContents';
import YoutubeListItem from '../components/YoutubeListItem';
import { logout } from '../actions';

const db = firebase.firestore();

class Feed extends Component {
  static navigationOptions = {
    title: 'Feed',
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
        .where(`poster.follower.${uid}`, '==', true)
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

  renderItem = ({ item }) => {
    const ListItem =
      item.url.indexOf('youtube.com') >= 0 || item.url.indexOf('youtu.be') >= 0 ? (
        <YoutubeListItem id={item.id} item={item} />
      ) : (
        <MyListItem
          id={item.id}
          onPressItem={this.onPressItem}
          selected={!!this.state.selected.get(item.id)}
          item={item}
        />
      );

    return ListItem;
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
            backgroundColor: '#FFF',
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


class MyListItem extends React.PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
    const { item } = this.props;

    return (
      <View
        style={{
          borderTopWidth: 1,
          padding: 10,
          height: 190,
        }}
      >
        <SharedContents contents={item.data} onPress={this.onPress} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}
        >
          <Image
            style={{
              width: 35,
              height: 35,
              borderRadius: 17.5,
            }}
            source={{ uri: item.poster.thumbIconURL }}
          />
          <View
            style={{
              marginLeft: 10,
              flexDirection: 'row',
              flex: 1,
            }}
          >
            <View style={{ flex: 4 }}>
              <Text style={{ fontSize: 10 }}>{item.poster.id}</Text>
              <Text style={{ marginTop: 5 }}>{item.caption}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            paddingRight: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              console.log('tap comment');
            }}
          >
            <Text style={{ fontSize: 14 }}>コメントする</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('liked');
            }}
            style={{ marginLeft: 20 }}
          >
            <Icon name="thumbs-o-up" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('smiled');
            }}
          >
            <Image
              style={{
                marginLeft: 10,
                width: 25,
                height: 25,
              }}
              source={require('../assets/happiness.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Feed);
