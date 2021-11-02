import React, { FC, useContext } from 'react'
import s from './TreeInfoBlock.module.scss'
import { ITreeData } from '@/pages/TreeInfo'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import { ucFirst } from '@/utils'
import plantingTree1 from '@/assets/images/planting-tree-02.png'
import plantingTree2 from '@/assets/images/planting-tree-01.png'
import plantingTree3 from '@/assets/images/planting-tree-03.png'
import plantingTree4 from '@/assets/images/planting-tree-04.png'

interface ITreeInfoBlockProps {
  treeData: ITreeData
}

const treeIcons = [plantingTree1, plantingTree2, plantingTree3, plantingTree4]
const treeNames = ['SHIHUAHUACO', 'CACAO', 'GUABA', 'CAOBA']

const TreeInfoBlock: FC<ITreeInfoBlockProps> = ({ treeData }) => {
  const [userDetails] = useContext(userDetailsContext)
  return (
    <div>
      <div className={s.info}>
        <div>
          <div className={s.infoTitle}>
            <p>{`${userDetails.childName}'s ${ucFirst(treeNames[userDetails.treeTypeIdToPlant])} tree`}</p>
            <span>{`${ucFirst(treeNames[userDetails.treeTypeIdToPlant])} - the Amazon’s tree of life.`}</span>
          </div>
          <div className={s.infoStats}>
            <div className={s.infoStatsContainerOne}>
              {treeData.info.map((item, index: number) =>
                <div key={item + `${index}_`} className={s.infoStatsContainerOneBlock}>
                  <p>{item.title}</p>
                  <span>{item.desc}</span>
                </div>
              )}
            </div>
            <div className={s.infoStatsContainerTwo}>
              {treeData.subInfo.map((item, index: number) =>
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
          <img src={treeIcons[userDetails.treeTypeIdToPlant]} className={s.treeImage} alt='tree' />
        </div>
      </div>
    </div>
  )
}

export default TreeInfoBlock