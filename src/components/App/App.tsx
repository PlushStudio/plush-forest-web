import React, { useEffect, useState } from 'react'
import '@/index.scss'
import '@/index.css'
import { Routes } from '@/Routes'
import UserDetailsProvider from '@/context/UserDetailsProvider'
import ModalProvider from '@/context/ModalProvider'
import useMetamaskWallet from "@/hooks/useMetamaskWallet";

function App() {
  const { isInstalled, install } = useMetamaskWallet();
  const [isMetamaskReady, setIsMetamaskReady] = useState<any>(true);

  useEffect(() => {
    if (!isInstalled()) {
      install()
    }
    setIsMetamaskReady(isInstalled())
  }, [])

  return (
    isMetamaskReady ?
      <UserDetailsProvider>
        <ModalProvider>
          <Routes />
        </ModalProvider>
      </UserDetailsProvider> : <>Metamask extension required</>
  )
}

export default App
