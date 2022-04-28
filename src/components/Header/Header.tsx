import React from 'react'
import s from '@/components/Header/Header.module.scss'
import { HeaderContent } from './HeaderContent'
import { Wallet, Balance, Pipe, KebabDropdown } from '@plushfamily/ui-components'
import { WalletProps } from '../../../lib/components/Wallet/Wallet'
import infoIcon from '@/assets/images/outlinedIcons/outlined-info.svg'
import cakeIcon from '@/assets/images/outlinedIcons/outlined-cupcake.svg'
import { plushDiscordUrl } from '@/constants'
import classNames from 'classnames'
import { useMediaQuery } from 'react-responsive'

interface headerProps {
  walletProps: WalletProps,
  balance: number,
  currency: string
}

export const Header = ({
  walletProps: {
    state, address, name,
    gender, actualNetworkName,
    expectedNetworkName, connect,
    switchNetwork, register,
    switchAccount, openExplorer
  }, currency, balance
}: headerProps) => {
  const PLUSH_WEBSITE_URL = window.config.PLUSH_WEBSITE_URL ?? import.meta.env.VITE_PLUSH_WEBSITE_URL

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  })

  const menuList = [
    {
      title: 'About',
      href: PLUSH_WEBSITE_URL,
      icon: infoIcon
    },
    {
      title: 'Request features',
      href: plushDiscordUrl,
      icon: cakeIcon
    }
  ]

  const walletInstall = () => {
    // TODO: create wallet install function
  }

  return (
    <div className={classNames('container', s.headerContainer)}>
      <HeaderContent />
      <div className={s.right}>
        <Wallet
          className={s.wallet}
          size={isMobile ? 'compact' : 'normal'}
          install={walletInstall}
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
          modalStyle={isMobile
            ? { position: 'fixed', left: '50%', top: '200px', transform: 'translate(-50%, -50%)' }
            : { position: 'fixed', right: '50px', top: '80px' } } />
        <Pipe />
        {
          currency.length > 0
            ? (
              <>
                <Balance
                  className={s.balance}
                  balance={balance}
                  currency={currency} />
                <Pipe className={s.balanceRightSeparator} />
              </>
              )
            : null
        }
        <div className={s.kebabContainer}>
          <KebabDropdown menuStyle={{ top: '50px', right: '0' }} items={menuList} />
        </div>
      </div>
    </div>
  )
}
