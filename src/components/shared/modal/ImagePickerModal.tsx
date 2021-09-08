import React from 'react'
import $t from 'i18n'

import { Modal, ModalHeader, ModalBody, ModalFooter } from './baseModal'
import { Button } from 'native-base'

type ImagePickerModalProps = {
  isVisible: boolean
  closeModal: () => void
  galleryImport: () => void
  openCamera: () => void
}

const ImagePickerModal = ({
  isVisible,
  closeModal,
  galleryImport,
  openCamera
}: ImagePickerModalProps) => {
  return (
    <Modal isVisible={isVisible} closeModal={closeModal}>
      <ModalHeader>{$t('profile.updateUser.importImage')}</ModalHeader>
      <ModalBody>
        <Button onPress={openCamera}>
          {$t('profile.updateUser.takePicture')}
        </Button>
        <Button onPress={galleryImport}>
          {$t('profile.updateUser.importFromGallery')}
        </Button>
      </ModalBody>
      <ModalFooter>
        <Button onPress={closeModal}>{$t('common.cancel')}</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ImagePickerModal
