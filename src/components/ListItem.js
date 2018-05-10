import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import SharedContents from './SharedContents';

class ListItem extends React.PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
    const { item } = this.props;
    const borderTopWidth = this.props.index === 0 ? 0 : 1;
    return (
      <View
        style={{
          borderTopWidth,
          padding: 10,
          height: 190,
          backgroundColor: '#FFF',
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

export default ListItem;
