import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';

import SafariView from 'react-native-safari-view';

import basicStyles from '../styles';
import { posts } from '../assets/data';
import { Container } from '../components/Container';

class FeedScreen extends Component {
  static navigationOptions = {
    title: 'Feed',
  };

  constructor() {
    super();
    this.onPressButton = this.onPressButton.bind(this);
  }

  componentDidMount() {
    console.log('check state in FeedScreen', this.props);
  }

  onPressButton() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container>
        <MultiSelectList data={posts} />
      </Container>
    );
  }
}

class MyListItem extends React.PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.post);
  };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    const { post } = this.props;
    console.log('post', post);
    return (
      <View
        style={{
          borderTopWidth: 1,
          padding: 10,
          height: 140,
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
              source={require('../assets/bruno.png')}
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
                    source={require('../assets/spotify.png')}
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
                    {post.url}
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: 7,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                >
                  finesse(Remix)[feat.Cardi B]
                </Text>
                <Text style={{ fontSize: 11 }}>
                  Finesse(Remix)[feat.Cardi B], an album by Bruno Mars, Cardi B on Spotify
                </Text>
              </View>
            </TouchableOpacity>
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
                source={{ uri: post.user.iconUrl }}
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
                  <Text style={{ fontSize: 10 }}>{post.user.id}</Text>
                  <Text style={{ marginTop: 5 }}>{post.caption}</Text>
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
        </View>
      </View>
    );
  }
}

class MultiSelectList extends React.PureComponent {
  state = {
    selected: new Map(),
  };

  onPressItem = (post) => {
    // updater functions are preferred for transactional updates
    SafariView.isAvailable()
      .then(SafariView.show({
        url: post.url,
      }))
      .catch((error) => {
        // Fallback WebView code for iOS 8 and earlier
      });
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(post.id, !selected.get(post.id)); // toggle
      return {
        selected,
      };
    });
  };

  keyExtractor = (post, index) => post;

  renderItem = ({ item }) => (
    <MyListItem
      id={item.id}
      onPressItem={this.onPressItem}
      selected={!!this.state.selected.get(item.id)}
      post={item}
    />
  );

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
      />
    );
  }
}

export default FeedScreen;
