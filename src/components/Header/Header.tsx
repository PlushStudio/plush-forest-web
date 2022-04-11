import React  from 'react'
import s from '@/components/Header/Header.module.scss'
import { HeaderContent } from './HeaderContent'
import { Wallet, Balance, Pipe } from '@/lib'
import { WalletProps } from '@/lib/components/Wallet/Wallet'
import KebabDrowdown from "@/components/KebabDropdown/KebabDrowdown";
import infoIcon from "@/assets/images/wallet/32-px-1-outlined-info.svg";
import cakeIcon from "@/assets/images/wallet/32-px-1-outlined-cupcake.svg";

interface headerProps {
  walletProps: WalletProps,
  balance: number,
  currency: string
}

export const Header = ({ walletProps: { state, address, name,
  gender, actualNetworkName,
  expectedNetworkName, connect,
  switchNetwork, register,
  switchAccount, openExplorer }, currency, balance }: headerProps) => {

  const PLUSH_WEBSITE_URL = window.config.PLUSH_WEBSITE_URL ?? import.meta.env.VITE_PLUSH_WEBSITE_URL

  const menuList = [
    {
      title: 'About',
      href: PLUSH_WEBSITE_URL,
      icon: infoIcon
    },
    {
      title: 'Request features',
      href: 'https://discord.gg/wEguFDBbN6',
      icon: cakeIcon
    }
  ];

  return (
    <div className={s.headerContainer}>
      <HeaderContent />
      <div className={s.right}>
        <Wallet
          state={state}
          address={address}
          name={name}
          gender={gender}
          actualNetworkName={actualNetworkName}
          expectedNetworkName={expectedNetworkName}
          connect={connect}
          switchNetwork={switchNetwork}
          register={register}
          switchAccount={switchAccount}
          openExplorer={openExplorer}
          modalStyle={{ right: '0px', top: '60px' }} />
        <Pipe />
        {
          currency.length > 0 ? (
            <>
              <Balance
                className={s.balance}
                balance={balance}
                currency={currency} />
              <Pipe className={s.balanceRightSeparator} />
            </>
          ) : null
        }
        <div className={s.kebabContainer}>
          <KebabDrowdown menuList={menuList} />
        </div>
      </div>
    </div>
  )
}
