import React from 'react';
import { View } from 'react-native';

type ModalHeaderProps = {
  children: any;
};

const ModalHeader = ({ children }: ModalHeaderProps) => {
  return <View>{children}</View>;
};

export default ModalHeader;
