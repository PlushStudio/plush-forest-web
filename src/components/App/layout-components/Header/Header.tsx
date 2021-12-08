import React, {FC, useContext, useEffect, useState} from 'react'
import s from '@/components/App/layout-components/Header/Header.module.scss'
import { HeaderContent } from './HeaderContent'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import Wallet from '@/components/App/layout-components/Header/NavBar/Wallet/Wallet'

export const Header: FC = () => {
  const [userDetails] = useContext(userDetailsContext)
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)
  const [isOpenDropdownByError, setIsOpenDropdownByError] = useState<boolean | null>(null)
    useEffect(() => {
        if (userDetails.isOpenDropdownByError) {
            setIsOpenDropdownByError(true)
            setIsOpenDropdown(false)
        } else {
            setIsOpenDropdownByError(false)
        }
    }, [userDetails.isOpenDropdownByError, userDetails.isOpenDropdown])

  return (
    <div className={s.headerContainer}>
        <Wallet isOpenDropdown={isOpenDropdownByError ? true : isOpenDropdown}
                setIsOpenDropdown={isOpenDropdownByError ? setIsOpenDropdownByError : setIsOpenDropdown} />
      <HeaderContent />
    </div>
  )
}
