import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import s from './TooltipedTree.module.scss'
import '@/assets/styles/custom-elements/data-display/Popover.scss';

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

      <Popover className={"treeTooltipWrapper"} placement='bottom' id='popover-basic'>
        <Popover.Title className={s.popoverTitle} as='h3'>{props.name}</Popover.Title>
        <Popover.Content className={s.popoverContent}>
          <div className={s.popoverMainText}>
            {`From ${props.from} to ${props.to}`}
          </div>
          <div className={s.popoverMinorText}>
            Dedicated: {`${props.month} ${props.day} ${props.year}`}
          </div>
          <div className={s.popoverActionText}>
            View tree
          </div>
        </Popover.Content>
      </Popover>

  )

  return (
    <OverlayTrigger trigger='hover' placement='bottom' overlay={popover} delay={300}>
      <img className={props.className} alt='tree-area' src={props.icon} />
    </OverlayTrigger>
  )
}