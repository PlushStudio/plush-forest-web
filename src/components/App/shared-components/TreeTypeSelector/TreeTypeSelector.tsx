import React, {useState} from 'react'
import s from './TreeTypeSelector.module.scss'
import {treesTooltip} from '@/assets/data/treesTooltip'
import oval from '@/assets/images/oval-copy.svg'
import firstSelectorImg from '@/assets/images/img-in-selector-1.png'
import treeIcon0 from '@/assets/images/treeIcon-01.png';
import treeIcon1 from '@/assets/images/treeIcon-02.png';
import treeIcon2 from '@/assets/images/treeIcon-03.png';
import treeIcon3 from '@/assets/images/treeIcon-04.png';
import {OverlayTrigger, Popover} from 'react-bootstrap'


export const TreeTypeSelector = () => {
    const [activeTreeId, setActiveTreeId] = useState(3)

    const handleClick = (activeTreeId: number) => {
        setActiveTreeId(activeTreeId)
        console.log(activeTreeId)
    }

    const TreeTypeSelectorImages = [treeIcon0, treeIcon1, treeIcon2, treeIcon3]

    const popover = (
        <Popover id='popover-basic'>
            <div className={s.popoverWrapper}>
                <div>
                    <img className={s.popoverImageContainer} src={firstSelectorImg} alt={'tree'}/>
                </div>
                <div className={s.popoverTextContainer}>
                    <div className={s.popoverTitle}>
                        Caoba
                    </div>
                    <div className={s.popoverContent}>
                        The Caoba or big-leafed mahogany is so much prized for its beauty and durability, that today it
                        became an
                        endangered specie. It’s estimated that 80 to 90 percent of Peruvian mahogany exported to the US
                        is illegally harvested.
                    </div>
                </div>
            </div>
        </Popover>
)
    return (
        <div className={s.container}>
            <div className={s.header}>Select your tree:</div>
            <div className={s.circlesContainer}>
                {treesTooltip.map((item: any, index: number) =>
                    <OverlayTrigger trigger='hover' placement='top' overlay={popover} defaultShow={false} delay={300}>
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
                    Total trees: <b className={s.numberValue}>1000</b>,
                </div>
                <div className={s.treesCountBold}>
                    Available: <b className={s.numberValue}>658</b>
                </div>
            </div>
        </div>
    )
}
