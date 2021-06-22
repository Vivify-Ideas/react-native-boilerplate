import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import $t from 'i18n';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './baseModal';

type ImagePickerModalProps = {
  isVisible: boolean;
  closeModal: () => void;
  galleryImport: () => void;
  openCamera: () => void;
};

const ImagePickerModal = ({
  isVisible,
  closeModal,
  galleryImport,
  openCamera,
}: ImagePickerModalProps) => {
  return (
    <Modal isVisible={isVisible} closeModal={closeModal}>
      <ModalHeader>
        <Text>{$t('profile.updateUser.importImage')}</Text>
      </ModalHeader>
      <ModalBody>
        <TouchableOpacity onPress={openCamera}>
          <Text>{$t('profile.updateUser.takePicture')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={galleryImport}>
          <Text>{$t('profile.updateUser.importFromGallery')}</Text>
        </TouchableOpacity>
      </ModalBody>
      <ModalFooter>
        <TouchableOpacity onPress={closeModal}>
          <Text>{$t('common.cancel')}</Text>
        </TouchableOpacity>
      </ModalFooter>
    </Modal>
  );
};

export default ImagePickerModal;
