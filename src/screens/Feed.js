import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { OpenGraphParser } from 'react-native-opengraph-kit';

import SafariView from 'react-native-safari-view';
import firebase from 'react-native-firebase';
import YouTube from 'react-native-youtube';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import { logout } from '../actions';

// import { posts } from '../assets/data';
import { Container } from '../components/Container';

const db = firebase.firestore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    minHeight: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 5,
  },
});

const youtubeStyles = EStyleSheet.create({
  container: {
    height: 200,
    alignSelf: 'stretch',
  },
});

class Feed extends Component {
  static navigationOptions = {
    title: 'Feed',
  };

  constructor() {
    super();
    this.onPressButton = this.onPressButton.bind(this);
    this.state = { posts: [], refreshing: false };
  }

  componentDidMount() {
    this.getFeed();
    const { height, width } = Dimensions.get('window');
    console.log('dimensions', height, width);
  }

  onPressButton() {
    this.props.navigation.goBack();
  }

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
      <Container>
        <MultiSelectList
          data={this.state.posts}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
        />
      </Container>
    );
  }
}

class YoutubeItem extends React.PureComponent {
  onPress = () => {
    console.log('pressed');
  };

  render() {
    const { item } = this.props;
    const { url } = item;
    let id = '';
    if (url.indexOf('youtube.com') >= 0) {
      const matches = url.match(/watch\?v=.{11}/);
      id = matches[0].match(/.{11}$/);
    } else if (url.indexOf('youtu.be') >= 0) {
      const matches = url.match(/youtu\.be\/.{11}/);
      id = matches[0].match(/.{11}$/);
    }
    if (id.length > 0) {
      [id] = id;
    }

    const { width } = Dimensions.get('window');
    let height = width * 9;
    height /= 16;

    return (
      <View
        style={{
          borderTopWidth: 1,
          height: height + 80,
          width,
        }}
      >
        <YouTube
          videoId={id} // The YouTube video ID
          play // control playback of video with true/false
          fullscreen={false} // control whether the video should play in fullscreen or inline
          loop={false} // control whether the video should loop when ended
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={{
            height,
            width,
            alignSelf: 'stretch',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            padding: 10,
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
              paddingTop: 11.5,
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
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingRight: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                console.log('liked');
              }}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require('../assets/thumbs-up.png')}
              />
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
      </View>
    );
  }
}

class MyListItem extends React.PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
    const { item } = this.props;
    const { shortIconRef } = item.data;

    let favicon = '../assets/spotify.png';
    // http://www.ietf.org/rfc/rfc3986.txt 50p参照
    const urlRegexp = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i;

    if (shortIconRef) {
      let matches = shortIconRef.match(/^https|^http/);
      if (matches && matches.length > 0) {
        favicon = shortIconRef;
      }
      matches = shortIconRef.match(/^\/\//);
      if (matches && matches.length > 0) {
        const matches2 = item.url.match(urlRegexp);
        favicon = `${matches2[1]}${shortIconRef}`;
      }
      matches = shortIconRef.match(/^\/[^/]/);
      if (matches && matches.length > 0) {
        const matches2 = item.url.match(urlRegexp);
        favicon = `${matches2[1]}${matches2[3]}${shortIconRef}`;
      }
    }
    console.log('favicon', favicon);

    return (
      <View
        style={{
          borderTopWidth: 1,
          padding: 10,
          height: 180,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 4 }}>
            <Image
              style={{
                width: 94,
                height: 94,
                borderRadius: 10,
              }}
              source={{ uri: item.data.image }}
            />
          </View>
          <View style={{ paddingLeft: 10, flex: 11 }}>
            <TouchableOpacity onPress={this.onPress}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    overflow: 'hidden',
                    alignItems: 'center',
                  }}
                  removeClippedSubviews
                >
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                    }}
                    source={{ uri: favicon }}
                  />
                  <Text
                    style={{
                      flex: 1,
                      marginLeft: 5,
                      fontSize: 13,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.url}
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: 7,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                  numberOfLines={2}
                >
                  {item.data.title}
                </Text>
                <Text style={{ fontSize: 11 }} numberOfLines={3}>
                  {item.data.description}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
              paddingTop: 11.5,
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
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingRight: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                console.log('liked');
              }}
            >
              <Icon name="thumbs-o-up" size={30} color="black" />
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
      </View>
    );
  }
}

class MultiSelectList extends React.PureComponent {
  state = {
    selected: new Map(),
  };

  onPressItem = (item) => {
    // updater functions are preferred for transactional updates
    SafariView.isAvailable()
      .then(SafariView.show({
        url: item.url,
      }))
      .catch((error) => {
        // Fallback WebView code for iOS 8 and earlier
      });
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(item.id, !selected.get(item.id)); // toggle
      return {
        selected,
      };
    });
  };

  keyExtractor = (item, index) => item.id;

  renderItem = ({ item }) => {
    const ListItem =
      item.url.indexOf('youtube.com') >= 0 || item.url.indexOf('youtu.be') >= 0 ? (
        <YoutubeItem id={item.id} item={item} />
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
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={{
          width: 375,
        }}
        refreshControl={
          <RefreshControl refreshing={this.props.refreshing} onRefresh={this.props.onRefresh} />
        }
      />
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Feed);
