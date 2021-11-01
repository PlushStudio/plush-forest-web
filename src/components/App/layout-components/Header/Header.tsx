import React, { FC, useState } from 'react'
import s from '@/components/App/layout-components/Header/Header.module.scss'
import { HeaderContent } from './HeaderContent'
import useMetamaskAuth from '@/hooks/useMetamaskAuth'
import api from '@/api/api'

export const Header: FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { login } = useMetamaskAuth()

  const handleLoginButtonClick = async () => {
    try {
      await login(
        new URL(`${api.url}/${api.user.auth.nonce.url}`),
        new URL(`${api.url}/${api.user.auth.login.url}`)
      ).then((r: any) => {
        console.log(r)
      })
      setIsAuthenticated(true)
    } catch {
      confirm('Ошибка, пользователь не зарегистрирован!')
      console.error()
      // TODO Handle errors. Now do nothing (perfect scenario)
    }
  }

  return (
    <div className={s.headerContainer}>
      <HeaderContent />
      <div onClick={() => handleLoginButtonClick()}
           className={s.loginBtn}>{!isAuthenticated ? 'Войти' : 'Пользователь'}
      </div>
    </div>
  )
}
