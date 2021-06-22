import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import $t from 'i18n';
import { Modal, ModalBody, ModalFooter } from './baseModal';

type NoPermissionsForCameraModalProps = {
  isVisible: boolean;
  closeModal: () => void;
};

const NoPermissionsForCameraModal = ({
  isVisible,
  closeModal,
}: NoPermissionsForCameraModalProps) => {
  return (
    <Modal isVisible={isVisible} closeModal={closeModal}>
      <ModalBody>
        <Text>{$t('profile.updateUser.noPermissions')}</Text>
      </ModalBody>
      <ModalFooter>
        <TouchableOpacity onPress={closeModal}>
          <Text>{$t('common.ok')}</Text>
        </TouchableOpacity>
      </ModalFooter>
    </Modal>
  );
};

export default NoPermissionsForCameraModal;
