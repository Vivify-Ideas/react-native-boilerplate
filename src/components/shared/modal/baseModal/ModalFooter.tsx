import React from 'react'
import { Modal } from 'native-base'

type ModalFooterProps = {
  children: React.ReactNode
}

const ModalFooter = ({ children }: ModalFooterProps) => {
  return <Modal.Footer>{children}</Modal.Footer>
}

export default ModalFooter
