import React from 'react'
import { View, StyleSheet, Modal } from 'react-native'

type ModalWrapperProps = {
  isVisible: boolean
  closeModal: () => void
  children: React.ReactNode
}

const ModalWrapper = ({
  isVisible,
  closeModal,
  children
}: ModalWrapperProps) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={closeModal}
      transparent
    >
      <View style={styles.container}>
        <View style={styles.modalWrap}>{children}</View>
      </View>
    </Modal>
  )
}

export default ModalWrapper

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.16)',
    flexGrow: 1,
    justifyContent: 'center'
  },
  modalWrap: {
    height: '50%',
    width: '50%'
  }
})
