import React, { Component } from 'react';
import { View } from 'react-native';
import notificationService from '../services/api/NotificationService';
import NotificationTypeComponent from '../components/NotificationTypeComponent';
import I18n from '../i18n';

class NotificationSettingsScreen extends Component {
  static navigationOptions = {
    title: I18n.t('notifications.notificationSettingsHeader')
  };

  constructor() {
    super();
    this.getNotificationTypes();
  }

  state = {
    notificationTypes: []
  };

  getNotificationTypes() {
    notificationService
      .getNotificationTypes()
      .then(res => this.setState({ notificationTypes: res.data }));
  }

  changeNotificationTypePushStatus = (notificationType, value) => {
    notificationType.pushNotification = value;
    let tempState = this.state.notificationTypes;
    this.setState({ notificationTypes: this.state.notificationTypes });
    notificationService.updateNotificationType(notificationType).catch(() => {
      this.state.setState(tempState);
    });
  };

  renderNotificationTypes() {
    return this.state.notificationTypes.map(type => (
      <NotificationTypeComponent
        key={type.id}
        notificationType={type}
        onValueChange={this.changeNotificationTypePushStatus}
      />
    ));
  }

  render() {
    return <View>{this.renderNotificationTypes()}</View>;
  }
}

export default NotificationSettingsScreen;
