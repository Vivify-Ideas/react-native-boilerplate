import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Text, TextInput } from 'react-native';
import NotificationComponent from '../components/NotificationComponent';
import notificationService from '../services/api/NotificationService';
import { NOTIFICATION_TYPE_FILTER } from '../constants/constants';
import I18n from '../i18n';

class NotificationListScreen extends Component {
  static navigationOptions = {
    title: I18n.t('notifications.notificationsHeader')
  };

  state = {
    typeFilter: NOTIFICATION_TYPE_FILTER.ALL,
    searchQuery: '',
    startingIndex: 0,
    notifications: []
  };

  constructor() {
    super();
    this.getNotifications();
  }

  getNotifications() {
    notificationService
      .getNotifications(this.state.startingIndex, this.state.searchQuery)
      .then(res => {
        this.setState({
          notifications: [...this.state.notifications, ...res.data]
        });
      });
  }

  renderNotifications() {
    return this.state.typeFilter === NOTIFICATION_TYPE_FILTER.ALL
      ? this.showAllNotifications()
      : this.showFilteredNotifications();
  }

  showAllNotifications() {
    let notificationToShow = [];
    this.state.notifications.forEach(notification => {
      notificationToShow.push(
        <NotificationComponent key={notification.id} notification={notification} />
      );
    });
    return notificationToShow;
  }

  showFilteredNotifications() {
    let notificationToShow = [];
    this.state.notifications.forEach(notification => {
      if (this.state.typeFilter === notification.type) {
        notificationToShow.push(
          <NotificationComponent key={notification.id} notification={notification} />
        );
      }
    });
    return notificationToShow;
  }

  changeTypeFilterStatus(typeFilter) {
    this.setState({ typeFilter });
  }

  loadMore() {
    this.setState({ startingIndex: this.state.startingIndex + 2 }, () => {
      this.getNotifications();
    });
  }

  filterByQuery() {
    this.setState(
      {
        notifications: [],
        startingIndex: 0
      },
      () => {
        this.getNotifications();
      }
    );
  }

  render() {
    return (
      <ScrollView>
        <TouchableOpacity onPress={() => this.changeTypeFilterStatus(NOTIFICATION_TYPE_FILTER.ALL)}>
          <Text>{I18n.t('notifications.showAll')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.changeTypeFilterStatus(NOTIFICATION_TYPE_FILTER.TYPE1)}
        >
          <Text>{I18n.t('notifications.showType1')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.changeTypeFilterStatus(NOTIFICATION_TYPE_FILTER.TYPE2)}
        >
          <Text>{I18n.t('notifications.showType2')}</Text>
        </TouchableOpacity>

        <TextInput
          autoCapitalize="none"
          placeholder={I18n.t('notifications.searchNotifications')}
          onChangeText={searchQuery => this.setState({ searchQuery })}
          onSubmitEditing={() => this.filterByQuery()}
        />

        {this.renderNotifications()}

        <TouchableOpacity onPress={() => this.loadMore()}>
          <Text>{I18n.t('common.loadMore')}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
export default NotificationListScreen;
