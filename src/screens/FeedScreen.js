import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { connect } from 'react-redux';

import { StackNavigator } from 'react-navigation';

import SafariView from 'react-native-safari-view';

import basicStyles, { Color } from '../styles';

const items = [
  {
    id: 1,
    title: 'kimu',
  },
  {
    id: 2,
    title: 'kimu',
  },
  {
    id: 3,
    title: 'kimu',
  },
  {
    id: 4,
    title: 'kimu',
  },
  {
    id: 5,
    title: 'kimu',
  },
  {
    id: 6,
    title: 'kimu',
  },
  {
    id: 7,
    title: 'kimu',
  },
  {
    id: 8,
    title: 'kimu',
  },
  {
    id: 9,
    title: 'kimu',
  },
];

const Users = [
  {
    id: 'limage',
    iconUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBN7GPW1zWM13R7FwB2iEIENUdAcK0MlDfGxSFM6ScStYpiF0rOw',
  },
  {
    id: 'xdjapan02',
    iconUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBN7GPW1zWM13R7FwB2iEIENUdAcK0MlDfGxSFM6ScStYpiF0rOw',
  },
  {
    id: 'tomosan',
    iconUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBN7GPW1zWM13R7FwB2iEIENUdAcK0MlDfGxSFM6ScStYpiF0rOw',
  },
];

const Reactions = [{ user: Users[1], type: 'good' }, { user: Users[2], type: 'laugh' }];

const posts = [
  {
    id: 1,
    url: 'https://open.spotify.com/track/3Vo4wInECJQuz9BIBMOu8i?si=AV6Nzqj3T321tPm43iLdfw',
    user: Users[0],
    caption: 'かっこいい',
    reactions: Reactions,
  },
  {
    id: 2,
    url: 'https://www.youtube.com/watch?v=Xkkf3N2vFdw&index=14&list=LLx02vX4SlD9TyzyyoC9dUCw&t=0s',
    user: Users[1],
    caption: 'わろた',
    reactions: Reactions,
  },
  {
    id: 3,
    url: 'https://www.walkerplus.com/event/ar0313e302574/?head=01',
    user: Users[2],
    caption: 'ここ行きたい！',
    reactions: Reactions,
  },
  {
    id: 4,
    url: 'https://open.spotify.com/track/3Vo4wInECJQuz9BIBMOu8i?si=AV6Nzqj3T321tPm43iLdfw',
    user: Users[0],
    caption: 'かっこいい',
    reactions: Reactions,
  },
  {
    id: 5,
    url: 'https://www.youtube.com/watch?v=Xkkf3N2vFdw&index=14&list=LLx02vX4SlD9TyzyyoC9dUCw&t=0s',
    user: Users[1],
    caption: 'わろた',
    reactions: Reactions,
  },
  {
    id: 6,
    url: 'https://www.walkerplus.com/event/ar0313e302574/?head=01',
    user: Users[2],
    caption: 'ここ行きたい！',
    reactions: Reactions,
  },
  {
    id: 7,
    url: 'https://open.spotify.com/track/3Vo4wInECJQuz9BIBMOu8i?si=AV6Nzqj3T321tPm43iLdfw',
    user: Users[0],
    caption: 'かっこいい',
    reactions: Reactions,
  },
  {
    id: 8,
    url: 'https://www.youtube.com/watch?v=Xkkf3N2vFdw&index=14&list=LLx02vX4SlD9TyzyyoC9dUCw&t=0s',
    user: Users[1],
    caption: 'わろた',
    reactions: Reactions,
  },
  {
    id: 9,
    url: 'https://www.walkerplus.com/event/ar0313e302574/?head=01',
    user: Users[2],
    caption: 'ここ行きたい！',
    reactions: Reactions,
  },
];

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
      <View style={basicStyles.container}>
        <MultiSelectList data={posts} />
      </View>
    );
  }
}

class MyListItem extends React.PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.post);
  };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    const post = this.props.post.item;
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
                  <Text style={{ marginTop: 5 }}>
                    {post.caption}
                  </Text>
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

  onPressItem = ({ item }) => {
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

  keyExtractor = (post, index) => post;

  renderItem = item => (
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
