import React from 'react'
import s from './MessageInfo.module.scss'

const MessageInfo: React.FC = () => {
  return (
    <div className={s.messageInfo}>
      <p>Your tree is managed by <span>Plant Your Future</span>
        - a sustainable agroforestry organization dedicated
        to restoring the Amazon by helping rainforest communities to plant native trees and improve
        their livelihoods.</p>
      <span className={s.bottomText}>We are all connected</span>
    </div>
  )
}

export default MessageInfo
