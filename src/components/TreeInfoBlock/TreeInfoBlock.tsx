import React, { FC } from 'react'
import s from './TreeInfoBlock.module.scss'
import { TreeData } from '@/types/tree/TreeData'
import { ucFirst } from '@/utils/utils'
import shihuahuacoTreeImage from '@/assets/images/viewTree/shihuahuaco-viewer.png'
import cacaoTreeImage from '@/assets/images/viewTree/cacao-viewer.png'
import guabaTreeImage from '@/assets/images/viewTree/guaba-viewer.png'
import caobaImage from '@/assets/images/viewTree/caoba-viewer.png'

interface TreeInfoBlockProps {
  treeData: TreeData
}

const treeIcons = [shihuahuacoTreeImage, cacaoTreeImage, guabaTreeImage, caobaImage]
const treeNames = ['SHIHUAHUACO', 'CACAO', 'GUABA', 'CAOBA']

const TreeInfoBlock: FC<TreeInfoBlockProps> = ({ treeData }: any) => {
  const imageSrc = treeIcons[treeNames.indexOf(treeData.type.toUpperCase())]

  return (
    <div className={s.treeInfoContainer}>
      <div className={s.mainInfoContainer}>
        <p className={s.mainInfoTitle}>{treeData.name}</p>
        <span className={s.mainInfoDescription}>{`${ucFirst(treeData.type)} - the Amazon’s tree of life.`}</span>
        <div className={s.statsContainer}>
          <div className={s.textStatsBlock}>
            {treeData.info.map((item: any, index: number) =>
              <div key={item + index} className={s.containerOneBlock}>
                <p className={s.textStatsBlockTitle}>{item.title}</p>
                <span className={s.textStatsBlockDescription}>{item.desc}</span>
              </div>
            )}
          </div>
          <div className={s.widgetsContainer}>
            {treeData.subInfo.map((item: any, index: number) =>
              <div key={item + index} className={s.widgetsContentBlock}>
                <img src={item.img} alt={'sub info'} />
                <div className={s.widgetsContent}>
                  <p className={s.widgetsContentTitle}>{item.title}</p>
                  <span className={s.widgetsContentDescription}>{item.desc}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={s.treeInRound}>
        <img src={imageSrc} className={s.treeImage} alt='tree' />
      </div>
    </div>
  )
}

export default TreeInfoBlock
