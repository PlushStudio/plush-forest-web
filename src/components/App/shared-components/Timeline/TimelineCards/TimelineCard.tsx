import React, { FC } from 'react'
import s from '@/components/App/shared-components/Timeline/Timeline.module.scss'
import { ICardInfo } from '@/components/App/shared-components/Timeline/Timeline'
import orangeDot from '@/assets/images/orange-dot.png'
import { useParams } from 'react-router-dom'

interface ITimelineCardProps {
  id: number;
  cardInfo: ICardInfo
}

interface Params {
  id: string
}

const VITE_NETWORK_ID = window.config.FOREST_CONTRACT_ADDRESS ?? '0xd5015643F38A06b2962283Ec0B9fF555812Adcd0'

const TimelineCard: FC<ITimelineCardProps> = ({ id, cardInfo }) => {
const params: Params = useParams()
  return (
    <div className={`${s.cdTimelineBlock} ${id % 2 === 0 ? s.reverse : ''}`}>
      <div className={s.cdTimelineImg}>
        <img src={orangeDot} alt='Picture' />
      </div>
      <div className={s.cardContainer}>
        <div
          className={`${s.cdTimelineContent} ${id % 2 === 0 ? s.arrowLeft : s.arrowRight} ${s[cardInfo.size]}`}>
          <div className={s.cdTimelineContentText}>
            <span className={s.cdTimelineDate}>{cardInfo.date}</span>
            <p className={s.colorContrastMedium}>{cardInfo.text}</p>
            <a href='#' className={`${id % 2 === 0 ? s.disabledText : s.btn}`}>
              {id % 2 === 0 ? cardInfo.planter :
                <a className={s.linked} href={`https://testnets.opensea.io/assets/${VITE_NETWORK_ID}/${params.id}`}>{cardInfo.subtext}</a>}</a>
          </div>
          <div className={cardInfo.size === 'sm' ? s.smCardImgContainer : s.mdCardImgContainer}>
            <img className={cardInfo.size === 'sm' ? s.timelineContentImgSm : s.timelineContentImgMd}
                 src={cardInfo.img} alt='timeline content image' />
          </div>

        </div>
      </div>

    </div>
  )
}

export default TimelineCard