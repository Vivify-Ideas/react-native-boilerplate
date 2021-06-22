import React from 'react';
import { View } from 'react-native';

type ModalBodyProps = {
  children: any;
};

const ModalBody = ({ children }: ModalBodyProps) => {
  return <View>{children}</View>;
};

export default ModalBody;
