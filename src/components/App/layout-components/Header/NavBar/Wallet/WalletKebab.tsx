import React from 'react'

interface WalletIcon {
  balance?: number
  walletAddress?: string
  className?: string
}

const WalletKebab = () => {
  const validateBalance = (balance: number) => {
    if (balance < 0) {
      throw new Error('Balance cannot be less than zero')
    }

    return balance
  }

  return (
    <div>

    </div>
  )
}

export default WalletKebab
