import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import $t from 'i18n';
import SCREENS from 'constants/screens';
import { ResetPasswordSuccessScreenNavigationProp } from 'types/navigation';

type ResetPasswordSuccessProps = {
  navigation: ResetPasswordSuccessScreenNavigationProp;
};

const ResetPasswordSuccess = ({ navigation }: ResetPasswordSuccessProps) => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid>
        <Text>{$t('auth.passwordResetSucces')}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.AUTH_STACK.SIGN_IN)}
        >
          <Text>{$t('common.ok')}</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ResetPasswordSuccess;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
