import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import '@/styles/bootstrapOverride/Accordion.scss'
import s from './Accordion.module.scss'
import accordionMinus from '@/assets/images/16-px-1-outlined-minus.svg'
import accordionPlus from '@/assets/images/16-px-1-outlined-plus.svg'
import abstractIconLeaf from '@/assets/images/abstract-icon-1.svg'
import abstractIconEye from '@/assets/images/abstract-icon-2.svg'
import abstractIconHeart from '@/assets/images/abstract-icon-3.svg'
import { $app, setActiveAccordionTabIdEvt } from '@/store/app'
import { useStore } from 'effector-react'
import classNames from 'classnames'

export const LearnMoreAccordion = () => {
  const { activeAccordionTabId } = useStore($app)

  const handleTabClick = (tabId: number) => {
    setActiveAccordionTabIdEvt(tabId)
    if (activeAccordionTabId === tabId) {
      setActiveAccordionTabIdEvt(-1)
    }
  }

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
                To bring this forest to Plush family, we have partnered with Ecomatcher - a
                blockchain
                organization that has developed a unique
                technology to facilitate transparent tree planting between NGOs who plant and
                maintain
                the trees, and the people who want to support this initiative.
                By working with Ecomatcher we are able to provide precise tree tracking and
                ownership
                verification with blockchain technology.
              </div>
              <div className={s.tabAdditionalBlockContainer}>
                <div className={s.tabAdditionalBlock}>
                  <div className={s.additionalLeftPull}>
                    <img src={abstractIconLeaf} alt={'leaf icon'} />
                  </div>
                  <div className={classNames(s.additionalRightPull, s.correctionStyle)}>
                    NGO&apos;s from around the world plant the trees and capture tree data with
                    EcoMatcher&apos;s Treecoder blockchain technology.
                  </div>
                </div>
                <div className={s.tabAdditionalBlock}>
                  <div className={s.additionalLeftPull}>
                    <img src={abstractIconEye} alt={'eye icon'} />
                  </div>
                  <div className={s.additionalRightPull}>
                    EcoMatcher inspects and validates information captured by NGO&apos;s, and
                    offers Plush to purchase any available forests.
                  </div>
                </div>
                <div className={s.tabAdditionalBlock}>
                  <div className={s.additionalLeftPull}>
                    <img src={abstractIconHeart} alt={'heart icon'} />
                  </div>
                  <div className={s.additionalRightPull}>
                    Plush acquires a forest and further extends EcoMatcher’s technology to
                    assign a tree selected by parents to every child&apos;s unique Plush token.
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
            About Plant Your Future NGO
            {activeAccordionTabId === 1
              ? <img alt='close accordion tab' src={accordionMinus} />
              : <img alt='open accordion tab' src={accordionPlus} />
            }
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='1'>
            <Card.Body>
              <div className={s.tabMainBlock}>
                Plant Your Future’s work helps farmers transform deforested and degraded land into productive
                agroforestry
                systems. Put simply, agroforestry combines agriculture with forestry.
                Native fruit and timber trees are planted alongside short-term crops.
                <br /><br />
                <b className={s.secondAccordionTitle}>Since 2009, the charity has:</b>
                <br /><br />
                <ul>
                  <li>
                    Planted a further 35,000 trees that continue to thrive.
                  </li>
                  <li>
                    Achieved certification under the Climate, Community and Biodiversity Standard and the Verified
                    Carbon
                    Standard.
                  </li>
                </ul>
                For more info, please visit: <a href={'https://www.plantyourfuture.org.uk'}>
                  https://www.plantyourfuture.org.uk
                </a>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}
