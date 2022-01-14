import React, { useContext, useState } from 'react'
import s from './TreeTypeSelector.module.scss'
import { treesTooltip } from '@/assets/data/TreesTooltip'
import oval from '@/assets/images/oval-copy.svg'
import treeIcon0 from '@/assets/images/tree-icon-selector/shihuahuaco.png'
import treeIcon1 from '@/assets/images/tree-icon-selector/cacao.png'
import treeIcon2 from '@/assets/images/tree-icon-selector/guaba.png'
import treeIcon3 from '@/assets/images/tree-icon-selector/caoba.png'
import selectorCaobaImg from '@/assets/images/tree-type-selector/caoba.png'
import selectorCacaoImg from '@/assets/images/tree-type-selector/cacao.png'
import selectorGuabaImg from '@/assets/images/tree-type-selector/guaba.png'
import selectorShihuahuacoImg from '@/assets/images/tree-type-selector/shihuahuaco.png'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { userDetailsContext } from '@/context/UserDetailsProvider'

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
  const [userDetails, setUserDetails] = useContext(userDetailsContext)

  const handleClick = (activeTreeId: number) => {
    setActiveTreeId(activeTreeId)
    setUserDetails({
      ...userDetails,
      treeTypeIdToPlant: activeTreeId
    })
  }

  const TreeTypeSelectorImages = [treeIcon0, treeIcon1, treeIcon2, treeIcon3]

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
        {userDetails?.treesCount?.map((count: any, index: number) =>
          count !== 0 && <OverlayTrigger key={index} trigger='hover' placement='top' overlay={popover(treesTooltip[index], index)}
            defaultShow={false}
            delay={300}>
            <div className={s.circleContainer} onClick={() => handleClick(index)}>
              <img className={s.circle} src={TreeTypeSelectorImages[index]} alt={'tree type image'} />
              {activeTreeId === index &&
                <img className={s.ovalSelected} src={oval} alt='oval selected' />}
            </div>
          </OverlayTrigger>
        )}
      </div>
    </div>
  )
}
