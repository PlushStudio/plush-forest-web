import React, { FC, useState } from 'react'
import s from '@/components/Timeline/Timeline.module.scss'
import { ICardInfo } from '@/components/Timeline/Timeline'
import orangeDot from '@/assets/images/orange-dot.png'
import { useParams } from 'react-router-dom'
import { mainnetNetworkId, testnetNetworkId } from "@/constants";
import classNames from "classnames";

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

    const [showBack, setIsShowBack] = useState<boolean>(false)

    switch (cardInfo.size) {
        case 'md': s.md
            break
        case 'xs': s.xs
            break
    }

    const handleFlip = () => {
        if (cardInfo.flipable && !showBack) {
            setIsShowBack(true)
        }
    }

    const timelineStyle = classNames(
      s.cdTimelineBlock,
      { [s.reverse]: id % 2 === 0 }
    )

    const cardContainerStyle = classNames(
      s.cardContainer,
      { [s.showBack]: showBack }
    )

    let cardSize;

    switch (cardInfo.size) {
        case 'xs': cardSize = s.xs
            break
        case 'sm': cardSize = s.sm
            break
        case 'md': cardSize = s.md
            break
        case 'lg': cardSize = s.lg
            break
    }

    const cdTimelineContentStyle = classNames(
      s.cdTimelineContent,
      id % 2 === 0 ? s.arrowLeft : s.arrowRight,
      cardSize
    )

    return (
      <div className={timelineStyle}>
          <div className={s.cdTimelineImg}>
              <img src={orangeDot} alt="Picture" />
          </div>
          <div onClick={handleFlip} className={cardContainerStyle}>
              <div className={cdTimelineContentStyle}>
                  <div className={s.cdTimelineContentText}>
                      <span className={s.cdTimelineDate}>{cardInfo.date}</span>
                      <p className={s.colorContrastMedium}>{cardInfo.text}</p>
                      <a href="#" className={id % 2 === 0 ? s.disabledText : s.btn}>
                          {id % 2 === 0 ? cardInfo.planterOrganization : (
                            <a className={s.linked}
                               href={`https://${NETWORK_ID === testnetNetworkId && `testnets.`}opensea.io/assets/${NETWORK_ID === mainnetNetworkId ? 'matic' : 'mumbai'}/${FOREST_CONTRACT_ADDRESS}/${params.id}`}
                            >
                                {cardInfo.subtext}
                            </a>
                          )}
                      </a>
                  </div>
                  <div className={cardInfo.size === 'sm' ? s.smCardImgContainer : s.mdCardImgContainer}>
                      <img className={cardInfo.size === 'sm' ? s.timelineContentImgSm : s.timelineContentImgMd}
                           src={cardInfo.img}
                           alt="timeline content image"
                      />
                  </div>
              </div>
              <div className={classNames(s.backSide, s.cdTimelineContent, s[cardInfo.size])}>
                  <div className={s.backSideInfo}>
                      <span>caretaker</span>
                      <h2>{cardInfo.planterName}</h2>
                      <p>{cardInfo.planterBio}</p>
                      <button onClick={() => setIsShowBack(false)}>Back</button>
                  </div>
                  <img src={cardInfo.planterPhoto}
                       className={cardInfo.size === 'sm' ? s.timelineContentImgSm : s.timelineContentImgMd}
                       alt="timeline content image"
                  />
              </div>
          </div>
      </div>
    )
}

export default TimelineCard
