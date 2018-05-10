import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

const SharedContents = ({ contents, onPress }) => {
  const { shortIconRef } = contents;

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
      const matches2 = contents.url.match(urlRegexp);
      favicon = `${matches2[1]}${shortIconRef}`;
    }
    matches = shortIconRef.match(/^\/[^/]/);
    if (matches && matches.length > 0) {
      const matches2 = contents.url.match(urlRegexp);
      favicon = `${matches2[1]}${matches2[3]}${shortIconRef}`;
    }
  }
  console.log('favicon', favicon);
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 4 }}>
        <Image
          style={{
            width: 94,
            height: 94,
            borderRadius: 10,
          }}
          source={{ uri: contents.image }}
        />
      </View>
      <View style={{ paddingLeft: 10, flex: 11 }}>
        <TouchableOpacity onPress={onPress}>
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
                {contents.url}
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
              {contents.title}
            </Text>
            <Text style={{ fontSize: 11 }} numberOfLines={3}>
              {contents.description}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SharedContents;
