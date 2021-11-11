import React, { useContext, useState } from 'react'
import s from './TreeTypeSelector.module.scss'
import {treesTooltip} from '@/assets/data/treesTooltip'
import oval from '@/assets/images/oval-copy.svg'
import treeIcon0 from '@/assets/images/treeIcon-01.png';
import treeIcon1 from '@/assets/images/treeIcon-02.png';
import treeIcon2 from '@/assets/images/treeIcon-03.png';
import treeIcon3 from '@/assets/images/treeIcon-04.png';
import selectorCaobaImg from '@/assets/images/selector-caoba-image.png'
import selectorCacaoImg from '@/assets/images/selector-cacao-image.png';
import selectorGuabaImg from '@/assets/images/selector-guaba-image.png';
import selectorShihuahuacoImg from '@/assets/images/selector-shihuahuaco-image.png';
import {OverlayTrigger, Popover} from 'react-bootstrap'
import { userDetailsContext } from '@/context/UserDetailsProvider'

const selectorTreePreviews = [selectorCaobaImg,selectorCacaoImg,selectorShihuahuacoImg,selectorGuabaImg]
export const TreeTypeSelector = () => {
    const [activeTreeId, setActiveTreeId] = useState(3)
    const [userDetails, setUserDetails] = useContext(userDetailsContext)

    const handleClick = (activeTreeId: number) => {
        setActiveTreeId(activeTreeId)
        setUserDetails({
            ...userDetails,
            treeTypeIdToPlant: activeTreeId
        })
    }

    const TreeTypeSelectorImages = [treeIcon0, treeIcon1, treeIcon2, treeIcon3]

    const popover = (index: number) => {
        return (
          <Popover id='popover-basic'>
              <div className={s.popoverWrapper}>
                  <div>
                      <img className={s.popoverImageContainer} src={selectorTreePreviews[index]} alt={'tree'}/>
                  </div>
                <div className={s.popoverContent}>
                  <div className={s.popoverTextContainer}>
                    <div className={s.popoverTitle}>
                      {treesTooltip[index].name}
                    </div>
                    <div className={s.popoverTextAboutTree}>
                      {treesTooltip[index].description}
                    </div>
                  </div>
                  <div className={s.popoverFooterContainer}>
                    <div className={s.popoverFooter}>
                      <div className={s.footerItem}>
                        <div className={s.footerItemValue}>{`${treesTooltip[index].height}'`}</div>
                        <div className={s.footerItemTitle}>Height</div>
                      </div>
                      <div className={s.footerItem}>
                        <div className={s.footerItemValue}>{`${treesTooltip[index].diameter}'`}</div>
                        <div className={s.footerItemTitle}>Diameter</div>
                      </div>
                      <div className={s.footerItem}>
                        <div className={s.footerItemValue}>{treesTooltip[index].lifespanYears}</div>
                        <div className={s.footerItemTitle}>Lifespan years</div>
                      </div>
                      <div className={s.footerItem}>
                        <div className={s.footerItemValue}>{treesTooltip[index].conservationStatus}</div>
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
                {treesTooltip.map((item: any, index: number) =>
                    <OverlayTrigger key={index} trigger='hover' placement='top' overlay={popover(index)} defaultShow={false} delay={300}>
                        <div className={s.circleContainer} onClick={() => handleClick(index)}>
                            <img className={s.circle} src={TreeTypeSelectorImages[index]}/>
                            {activeTreeId === index &&
                            <img className={s.ovalSelected} src={oval} alt='oval selected'/>}
                        </div>
                    </OverlayTrigger>
                )}
            </div>
            <div className={s.footer}>
                <div className={s.treesCountBold}>
                    Total trees: <b className={s.numberValue}>1000</b>
                </div>
            </div>
        </div>
    )
}
