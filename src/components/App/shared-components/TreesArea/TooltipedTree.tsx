import React from 'react'
import '@/assets/styles/custom-elements/data-display/Popover.scss'

interface ITooltipedTree {
  name: string;
  icon: string;
  from: string;
  to: string;
  month: string;
  day: number;
  year: number;
  className: string
}

export const TooltipedTree = (props: ITooltipedTree): JSX.Element => {
  return (
      <img className={props.className} alt='tree-area' src={props.icon} />
  )
}