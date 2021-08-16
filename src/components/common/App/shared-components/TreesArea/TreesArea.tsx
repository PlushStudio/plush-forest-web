import React from 'react'
import treesArea1 from '@/assets/images/fill-29.svg'
import treesArea2 from '@/assets/images/fill-34.svg'
import treesArea3 from '@/assets/images/fill-39.svg'
import treesArea4 from '@/assets/images/fill-74.svg'
import treesArea5 from '@/assets/images/fill-79.svg'
import treesArea6 from '@/assets/images/fill-84.svg'
import treesArea7 from '@/assets/images/fill-89.svg'
import treesArea8 from '@/assets/images/fill-94.svg'
import treesArea9 from '@/assets/images/fill-99.svg'
import tree01 from '@/assets/images/tree-01@3x.png'
import tree02 from '@/assets/images/tree-02@3x.png'
import tree03 from '@/assets/images/tree-03@3x.png'
import tree04 from '@/assets/images/tree-04@3x.png'
import tree05 from '@/assets/images/tree-05@3x.png'
import tree06 from '@/assets/images/tree-06@3x.png'
import tree07 from '@/assets/images/tree-07@3x.png'
import tree08 from '@/assets/images/tree-08@3x.png'
import tree09 from '@/assets/images/tree-09@3x.png'
import tree10 from '@/assets/images/tree-10@3x.png'
import treesTooltipData from '@/assets/data/Trees'
import { TooltipedTree } from '@/components/common/App/shared-components/TreesArea/TooltipedTree'
import s from '@/assets/styles/data-display/TreesArea.module.css'

export const TreesArea = () => {
  return (
    <div className={s.treesArea}>
      <img alt='tree-area' src={treesArea1} className={`${s.treesAreaImg} ${s.treesArea1}`} />
      {
        [tree01, tree02, tree03, tree04, tree05, tree06, tree07, tree08, tree09, tree10]
          .map((value, index) => {
            return (
              <TooltipedTree className={`${s.tree} ${s[`tree${index + 1}`]}`}
                             from={treesTooltipData[index].from}
                             to={treesTooltipData[index].to}
                             icon={value}
                             day={treesTooltipData[index].day}
                             year={treesTooltipData[index].year}
                             month={treesTooltipData[index].month}
                             name={treesTooltipData[index].name} />
            )
          })
      }
      {
        [treesArea1, treesArea2, treesArea3, treesArea4, treesArea5, treesArea6, treesArea7, treesArea8, treesArea9]
          .map((value, index) => {
            return (
              <img alt='tree-area' src={value} className={`${s.treesAreaImg} ${s['treesArea' + Number(++index)]}`} />
            )
          })
      }
    </div>
  )
}