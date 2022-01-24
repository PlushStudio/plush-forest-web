import React, { FC, useContext, useEffect, useState } from 'react'
import s from '@/components/App/layout-components/Header/Header.module.scss'
import { HeaderContent } from './HeaderContent'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import Wallet from '@/components/App/layout-components/Header/NavBar/Wallet/Wallet'
import useTreeContract from "@/hooks/useTreeContract";
import KebabDrowdown from "@/components/App/layout-components/Header/NavBar/Wallet/KebabDrowdown";
import infoIcon from "@/assets/images/wallet/32-px-1-outlined-info.svg";
import cakeIcon from "@/assets/images/wallet/32-px-1-outlined-cupcake.svg";

export const Header: FC = () => {
  const [userDetails, setUserDetails] = useContext(userDetailsContext)
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(true)
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

  const menuList = [
    {
      title: 'About',
      href: '/',
      icon: infoIcon
    },
    {
      title: 'Request features',
      href: '/',
      icon: cakeIcon
    }
  ];

  return (
    <div className={s.headerContainer}>
      <Wallet gender={userDetails.gender}
        name={userDetails.name}
        onWalletDataLoaded={setContractData}
        isOpenDropdown={isOpenDropdown}
        setIsOpenDropdown={setIsOpenDropdown} />
      <div className={s.kebabContainer}>
        <KebabDrowdown menuList={menuList} />
      </div>
      <HeaderContent />
    </div>
  )
}
