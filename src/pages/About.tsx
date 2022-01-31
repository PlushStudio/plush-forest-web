import React, { useContext, useEffect } from 'react'
import s from './About.module.css'
import { HomeText } from '@/components/App/shared-components/HomeText/HomeText'
import { TreeTypeSelector } from '@/components/App/shared-components/TreeTypeSelector/TreeTypeSelector'
import { MainActionButton } from '@/components/App/shared-components/MainActionButton/MainActionButton'
import { HomeFeatureSection1 } from '@/components/App/shared-components/HomeFeatureSection/HomeFeatureSection1'
import { TreesArea } from '@/components/App/shared-components/TreesArea/TreesArea'
import { HomeFeatureSection2 } from '@/components/App/shared-components/HomeFeatureSection/HomeFeatureSection2'
import { HomeFeatureSection3 } from '@/components/App/shared-components/HomeFeatureSection/HomeFeatureSection3'
import { Footer } from '@/components/App/layout-components/Footer/Footer'
import { Category, MatomoEvent, trackEvent } from '@/utils/matomo'
import api from '@/api/api'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import useMetamaskAuth from '@/hooks/useMetamaskAuth'
import { useHistory } from "react-router";
import routes from "@/components/Router/routes";

const NETWORK_ID = window.config.NETWORK_ID ?? import.meta.env.VITE_NETWORK_ID

export const AboutPage = () => {
  const { login } = useMetamaskAuth()
  const [userDetails, setUserDetails] = useContext(userDetailsContext)
  const history = useHistory()

  useEffect(() => {
    trackEvent(Category.Info, MatomoEvent.PageVisited, 'About')
  }, [])

  const checkWalletConnection = async () => {
    if (userDetails.address === undefined) {
      trackEvent(Category.Action, MatomoEvent.ButtonPressed, 'Login')
      try {
        await login(
          new URL(`${api.url}/${api.user.auth.nonce.url}`),
          new URL(`${api.url}/${api.user.auth.login.url}`)
        )
      } catch {
        // TODO Handle errors. Now do nothing (perfect scenario)
      }
    }
    if (userDetails.hasToken === undefined) {
      setUserDetails({
        ...userDetails,
        isOpenDropdown: !userDetails.isOpenDropdown
      })
    } else {
      history.push(routes.planting)
    }
  }
  return (
    <>
      <svg style={{ position: 'absolute', minHeight: 400, zIndex: -1 }} xmlns='http://www.w3.org/2000/svg'
        viewBox='110 300 1140 700'>
        <g fill='none'>
          <g fill='#FAFAFA'>
            <path
              d='M1439.999 0v524.414c-119.69 59.348-236.289 12.964-328.983 11.586-92.693-1.378-237.982 32-438.052 84.78C472.894 673.558 109.483 770.28-.001 615V0h1440z' />
          </g>
        </g>
      </svg>
      <div className={s.container}>
        <div className={s.getStartedContentContainer}>
          <HomeText />
          {userDetails.networkId === Number(NETWORK_ID) && <TreeTypeSelector />}
          <MainActionButton onClick={() => checkWalletConnection()} text='Get started' image='next' />
          <TreesArea />
        </div>
        <div className={userDetails.balance ? s.homeFeatureContainer : s.homeFeatureContainerHeight}>
          <HomeFeatureSection1 />
          <HomeFeatureSection2 />
          <HomeFeatureSection3 />
        </div>
      </div>
      <Footer />
    </>

  )
}