import React from 'react'
import { OverlayTrigger } from 'react-bootstrap'
import s from './TooltipedTree.module.scss'
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

  const popover: JSX.Element = (
    <>
      <div className={s.popoverMainText}>
        {`From ${props.from} to ${props.to}`}
      </div>
      <div className={s.popoverMinorText}>
        Dedicated: {`${props.month} ${props.day} ${props.year}`}
      </div>
      <div className={s.popoverActionText}>
        View tree
      </div>
    </>
  )

  return (
    <OverlayTrigger trigger='focus' placement='bottom' overlay={popover} delay={300}>
      <img className={props.className} alt='tree-area' src={props.icon} />
    </OverlayTrigger>
  )
}