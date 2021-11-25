import React, { createContext, useState } from 'react'
import { modalStateDefault } from '@/context/DefaultValue'

export const modalContext = createContext({})

const ModalProvider = (props: any) => {
  const [modalStore, setModalStore] = useState<any>(modalStateDefault)

  return (
    <modalContext.Provider value={[modalStore, setModalStore]}>
      {props.children}
    </modalContext.Provider>
  )
}

export default ModalProvider