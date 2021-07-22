import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ChangePasswordForm } from 'components/profile/ChangePasswordForm';
import { useUpdatePasswordMutation } from 'queries/user';

const ChangePassword = () => {
  const { mutate, error } = useUpdatePasswordMutation();

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
    flex: 1,
  },
});
