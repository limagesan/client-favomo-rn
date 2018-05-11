import React from 'react';
import { View, Image, Text, Button, TouchableWithoutFeedback } from 'react-native';

const UserProfileView = ({ user, navigation }) => (
  <TouchableWithoutFeedback>
    <View style={{ backgroundColor: '#FFF', padding: 10 }}>
      <View style={{ alignItems: 'flex-end' }}>
        <Button
          onPress={() => {
            navigation.navigate('ProfileEdit', {
              iconURL: user.iconURL,
              name: user.name,
            });
          }}
          title="プロフィールを編集"
          color="#2196F3"
          style={{ fontSize: 14, alignSelf: 'flex-end', marginRight: 20 }}
        />
      </View>
      {user && (
        <View>
          <Image
            source={{ uri: user.iconURL }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              paddingTop: 10,
              fontSize: 18,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}
          >
            {user.name}
          </Text>
          {user.id && (
            <Text style={{ paddingTop: 3, fontSize: 12, alignSelf: 'center' }}>@{user.id}</Text>
          )}
        </View>
      )}
    </View>
  </TouchableWithoutFeedback>
);

export default UserProfileView;
