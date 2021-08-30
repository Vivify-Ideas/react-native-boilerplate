import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import $t from 'i18n'
import { Modal, ModalBody, ModalFooter } from './baseModal'

type PasswordChangedModalProps = {
  isVisible: boolean
  closeModal: () => void
}

const PasswordChangedModal = ({
  isVisible,
  closeModal
}: PasswordChangedModalProps) => {
  return (
    <Modal isVisible={isVisible} closeModal={closeModal}>
      <ModalBody>
        <Text>{$t('profile.changePassword.passwordChangedSuccess')}</Text>
      </ModalBody>
      <ModalFooter>
        <TouchableOpacity onPress={closeModal}>
          <Text>{$t('common.ok')}</Text>
        </TouchableOpacity>
      </ModalFooter>
    </Modal>
  )
}

export default PasswordChangedModal
