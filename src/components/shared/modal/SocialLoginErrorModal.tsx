import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import $t from 'i18n'
import { Modal, ModalHeader, ModalBody, ModalFooter } from './baseModal'

type SocialLoginErrorModalProps = {
  error: string
  closeModal: () => void
}

const SocialLoginErrorModal = ({
  error,
  closeModal
}: SocialLoginErrorModalProps) => {
  return (
    <Modal isVisible={!!error} closeModal={closeModal}>
      <ModalHeader>
        <Text>{$t('error.socialLoginError')}</Text>
      </ModalHeader>
      <ModalBody>
        <Text>{error}</Text>
      </ModalBody>
      <ModalFooter>
        <TouchableOpacity onPress={closeModal}>
          <Text>{$t('error.close')}</Text>
        </TouchableOpacity>
      </ModalFooter>
    </Modal>
  )
}

export default SocialLoginErrorModal
