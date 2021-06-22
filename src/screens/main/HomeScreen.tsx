import React, { useContext, useState } from 'react';
import {
  Button,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import $t from 'i18n';
import { UserContext } from 'contexts/UserContext';
import { useLogout } from 'queries/auth';

const HomeScreen = () => {
  const { mutate: handleLogout } = useLogout();

  const { user } = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const signOutAsync = async () => {
    handleLogout();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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

        <Button title="Actually, sign me out :)" onPress={signOutAsync} />

        <Button onPress={() => setModalVisible(true)} title="Show Modal" />

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            // @ts-ignore
            alert('Modal has been closed.');
          }}
        >
          <SafeAreaView style={styles.container}>
            <View>
              <Text>{$t('helloWorld')}</Text>

              <Button onPress={() => setModalVisible(!modalVisible)} title="Hide Modal" />
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
    backgroundColor: '#fff',
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
