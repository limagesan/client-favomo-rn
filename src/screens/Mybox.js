import React, { Component } from 'react';
import { Text, View, Alert, TouchableOpacity, FlatList, Image } from 'react-native';

import SafariView from 'react-native-safari-view';

import Api from '../Api';
import basicStyles from '../styles';
import { posts } from '../assets/data';
import Container from '../components/Container';

export default class Mybox extends Component {
  static navigationOptions = {
    title: 'Mybox',
  };

  constructor() {
    super();
    this.api = new Api();

    this.onPressButton = this.onPressButton.bind(this);
  }

  onPressButton = () => {
    Alert.alert('You tapped the button!');
    this.api.get().then((res) => {
      console.log('result', res);
    });
    this.props.navigation.navigate('Notice');
  };

  render() {
    return (
      <Container>
        <MultiSelectList data={posts} onPress={this.onPressButton} />
      </Container>
    );
  }
}

class MyListItem extends React.PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.post);
  };

  render() {
    const { post } = this.props;

    return (
      <View
        style={{
          borderTopWidth: 1,
          padding: 10,
          height: 140,
        }}
      >
        <View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 4 }}>
              <Image
                style={{ width: 94, height: 94, borderRadius: 10 }}
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
                      style={{ width: 15, height: 15 }}
                      source={require('../assets/spotify.png')}
                    />
                    <Text
                      style={{ flex: 1, marginLeft: 5, fontSize: 13 }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {post.url}
                    </Text>
                  </View>
                  <Text style={{ marginTop: 7, fontSize: 15, fontWeight: 'bold' }}>
                    finesse(Remix) [feat. Cardi B]
                  </Text>
                  <Text style={{ fontSize: 11 }}>
                    Finesse (Remix) [feat. Cardi B], an album by Bruno Mars, Cardi B on Spotify
                  </Text>
                </View>
              </TouchableOpacity>
              <Text style={{ marginTop: 5 }}>{post.caption}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 5 }}>
          <TouchableOpacity
            onPress={() => {
              console.log('liked');
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={{ width: 25, height: 25, marginLeft: 5 }}
                source={require('../assets/thumbs-up.png')}
              />
              <Image
                style={{ width: 25, height: 25, marginLeft: 5 }}
                source={require('../assets/thumbs-up.png')}
              />
              <Image
                style={{ width: 25, height: 25, marginLeft: 5 }}
                source={require('../assets/happiness.png')}
              />
              <Image
                style={{ width: 25, height: 25, marginLeft: 5 }}
                source={require('../assets/thumbs-up.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class MultiSelectList extends React.PureComponent {
  state = { selected: new Map() };

  onPressItem = (post) => {
    this.props.onPress();

    //   // updater functions are preferred for transactional updates
    //   SafariView.isAvailable()
    //     .then(SafariView.show({
    //       url: post.url,
    //     }))
    //     .catch((error) => {
    //       // Fallback WebView code for iOS 8 and earlier
    //     });
    //   this.setState((state) => {
    //     // copy the map rather than modifying state.
    //     const selected = new Map(state.selected);
    //     selected.set(post.id, !selected.get(post.id)); // toggle
    //     return { selected };
    // });
  };

  keyExtractor = (item, index) => item.id;

  renderItem = ({ item }) => (
    <MyListItem
      id={item.id}
      onPressItem={this.onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
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
        style={{ width: 375 }}
      />
    );
  }
}
