import React from 'react'

interface TreeProps {
  icon: string;
  className: string
}

export const TooltipedTree = (props: TreeProps): JSX.Element => {
  return (
    <img className={props.className} alt='tree-area' src={props.icon} />
  )
}
