import React from 'react'
import '@/index.scss'
import '@/index.css'
import { Routes } from '@/Routes'
import UserDetailsProvider from '@/context/UserDetailsProvider'

function App() {
  return (
    <UserDetailsProvider>
      <Routes />
    </UserDetailsProvider>
  )
}

export default App
