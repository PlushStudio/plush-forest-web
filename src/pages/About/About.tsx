import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import s from './About.module.scss'
import { HomeText } from '@/components/HomeText/HomeText'
import { TreeTypeSelector } from '@/components/TreeTypeSelector/TreeTypeSelector'
import { MainActionButton } from '@/components/MainActionButton/MainActionButton'
import { FirstFeatureSection } from '@/components/HomeFeatureSection/FirstFeatureSection'
import { TreesArea } from '@/components/TreesArea/TreesArea'
import { SecondFeatureSection } from '@/components/HomeFeatureSection/SecondFeatureSection'
import { ThirdFeatureSection } from '@/components/HomeFeatureSection/ThirdFeatureSection'
import { Footer } from '@/components/Footer/Footer'
import { Category, MatomoEvent, trackEvent } from '@/utils/matomo'
import { useHistory } from 'react-router'
import routes from '@/Router/routes'
import { useStore } from 'effector-react'
import { $auth } from '@/store/auth'
import { $walletStore } from '@/store/wallet'
import { $forest, getForestDataFx } from '@/store/forest'
import { CircleLoader } from '@/components/Loader/CircleLoader'
import { useTranslation } from 'react-i18next'
import heroWave from '../../assets/images/heroWave.svg'

export const AboutPage = () => {
  const { isLoggedIn } = useStore($auth)
  const history = useHistory()
  const { t } = useTranslation()
  const walletStore = useStore($walletStore)
  const { treesInfo } = useStore($forest)
  const [isReady, setIsReady] = useState<boolean | undefined>(undefined)

  const [ref, setRef] = useState<MutableRefObject<null>>()
  const accordionRef = useRef(null)

  useEffect(() => {
    setRef(accordionRef)
  }, [accordionRef])

  useEffect(() => {
    if (walletStore) {
      if (treesInfo.length === 0) {
        getForestDataFx(walletStore)
      }
    }
  }, [walletStore])

  useEffect(() => {
    if (isLoggedIn) {
      setIsReady(treesInfo.length > 0)
    } else {
      setIsReady(true)
    }
  }, [treesInfo, isLoggedIn])

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
    isReady
      ? <>
       <img src={heroWave} className={s.heroWave} alt={'hero wave'}/>
        <div className={'container'}>
          <div className={s.getStartedContentContainer}>
            <HomeText />
            {isLoggedIn && <TreeTypeSelector />}
            <MainActionButton onClick={() => getStarted()} text={t('HomePage.GetStartedButton')} image='next' />
            <TreesArea />
          </div>
          <div className={isLoggedIn ? s.homeFeatureContainer : s.homeFeatureContainerHeight}>
            <FirstFeatureSection accordionRef={ref} />
            <SecondFeatureSection />
            <ThirdFeatureSection />
          </div>
        </div>
        <div className={s.footerContainer} ref={accordionRef}>
          <Footer />
        </div>
      </>
      : <CircleLoader />
  )
}
