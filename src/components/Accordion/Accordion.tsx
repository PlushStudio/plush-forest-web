import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import s from './Accordion.module.scss'
import accordionMinus from '@/assets/images/outlinedIcons/outlined-minus.svg'
import accordionPlus from '@/assets/images/outlinedIcons/outlined-plus.svg'
import abstractIconLeaf from '@/assets/images/abstractIcons/abstract-icon-1.svg'
import abstractIconEye from '@/assets/images/abstractIcons/abstract-icon-2.svg'
import abstractIconHeart from '@/assets/images/abstractIcons/abstract-icon-3.svg'
import { $app, setActiveAccordionTabIdEvt } from '@/store/app'
import { useStore } from 'effector-react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { plantYourFutureUrl } from '@/constants'

export const LearnMoreAccordion = () => {
  const { t } = useTranslation()
  const { activeAccordionTabId } = useStore($app)

  const handleTabClick = (tabId: number) => {
    setActiveAccordionTabIdEvt(tabId)
    if (activeAccordionTabId === tabId) {
      setActiveAccordionTabIdEvt(-1)
    }
  }

  const charityListArray: Array<string> = t('HomePage.Accordion.SecondTab.charityList', { returnObjects: true })

  return (
    <div>
      <Accordion activeKey={activeAccordionTabId.toString()} bsPrefix={'accordion'}>
        <Card className={s.card}>
          <Accordion.Toggle
            className={classNames('unselectable', { [s.opened]: activeAccordionTabId === 0 })}
            onClick={() => handleTabClick(0)} as={Card.Header} eventKey='0'>
            How it works
            {activeAccordionTabId === 0
              ? <img alt='close accordion tab' src={accordionMinus} />
              : <img alt='open accordion tab' src={accordionPlus} />
            }
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <div className={s.tabMainBlock}>
                {t('HomePage.Accordion.FirstTab.description')}
              </div>
              <div className={s.tabAdditionalBlockContainer}>
                <div className={s.tabAdditionalBlock}>
                  <div className={s.additionalLeftPull}>
                    <img src={abstractIconLeaf} alt={'leaf icon'} />
                  </div>
                  <div className={classNames(s.additionalRightPull, s.correctionStyle)}>
                    {t('HomePage.Accordion.FirstTab.NGO')}
                  </div>
                </div>
                <div className={s.tabAdditionalBlock}>
                  <div className={s.additionalLeftPull}>
                    <img src={abstractIconEye} alt={'eye icon'} />
                  </div>
                  <div className={s.additionalRightPull}>
                    {t('HomePage.Accordion.FirstTab.ecoMatcher')}
                  </div>
                </div>
                <div className={s.tabAdditionalBlock}>
                  <div className={s.additionalLeftPull}>
                    <img src={abstractIconHeart} alt={'heart icon'} />
                  </div>
                  <div className={s.additionalRightPull}>
                    {t('HomePage.Accordion.FirstTab.plush')}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className={s.card}>
          <Accordion.Toggle
            className={classNames('unselectable', { [s.opened]: activeAccordionTabId === 1 })}
            onClick={() => handleTabClick(1)} as={Card.Header} eventKey='1'>
            About NGO
            {activeAccordionTabId === 1
              ? <img alt='close accordion tab' src={accordionMinus} />
              : <img alt='open accordion tab' src={accordionPlus} />
            }
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='1'>
            <Card.Body>
              <div className={s.tabMainBlock}>
                <p>
                  <b className={s.secondAccordionTitle}>{t('HomePage.Accordion.SecondTab.charityTitle')}</b>
                </p>
                <p>
                  <ul>
                    {charityListArray.map((item, index) => <li key={item + index}>
                      {item}
                    </li>)}
                  </ul>
                  {t('HomePage.Accordion.SecondTab.moreInfoText')}
                  <a href={plantYourFutureUrl}>{plantYourFutureUrl}</a>
                </p>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}
