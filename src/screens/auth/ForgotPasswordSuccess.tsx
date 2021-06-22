import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import $t from 'i18n';
import SCREENS from 'constants/screens';
import { ForgotPasswordSuccessNavigationProp } from 'types/navigation';

type ForgotPasswordSuccessProps = {
  navigation: ForgotPasswordSuccessNavigationProp;
};

const ForgotPasswordSuccess = ({ navigation }: ForgotPasswordSuccessProps) => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid>
        <Text>{$t('auth.forgotPasswordSuccess')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.AUTH_STACK.SIGN_IN)}>
          <Text>{$t('common.ok')}</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ForgotPasswordSuccess;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});