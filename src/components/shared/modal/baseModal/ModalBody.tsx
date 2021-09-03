import React from 'react'
import { Modal } from 'native-base'

type ModalBodyProps = {
  children: React.ReactNode
}

const ModalBody = ({ children }: ModalBodyProps) => {
  return <Modal.Body>{children}</Modal.Body>
}

export default ModalBody
