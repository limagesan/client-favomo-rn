import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import YouTube from 'react-native-youtube';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class YoutubeListItem extends React.PureComponent {
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
      <TouchableWithoutFeedback>
        <View
          style={{
            borderTopWidth: 1,
            height: height + 90,
            width,
            backgroundColor: '#FFF',
          }}
        >
          <YouTube
            videoId={id} // The YouTube video ID
            play={false} // control playback of video with true/false
            fullscreen={false} // control whether the video should play in fullscreen or inline
            loop={false} // control whether the video should loop when ended
            onReady={e => console.log('Youtube is Ready', e)}
            onChangeState={e => console.log('Youtube ChangeState', e.state)}
            onChangeQuality={e => console.log('Youtube ChangeQuality', e.quality)}
            onError={e => console.log('Youtube Error', e.error)}
            style={{
              height,
              width,
              alignSelf: 'stretch',
            }}
          />
          <View
            style={{
              marginTop: 10,
              padding: 10,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
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
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default YoutubeListItem;
