import React from 'react'
import s from './Timeline.module.scss'
import TimelineCard from '@/components/Timeline/TimelineCards/TimelineCard'
import heartImg from '@/assets/images/heartIcon/heart-icon@2x.png'
import timelineBase from '@/assets/images/timeline/timelinebase.png'
import classNames from 'classnames'
import { CardSize } from '@/types/timeline/CardSize'
import MessageInfo from '@/components/Timeline/MessageInfo'

export interface ICardInfo {
  date: string,
  text: string,
  img: string,
  size: CardSize,
  subtext?: string,
  planterName?: string
  planterPhoto?: string,
  planterOrganization?: string,
  planterBio?: string,
  flipable?: boolean,
}

interface TimelineInfo {
  timelineInfo: {
    firstBlockInfo: string,
    secondBlockInfo: string,
    imageLink: string,
    planterName: string,
    planterOrganization: string,
    dedicatedDate: string,
    plantedDate: string,
    planterBio: string,
    planterPhoto: string,
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
      planterOrganization: `Planted by: ${timelineInfo.planterOrganization}`,
      img: timelineInfo.imageLink,
      planterPhoto: timelineInfo.planterPhoto,
      size: 'sm',
      flipable: true,
      planterName: timelineInfo.planterName,
      planterBio: timelineInfo.planterBio
    }
  ]
  return (
    <>
      <div className={classNames(s.container, s.timelineContainer)}>
        <div className={s.greyDot} />
        {cardInfo.map((item: ICardInfo, index: number): JSX.Element => {
          return <TimelineCard key={item.img + index} id={index + 1} cardInfo={cardInfo[index]} />
        })}
        <div className={s.timelineBase}>
          <img src={timelineBase} alt="tree timeline" />
        </div>
      </div>
      <MessageInfo />
    </>
  )
}

export default Timeline
