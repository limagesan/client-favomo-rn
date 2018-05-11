import React from 'react';
import { View, Image, Text, Button, TouchableWithoutFeedback } from 'react-native';

import { MidiumButton } from './Button';

const UserProfileView = ({ user, navigation, onLogout }) => (
  <TouchableWithoutFeedback>
    <View style={{ backgroundColor: '#FFF' }}>
      <Button
        onPress={() => {
          navigation.navigate('ProfileEdit', {
            iconURL: user.iconURL,
            name: user.name,
          });
        }}
        title="プロフィールを編集"
        color="#2196F3"
        style={{ alignSelf: 'flex-end', marginRight: 20 }}
      />
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
          <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>{user.name}</Text>
          {user.id && <Text style={{ fontSize: 12, alignSelf: 'center' }}>@{user.id}</Text>}
        </View>
      )}
      <View>
        <MidiumButton onPress={onLogout} value="ログアウト" />
      </View>
    </View>
  </TouchableWithoutFeedback>
);

export default UserProfileView;
