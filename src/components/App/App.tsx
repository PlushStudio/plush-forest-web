import React from 'react'
import '@/index.scss'
import '@/index.css'
import { Routes } from '@/Routes'
import UserDetailsProvider from '@/context/UserDetailsProvider'
import ModalProvider from '@/context/ModalProvider'

function App() {
  return (
    <UserDetailsProvider>
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </UserDetailsProvider>
  )
}

export default App
