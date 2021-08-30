import React, { useContext, useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Button, View, Text } from 'native-base';
import $t from 'i18n';
import { UserContext } from 'contexts/UserContext';
import { useLogoutMutation } from 'queries/auth';
import { Alert } from 'react-native';

const HomeScreen = () => {
  const { mutate: handleLogout } = useLogoutMutation();

  const { user } = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const signOutAsync = async () => {
    handleLogout();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <Text>{$t('helloWorld')}</Text>
          {user && <Text>{user.email}</Text>}
          <Image
            source={
              __DEV__
                ? require('assets/images/robot-dev.png')
                : require('assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <Button onPress={signOutAsync}>Actually, sign me out :)</Button>

        <Button onPress={() => setModalVisible(true)}>Show Modal</Button>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <SafeAreaView style={styles.container}>
            <View>
              <Text>{$t('helloWorld')}</Text>

              <Button onPress={() => setModalVisible(!modalVisible)}>
                Hide Modal
              </Button>
            </View>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
  },

  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  welcomeImage: {
    height: 80,
    marginLeft: -10,
    marginTop: 3,
    resizeMode: 'contain',
    width: 100,
  },
});
