import React from 'react'
import MessageInfo from '@/components/App/shared-components/Timeline/MessageInfo'
import s from './Timeline.module.scss'
import TimelineCard from '@/components/App/shared-components/Timeline/TimelineCards/TimelineCard'
import heartImg from '@/assets/images/bitmap-copy@2x.png'
import timelineBase from '@/assets/images/timelinebase.png'

export interface ICardInfo {
  date: string,
  text: string,
  subtext?: string,
  img: string,
  size: string,
  planter?: string
}

interface TimelineInfo {
  timelineInfo: {
    firstBlockInfo: string,
    secondBlockInfo: string,
    imageLink: string,
    planter: string,
    dedicatedDate: string,
    plantedDate: string
  }
}

const Timeline = ({ timelineInfo }: TimelineInfo) => {
  const cardInfo: ICardInfo[] = [
    {
      date: timelineInfo.dedicatedDate,
      text: timelineInfo.firstBlockInfo.split('.')[0],
      subtext: 'Verify',
      img: heartImg,
      size: 'md'
    },
    {
      date: timelineInfo.plantedDate,
      text: timelineInfo.secondBlockInfo.split('.')[0],
      planter: `Planted by: ${timelineInfo.planter}`,
      img: timelineInfo.imageLink,
      size: 'sm'
    }
  ]
  return (
    <div>
      <div className={`${s.container} ${s.cdTimelineContainer}`}>
        <div className={s.greyDot} />
        {cardInfo.map((item: ICardInfo, index: number): JSX.Element => {
          return <TimelineCard key={item.text + index} id={index + 1} cardInfo={cardInfo[index]} />
        })}
        <div className={s.timelineBase}>
          <img src={timelineBase} alt='tree timeline' />
        </div>
      </div>
      <MessageInfo />
    </div>
  )
}

export default Timeline