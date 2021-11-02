import React, { useState } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import s from './Accordion.module.scss'
import '@/assets/styles/custom-elements/data-display/Accordion.scss'
import accordionMinus from '@/assets/images/16-px-1-outlined-minus.svg'
import accordionPlus from '@/assets/images/16-px-1-outlined-plus.svg'
import abstractIconLeaf from '@/assets/images/abstract-icon-1.svg'
import abstractIconEye from '@/assets/images/abstract-icon-2.svg'
import abstractIconHeart from '@/assets/images/abstract-icon-3.svg'

export const LearnMoreAccordion = () => {
  const [isOpenTabId, setIsOpenTabId] = useState(-1)

  const handleTabClick = (tabId: number) => {
    isOpenTabId === tabId ? setIsOpenTabId(-1) : setIsOpenTabId(tabId)
  }

  return (
    <Accordion>
      <Card className={s.card}>
        <Accordion.Toggle
          className={`unselectable accordionText ${isOpenTabId === 0 ? s.opened : ''}`}
          onClick={() => handleTabClick(0)} as={Card.Header} eventKey='0'>
          How it works
          {isOpenTabId === 0 ?
            <img alt='show more' src={accordionMinus} /> :
            <img alt='show more' src={accordionPlus} />
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
                <div className={`${s.additionalRightPull}  ${s.correctionStyle}`}>
                  NGO's from around the world plant the trees and capture tree data with
                  EcoMatcher's Treecoder blockchain technology.
                </div>
              </div>
              <div className={s.tabAdditionalBlock}>
                <div className={s.additionalLeftPull}>
                  <img src={abstractIconEye} alt={'eye icon'} />
                </div>
                <div className={s.additionalRightPull}>
                  EcoMatcher inspects and validates information captured by NGO's, and
                  offers Plush to purchase any available forests.
                </div>
              </div>
              <div className={s.tabAdditionalBlock}>
                <div className={s.additionalLeftPull}>
                  <img src={abstractIconHeart} alt={'heart icon'} />
                </div>
                <div className={s.additionalRightPull}>
                  Plush acquires a forest and further extends EcoMatcher’s technology to
                  assign a tree selected by parents to every child's unique Plush token.
                </div>
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className={s.card}>
        <Accordion.Toggle
          className={`unselectable accordionText ${isOpenTabId === 1 ? s.opened : ''}`}
          onClick={() => handleTabClick(1)} as={Card.Header} eventKey='1'>
          About Plant Your Future NGO
          {isOpenTabId === 1 ? <img alt='show more' src={accordionMinus} /> :
            <img alt='show more' src={accordionPlus} />
          }
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='1'>
          <Card.Body>Hello! I'm another body</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}