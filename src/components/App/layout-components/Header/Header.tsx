import React, { FC, useContext, useEffect, useState } from 'react'
import s from '@/components/App/layout-components/Header/Header.module.scss'
import { HeaderContent } from './HeaderContent'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import Wallet from '@/components/App/layout-components/Header/NavBar/Wallet/Wallet'
import useTreeContract from "@/hooks/useTreeContract";
import useMetamaskWallet from "@/hooks/useMetamaskWallet";

export const Header: FC = () => {
  const VITE_NETWORK_ID = window.config.NETWORK_ID ?? '80001'
  const [userDetails, setUserDetails] = useContext(userDetailsContext)
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(true)
  const { getTreeTypeCount } = useTreeContract()
  const { provider } = useMetamaskWallet()

  const setContractData = async (address: string | undefined,
    balance: number | undefined,
    currency: string | undefined,
    hasToken: boolean | undefined) => {

    console.log('test10')
    try {
      console.log('test11')
      const networkId = await provider?.getNetwork();
      console.log('test12')
      if (networkId?.chainId === Number(VITE_NETWORK_ID)) {
        console.log('test13')
        setUserDetails({
          ...userDetails,
          address,
          balance,
          currency,
          hasToken,
          treesCount: [
            await getTreeTypeCount('SHIHUAHUACO'),
            await getTreeTypeCount('CACAO'),
            await getTreeTypeCount('GUABA'),
            await getTreeTypeCount('CAOBA')
          ],
          networkId: Number(VITE_NETWORK_ID)
        })
      } else {
        console.log('test14')
        setUserDetails({
          ...userDetails,
          address,
          networkId: networkId?.chainId,
          hasToken,
        })
      }
    } catch (e) {
      console.log('test15')
      setUserDetails({
        ...userDetails,
        address,
        networkId: 'wrongNetwork'
      })
    }
  }
  console.log(userDetails)

  useEffect(() => {
    setIsOpenDropdown(true)
  }, [userDetails.isOpenDropdown])

  return (
    <div className={s.headerContainer}>
      <Wallet
        gender={userDetails.gender}
        name={userDetails.name}
        onWalletDataLoaded={setContractData}
        isOpenDropdown={isOpenDropdown}
        setIsOpenDropdown={setIsOpenDropdown} />
      <HeaderContent />
    </div>
  )
}
