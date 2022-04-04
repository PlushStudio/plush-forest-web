import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import s from './About.module.css'
import { HomeText } from '@/components/HomeText/HomeText'
import { TreeTypeSelector } from '@/components/TreeTypeSelector/TreeTypeSelector'
import { MainActionButton } from '@/components/MainActionButton/MainActionButton'
import { HomeFeatureSection1 } from '@/components/HomeFeatureSection/HomeFeatureSection1'
import { TreesArea } from '@/components/TreesArea/TreesArea'
import { HomeFeatureSection2 } from '@/components/HomeFeatureSection/HomeFeatureSection2'
import { HomeFeatureSection3 } from '@/components/HomeFeatureSection/HomeFeatureSection3'
import { Footer } from '@/components/Footer/Footer'
import { Category, MatomoEvent, trackEvent } from '@/utils/matomo'
import { useHistory } from "react-router";
import routes from "@/Router/routes";
import { useStore } from 'effector-react'
import { $auth } from "@/store/auth";
import { $walletStore } from "@/store/wallet";
import { $forest, getForestDataFx } from "@/store/forest";
import { CircleLoader } from "@/components/Loader/CircleLoader";

export const AboutPage = () => {
  const { isLoggedIn } = useStore($auth)
  const history = useHistory()
  const walletStore = useStore($walletStore)
  const { treesPrice } = useStore($forest)
  const [isReady, setIsReady] = useState<boolean | undefined>(undefined)

  const [ref, setRef] = useState<MutableRefObject<null>>()
  const accordionRef = useRef(null)

  useEffect(() => {
    setRef(accordionRef)
  }, [accordionRef])

  useEffect(() => {
    if (walletStore) {
      getForestDataFx(walletStore)
    }
  }, [walletStore])

  useEffect(() => {
    if (isLoggedIn) {
      setIsReady(treesPrice.length > 0)
    } else {
      setIsReady(true)
    }
  }, [treesPrice, isLoggedIn])

  useEffect(() => {
    trackEvent(Category.Info, MatomoEvent.PageVisited, 'About')
  }, [])

  const connectWallet = async () => {
    if (!walletStore) {
      throw new Error('Wallet is undefined')
    }

    try {
      await walletStore.wallet.connect()
    } catch (error: any) {
      console.error(error)
    }
  }

  const getStarted = async () => {
    if (!isLoggedIn) {
      trackEvent(Category.Action, MatomoEvent.ButtonPressed, 'Login')
      connectWallet()
    } else {
      history.push(routes.planting)
    }
  }
  return (
    isReady ?
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
            {isLoggedIn && <TreeTypeSelector />}
            <MainActionButton onClick={() => getStarted()} text='Get started' image='next' />
            <TreesArea />
          </div>
          <div className={isLoggedIn ? s.homeFeatureContainer : s.homeFeatureContainerHeight}>
            <HomeFeatureSection1 accordionRef={ref} />
            <HomeFeatureSection2 />
            <HomeFeatureSection3 />
          </div>
        </div>
        <div ref={accordionRef}>
          <Footer />
        </div>
      </> : <CircleLoader />
  )
}
