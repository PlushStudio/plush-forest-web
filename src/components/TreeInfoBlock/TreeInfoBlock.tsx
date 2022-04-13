import React, { FC } from 'react'
import s from './TreeInfoBlock.module.scss'
import { TreeData } from '@/types/tree/TreeData'
import { ucFirst } from '@/utils/utils'
import shihuahuacoTreeImage from '@/assets/images/view-tree/shihuahuaco-viewer.png'
import cacaoTreeImage from '@/assets/images/view-tree/cacao-viewer.png'
import guabaTreeImage from '@/assets/images/view-tree/guaba-viewer.png'
import caobaImage from '@/assets/images/view-tree/caoba-viewer.png'

interface TreeInfoBlockProps {
  treeData: TreeData
}

const treeIcons = [shihuahuacoTreeImage, cacaoTreeImage, guabaTreeImage, caobaImage]
const treeNames = ['SHIHUAHUACO', 'CACAO', 'GUABA', 'CAOBA']

const TreeInfoBlock: FC<TreeInfoBlockProps> = ({ treeData }: any) => {
  const imageSrc = treeIcons[treeNames.indexOf(treeData.treeType.toUpperCase())]

  return (
    <div className={s.info}>
      <div>
        <div className={s.infoTitle}>
          <p>{treeData.name}</p>
          <span>{`${ucFirst(treeData.treeType)} - the Amazon’s tree of life.`}</span>
        </div>
        <div className={s.infoStats}>
          <div className={s.infoStatsContainerOne}>
            {treeData.info.map((item: any, index: number) =>
              <div key={item + index} className={s.infoStatsContainerOneBlock}>
                <p>{item.title}</p>
                <span>{item.desc}</span>
              </div>
            )}
          </div>
          <div className={s.infoStatsContainerTwo}>
            {treeData.subInfo.map((item: any, index: number) =>
              <div key={item + index} className={s.infoStatsContainerTwoBlock}>
                <img src={item.img} alt={'sub info'} />
                <div>
                  <p>{item.title}</p>
                  <span>{item.desc}</span>
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
