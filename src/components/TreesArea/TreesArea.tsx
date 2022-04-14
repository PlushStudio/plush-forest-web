import React from 'react'
import treesArea1 from '@/assets/images/terrain/terrain.png'
import tree01 from '@/assets/images/terrainTrees/tree-01@3x.png'
import tree02 from '@/assets/images/terrainTrees/tree-02@3x.png'
import tree03 from '@/assets/images/terrainTrees/tree-03@3x.png'
import tree04 from '@/assets/images/terrainTrees/tree-04@3x.png'
import tree05 from '@/assets/images/terrainTrees/tree-05@3x.png'
import tree06 from '@/assets/images/terrainTrees/tree-06@3x.png'
import tree07 from '@/assets/images/terrainTrees/tree-07@3x.png'
import tree08 from '@/assets/images/terrainTrees/tree-08@3x.png'
import tree09 from '@/assets/images/terrainTrees/tree-09@3x.png'
import tree10 from '@/assets/images/terrainTrees/tree-10@3x.png'
import { TooltipedTree } from '@/components/TreesArea/TooltipedTree'
import s from './TreesArea.module.scss'
import classNames from 'classnames'

export const TreesArea = () => {
  return (
    <div className={s.treesArea}>
      <img alt='tree-area' src={treesArea1} className={`${s.treesAreaImg} ${s.treesArea1}`} />
      {
        [tree01, tree02, tree03, tree04, tree05, tree06, tree07, tree08, tree09, tree10]
          .map((value, index) => {
            return (
              <TooltipedTree
                key={index}
                className={classNames(s.tree, s[`tree${index + 1}`])}
                icon={value} />
            )
          })
      }
    </div>
  )
}
