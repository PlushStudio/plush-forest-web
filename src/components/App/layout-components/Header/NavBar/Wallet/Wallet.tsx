import classnames from 'classnames'
import React from 'react'
import { FC } from 'react'
import s from './Wallet.module.scss'
import walletIcon from '@/assets/images/24-px-2-1-px-outline-wallet.svg'
import StyledText from '../StyledText/StyledText'
import childIcon from '@/assets/images/combined-shape@2x.png'

interface IWallet {
  balance?: number
  walletAddress?: string
  className?: string
}

/**
 * Cuts the string and adds dots in the middle
 * @param id Wallet id
 * @returns Wallet id in format 0xXXXX...XXXX
 */
const cutWalletPublicId = (id: string) => {
  return `${id.substr(0, 6)}...${id.substr(id.length - 4, 4)}`
}

const Wallet: FC<IWallet> = ({ balance = 0, walletAddress, className }) => {
  const style = classnames(s.wallet, className)

  const validateBalance = (balance: number) => {
    if (balance < 0) {
      throw new Error('Balance cannot be less than zero')
    }

    return balance
  }

  return (
    <div className={style}>
      <img src={walletIcon} alt="wallet" />
      <StyledText
        family="avenir"
        weight="w500"
        size="s14"
        color="rose500t90"
        className={s.balance}
      >
        {validateBalance(balance)} Plai
      </StyledText>
      <div className={s.profile}>
        <StyledText family="avenir" size="s14" color="gray800">
          {walletAddress ? cutWalletPublicId(walletAddress) : ''}
        </StyledText>
        <img className={s.childIcon} src={childIcon}/>
      </div>
    </div>
  )
}

export default Wallet
