import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import firebase from 'react-native-firebase';

const db = firebase.firestore();

class Notifications extends Component {
  static navigationOptions = {
    title: 'Notifications',
  };

  state = {
    notifications: [],
    refreshing: false,
  };

  componentDidMount() {
    this.fetchNotification();
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.fetchNotification();
    this.setState({ refreshing: false });
  };

  fetchNotification = () => {
    const { uid } = this.props.user;
    return db
      .collection('notifications')
      .doc(uid)
      .collection('notifications')
      .orderBy('createdAt', 'desc')
      .get()
      .then((snapshot) => {
        console.log('snapshot', snapshot);
        const { docs } = snapshot;
        const notifications = [];
        docs.forEach((doc, i) => {
          notifications[i] = doc.data();
          notifications.id = doc.id;
        });
        console.log('noti', notifications);
        this.setState({ notifications });
      });
  };

  render() {
    console.log('oioioi', this.state.notifications);
    return (
      <NotificationsList
        onRefresh={this.onRefresh}
        refreshing={this.state.refreshing}
        data={this.state.notifications}
      />
    );
  }
}

class LikeNotificationItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={{
            padding: 10,
            backgroundColor: '#FFF',
            flex: 1,
          }}
        >
          <Image
            style={{
              width: 35,
              height: 35,
              borderRadius: 17.5,
            }}
            source={{ uri: item.from.thumbIconURL }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold' }}>{item.from.name}</Text>
            <Text>さんがいいねしました</Text>
          </View>

          <Text>{item.target.url}</Text>
          <Text>{item.target.caption}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class CommentNotificationItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    console.log('comment item', item);
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={{
            padding: 10,
            backgroundColor: '#FFF',
            flex: 1,
          }}
        >
          <Image
            style={{
              width: 35,
              height: 35,
              borderRadius: 17.5,
            }}
            source={{ uri: item.from.thumbIconURL }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold' }}>{item.from.name}</Text>
            <Text>さんがコメントしました</Text>
          </View>
          <Text>{item.value}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class NotificationsList extends React.PureComponent {
  keyExtractor = (item, index) => item.id;

  renderItem = ({ item }) => {
    let Item = null;
    switch (item.type) {
      case 'comment':
        Item = <CommentNotificationItem item={item} />;
        break;
      case 'like':
        Item = <LikeNotificationItem item={item} />;
        break;
      default:
        break;
    }

    return Item;
  };
  render() {
    console.log('fuck', this.props);
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={this.keyExtractor}
        extraData={this.state}
        renderItem={this.renderItem}
        style={{
          width: 375,
          backgroundColor: '#E4E4E4',
        }}
        refreshControl={
          <RefreshControl refreshing={this.props.refreshing} onRefresh={this.props.onRefresh} />
        }
      />
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Notifications);
