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

import { StackNavigator } from 'react-navigation';
import SafariView from 'react-native-safari-view';

import Api from '../Api';
import basicStyles, { Color } from '../styles';

const items = [
  { id: 1, title: 'kimu' },
  { id: 2, title: 'kimu' },
  { id: 3, title: 'kimu' },
  { id: 4, title: 'kimu' },
  { id: 5, title: 'kimu' },
  { id: 6, title: 'kimu' },
  { id: 7, title: 'kimu' },
  { id: 8, title: 'kimu' },
  { id: 9, title: 'kimu' },
];

export default class MyboxScreen extends Component {
  static navigationOptions = {
    title: 'Mybox',
  };

  constructor() {
    super();
    this.api = new Api();
    this.state = { text: '' };

    this.onPressButton = this.onPressButton.bind(this);
  }

  onPressButton() {
    Alert.alert('You tapped the button!');
    this.api.get().then((res) => {
      console.log('result', res);
    });
    this.props.navigation.navigate('MyModal');
  }

  render() {
    return (
      <View style={basicStyles.container}>
        <MultiSelectList data={items} />
      </View>
    );
  }
}

class MyListItem extends React.PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    return (
      <View style={{ borderTopWidth: 1, padding: 10, height: 145 }}>
        <TouchableOpacity onPress={this.onPress}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 4 }}>
                <Image
                  style={{ width: 94, height: 94, borderRadius: 10 }}
                  source={require('../assets/bruno.png')}
                />
              </View>
              <View style={{ paddingLeft: 10, flex: 11 }}>
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
                    https://open.spotify.com/track/3Vo4wInECJQuz9BIBMOu8i?si=AV6Nzqj3T321tPm43iLdfw
                  </Text>
                </View>
                <Text style={{ marginTop: 7, fontSize: 15, fontWeight: 'bold' }}>
                  finesse(Remix) [feat. Cardi B]
                </Text>
                <Text style={{ fontSize: 11 }}>
                  Finesse (Remix) [feat. Cardi B], an album by Bruno Mars, Cardi B on Spotify
                </Text>
                <Text style={{ marginTop: 5 }}> "かっこいい" </Text>
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
        </TouchableOpacity>
      </View>
    );
  }
}

class MultiSelectList extends React.PureComponent {
  state = { selected: new Map() };

  onPressItem = (id) => {
    // updater functions are preferred for transactional updates
    SafariView.isAvailable()
      .then(SafariView.show({
        url: 'https://open.spotify.com/track/3Vo4wInECJQuz9BIBMOu8i?si=AV6Nzqj3T321tPm43iLdfw',
      }))
      .catch((error) => {
        // Fallback WebView code for iOS 8 and earlier
      });
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  keyExtractor = (item, index) => item.id;

  renderItem = ({ item }) => (
    <MyListItem
      id={item.id}
      onPressItem={this.onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
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
