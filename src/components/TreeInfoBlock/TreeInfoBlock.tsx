import React, { FC } from 'react'
import s from './TreeInfoBlock.module.scss'
import { TreeData } from '@/types/tree/TreeData'
import { ucFirst } from '@/utils/utils'
import plantingTree1 from '@/assets/images/planting-tree/shihuahuaco.png'
import plantingTree2 from '@/assets/images/planting-tree/cacao.png'
import plantingTree3 from '@/assets/images/planting-tree/guaba.png'
import plantingTree4 from '@/assets/images/planting-tree/caoba.png'

interface ITreeInfoBlockProps {
  treeData: TreeData
}

const treeIcons = [plantingTree1, plantingTree2, plantingTree3, plantingTree4]
const treeNames = ['SHIHUAHUACO', 'CACAO', 'GUABA', 'CAOBA']

const TreeInfoBlock: FC<ITreeInfoBlockProps> = ({ treeData }: any) => {
  return (
    <div>
      <div className={s.info}>
        <div>
          <div className={s.infoTitle}>
            <p>{treeData.name}</p>
            <span>{`${ucFirst(treeData.treeType)} - the Amazon’s tree of life.`}</span>
          </div>
          <div className={s.infoStats}>
            <div className={s.infoStatsContainerOne}>
              {treeData.info.map((item: any, index: number) =>
                <div key={item + `${index}_`} className={s.infoStatsContainerOneBlock}>
                  <p>{item.title}</p>
                  <span>{item.desc}</span>
                </div>
              )}
            </div>
            <div className={s.infoStatsContainerTwo}>
              {treeData.subInfo.map((item: any, index: number) =>
                <div key={item + `_${index}`} className={s.infoStatsContainerTwoBlock}>
                  <img src={item.img} />
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
          <img src={treeIcons[treeNames.indexOf(treeData.treeType.toUpperCase())]} className={s.treeImage} alt='tree' />
        </div>
      </div>
    </div>
  )
}

export default TreeInfoBlock