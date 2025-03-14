import React, { FC, useState } from 'react'
import s from '@/components/Timeline/Timeline.module.scss'
import { ICardInfo } from '@/components/Timeline/Timeline'
import orangeDot from '@/assets/images/timeline/orange-dot.png'
import { useParams } from 'react-router-dom'
import { mainnetNetworkId, testnetNetworkId } from '@/constants'
import classNames from 'classnames'

interface ITimelineCardProps {
  id: number
  cardInfo: ICardInfo
}

interface Params {
  id: string
}

const FOREST_CONTRACT_ADDRESS = window.config.FOREST_CONTRACT_ADDRESS ?? import.meta.env.VITE_FOREST_CONTRACT_ADDRESS
const NETWORK_ID = window.config.NETWORK_ID ?? import.meta.env.VITE_NETWORK_ID

const TimelineCard: FC<ITimelineCardProps> = ({ id, cardInfo }) => {
  const params: Params = useParams()

  const [showBackSide, setShowBackSide] = useState<boolean>(false)

  const handleFlip = () => {
    if (cardInfo.flipable && !showBackSide) {
      setShowBackSide(true)
    }
  }

  const timelineStyle = classNames(
    s.timelineBlock,
    { [s.reverse]: id % 2 === 0 }
  )

  const cardContainerStyle = classNames(
    s.cardContainer,
    { [s.showBackSide]: showBackSide }
  )

  let cardSize

  switch (cardInfo.size) {
    case 'xs':
      cardSize = s.xs
      break
    case 'sm':
      cardSize = s.sm
      break
    case 'md':
      cardSize = s.md
      break
    case 'lg':
      cardSize = s.lg
      break
    default:
      cardSize = s.sm
  }

  const timelineContentStyle = classNames(
    s.timelineContent,
    id % 2 === 0 ? s.arrowLeft : s.arrowRight,
    cardSize
  )

  return (
    <div className={timelineStyle}>
      <div className={s.timelineImg}>
        <img src={orangeDot} alt="orange dot" />
      </div>
      <div role={'presentation'}
           onClick={handleFlip}
           className={cardContainerStyle}>
        <div className={timelineContentStyle}>
          <div className={s.timelineContentText}>
            <span className={s.timelineDate}>{cardInfo.date}</span>
            <p className={s.colorContrastMedium}>{cardInfo.text}</p>
            <div className={id % 2 === 0 ? s.disabledText : s.btn}>
              {id % 2 === 0
                ? cardInfo.planterOrganization
                : (
                  <a className={s.linked}
                     target={'_blank'}
                     rel="noreferrer"
                     href={`https://testnets.opensea.io/assets/base_sepolia/${FOREST_CONTRACT_ADDRESS}/${params.id}`}
                  >
                    {cardInfo.subtext}
                  </a>
                  )}
            </div>
          </div>
          <div className={cardInfo.size === 'sm' ? s.smCardImgContainer : s.mdCardImgContainer}>
            <img className={cardInfo.size === 'sm' ? s.timelineContentImgSm : s.timelineContentImgMd}
                 src={cardInfo.img}
                 alt="timeline content"
            />
          </div>
        </div>
        <div className={classNames(s.backSide, s.timelineContent, s[cardInfo.size])}>
          <div className={s.backSideInfo}>
            <span>caretaker</span>
            <h2>{cardInfo.planterName}</h2>
            <p>{cardInfo.planterBio}</p>
            <button onClick={() => setShowBackSide(false)}>Back</button>
          </div>
          <img src={cardInfo.planterPhoto}
               className={cardInfo.size === 'sm' ? s.timelineContentImgSm : s.timelineContentImgMd}
               alt="timeline content"
          />
        </div>
      </div>
    </div>
  )
}

export default TimelineCard
