import React, { useState } from 'react'
import s from './TreeTypeSelector.module.scss'
import { treesTooltip } from '@/assets/data/TreesTooltip'
import oval from '@/assets/images/ovalGradient/oval-gradient.svg'
import shihuahuacoIcon from '@/assets/images/treeIconSelector/shihuahuaco-selector.png'
import cacaoIcon from '@/assets/images/treeIconSelector/cacao-selector.png'
import guabaIcon from '@/assets/images/treeIconSelector/guaba-selector.png'
import caobaIcon from '@/assets/images/treeIconSelector/caoba-selector.png'
import selectorCaobaImg from '@/assets/images/treePopoverImages/caoba.png'
import selectorCacaoImg from '@/assets/images/treePopoverImages/cacao.png'
import selectorGuabaImg from '@/assets/images/treePopoverImages/guaba.png'
import selectorShihuahuacoImg from '@/assets/images/treePopoverImages/shihuahuaco.png'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { useStore } from 'effector-react'
import { $forest } from '@/store/forest'
import { treeNames } from '@/pages/Planting/PlantingLogic'
import { setActiveTreeEvt } from '@/store/app'

interface treeTooltip {
  name: string,
  description: string,
  height?: string,
  diameter?: string,
  lifespanYears?: string,
  conservationStatus?: string
}

const selectorTreePreviews = [selectorShihuahuacoImg, selectorCacaoImg, selectorGuabaImg, selectorCaobaImg]

export const TreeTypeSelector = () => {
  const [activeTreeId, setActiveTreeId] = useState(0)
  const { treesCount } = useStore($forest)

  const handleClick = (activeTreeId: number) => {
    setActiveTreeId(activeTreeId)
    setActiveTreeEvt(treeNames[activeTreeId].toUpperCase())
  }

  const TreeTypeSelectorImages = [shihuahuacoIcon, cacaoIcon, guabaIcon, caobaIcon]

  const popover = (treeTooltip: treeTooltip, index: number) => {
    return (
      <Popover id='popover-basic'>
        <div className={s.popoverWrapper}>
          <div>
            <img className={s.popoverImageContainer} src={selectorTreePreviews[index]} alt={'tree'} />
          </div>
          <div className={s.popoverContent}>
            <div className={s.popoverTextContainer}>
              <div className={s.popoverTitle}>
                {treeTooltip.name}
              </div>
              <div className={s.popoverTextAboutTree}>
                {treeTooltip.description}
              </div>
            </div>
            <div className={s.popoverFooterContainer}>
              <div className={s.popoverFooter}>
                <div className={s.footerItem}>
                  <div className={s.footerItemValue}>{`${treeTooltip.height}'`}</div>
                  <div className={s.footerItemTitle}>Height</div>
                </div>
                <div className={s.footerItem}>
                  <div className={s.footerItemValue}>{`${treeTooltip.diameter}'`}</div>
                  <div className={s.footerItemTitle}>Diameter</div>
                </div>
                <div className={s.footerItem}>
                  <div className={s.footerItemValue}>{treeTooltip.lifespanYears}</div>
                  <div className={s.footerItemTitle}>Lifespan years</div>
                </div>
                <div className={s.footerItem}>
                  <div className={s.footerItemValue}>{treeTooltip.conservationStatus}</div>
                  <div className={s.footerItemTitle}>Conservation Status</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popover>
    )
  }

  return (
    <div className={s.container}>
      <div className={s.header}>Select your tree:</div>
      <div className={s.circlesContainer}>
        {treesCount.map((count: number, index: number) =>
          count !== 0 && <OverlayTrigger key={index} trigger={['hover', 'focus']} placement='top' overlay={popover(treesTooltip[index], index)}
            defaultShow={false}
            delay={300}>
            <div role={'presentation'}
              className={s.circleContainer}
              onClick={() => handleClick(index)}>
              <img className={s.circle}
                src={TreeTypeSelectorImages[index]}
                alt={'tree type'} />
              {activeTreeId === index &&
                <img className={s.ovalSelected} src={oval} alt='oval selected' />}
            </div>
          </OverlayTrigger>
        )}
      </div>
    </div>
  )
}
