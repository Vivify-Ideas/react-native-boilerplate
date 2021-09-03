import React from 'react'
import { Modal } from 'native-base'

type ModalHeaderProps = {
  children: React.ReactNode
}

const ModalHeader = ({ children }: ModalHeaderProps) => {
  return <Modal.Header>{children}</Modal.Header>
}

export default ModalHeader
