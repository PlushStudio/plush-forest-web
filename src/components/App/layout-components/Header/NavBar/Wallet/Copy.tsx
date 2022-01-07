import React, { FC, useState } from 'react'
import s from './Copy.module.scss'
import copyAddressIcon from "@/assets/images/wallet/24-px-1-outlined-copy@2x.png";

const Copy: FC<{ address: string }> = ({ address }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address)
    setIsCopied(true)
  };

  return (
    <img onClick={() => copyToClipboard()}
      alt={'copy address icon'}
      className={`${s.copyAddressIcon} ${isCopied ? s.copied : ''}`}
      src={copyAddressIcon} />
  )
}

export default Copy;
