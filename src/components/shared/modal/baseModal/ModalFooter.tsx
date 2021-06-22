import React from 'react';
import { View } from 'react-native';

type ModalFooterProps = {
  children: any;
};

const ModalFooter = ({ children }: ModalFooterProps) => {
  return <View>{children}</View>;
};

export default ModalFooter;
