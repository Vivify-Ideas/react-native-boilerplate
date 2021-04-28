import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ChangePasswordForm } from '../../../components/profile/ChangePasswordForm';
import { useUpdatePassword } from '../../../queries/user';

const ChangePassword = () => {
  const { mutate, error } = useUpdatePassword();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid>
        <ChangePasswordForm onSubmit={mutate} invalidOldPasswordError={!!error} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
