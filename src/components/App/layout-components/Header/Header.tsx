import React, { FC, useContext, useEffect, useState } from 'react'
import s from '@/components/App/layout-components/Header/Header.module.scss'
import { HeaderContent } from './HeaderContent'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import Wallet from '@/components/App/shared-components/Wallet/Wallet'
import useTreeContract from "@/hooks/useTreeContract";
import KebabDrowdown from "@/components/App/shared-components/KebabDropdown/KebabDrowdown";
import infoIcon from "@/assets/images/wallet/32-px-1-outlined-info.svg";
import cakeIcon from "@/assets/images/wallet/32-px-1-outlined-cupcake.svg";
import useMetamaskWallet from "@/hooks/useMetamaskWallet";
import routes from "@/components/Router/routes";

export const Header: FC = () => {
  const NETWORK_ID = window.config.NETWORK_ID ?? import.meta.env.VITE_NETWORK_ID
  const [userDetails, setUserDetails] = useContext(userDetailsContext)
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)
  const { getTreeTypeCount } = useTreeContract()
  const { provider } = useMetamaskWallet()

  const setContractData = async (address: string | undefined,
    balance: number | undefined,
    currency: string | undefined,
    hasToken: boolean | undefined) => {

    try {
      const networkId = await provider?.getNetwork();

      if (networkId?.chainId === Number(NETWORK_ID)) {
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
          networkId: Number(NETWORK_ID)
        })
      } else {
        setUserDetails({
          ...userDetails,
          address,
          networkId: networkId?.chainId,
          hasToken,
        })
      }
    } catch (e) {
      setUserDetails({
        ...userDetails,
        address,
        networkId: 'wrongNetwork'
      })
    }
  }

  useEffect(() => {
    setIsOpenDropdown(true)
  }, [userDetails.isOpenDropdown])

  const menuList = [
    {
      title: 'About',
      href: routes.index,
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
      <Wallet
        gender={userDetails.gender}
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
