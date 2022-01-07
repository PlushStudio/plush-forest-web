import React, { FC, useContext, useEffect, useState } from 'react'
import s from '@/components/App/layout-components/Header/Header.module.scss'
import { HeaderContent } from './HeaderContent'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import Wallet from '@/components/App/layout-components/Header/NavBar/Wallet/Wallet'
import useTreeContract from "@/hooks/useTreeContract";

export const Header: FC = () => {
  const [userDetails, setUserDetails] = useContext(userDetailsContext)
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)
  const { getTreeTypeCount } = useTreeContract()

  const setContractData = async (address: string | undefined,
    balance: number | undefined,
    currency: string | undefined,
    hasToken: boolean | undefined) => {
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
      ]
    })
  }

  useEffect(() => {
    setIsOpenDropdown(!isOpenDropdown)
  }, [userDetails.isOpenDropdown])

  return (
    <div className={s.headerContainer}>
      <Wallet gender={userDetails.gender}
        name={userDetails.name}
        onWalletDataLoaded={setContractData}
        isOpenDropdown={isOpenDropdown}
        setIsOpenDropdown={setIsOpenDropdown} />
      <HeaderContent />
    </div>
  )
}
