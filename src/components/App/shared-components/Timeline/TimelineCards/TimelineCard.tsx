import React, { FC, useState } from 'react'
import s from '@/components/App/shared-components/Timeline/Timeline.module.scss'
import { ICardInfo } from '@/components/App/shared-components/Timeline/Timeline'
import orangeDot from '@/assets/images/orange-dot.png'
import { useParams } from 'react-router-dom'
import { mainnetNetworkId, testnetNetworkId } from "@/constants";

interface ITimelineCardProps {
    id: number
    cardInfo: ICardInfo
}

interface Params {
    id: string
}

const FOREST_CONTRACT_ADDRESS =
    window.config.FOREST_CONTRACT_ADDRESS ??
    '0x3aA5283D113BeD501dC4e773EBB1A2f8299207C0'

const NETWORK_ID = window.config.NETWORK_ID ?? '80001'

const TimelineCard: FC<ITimelineCardProps> = ({ id, cardInfo }) => {
    const params: Params = useParams()

    const [showBack, setIsShowBack] = useState<boolean>(false)

    const handleFlip = () => {
        if (cardInfo.flipable && !showBack) {
            setIsShowBack(true)
        }
    }

    return (
        <div className={`${s.cdTimelineBlock} ${id % 2 === 0 ? s.reverse : ''} `}>
            <div className={s.cdTimelineImg}>
                <img src={orangeDot} alt="Picture" />
            </div>
            <div
                onClick={handleFlip}
                className={`${s.cardContainer} ${showBack && s.showBack}`}
            >
                <div
                    className={`${s.cdTimelineContent} ${
                        id % 2 === 0 ? s.arrowLeft : s.arrowRight
                    } ${s[cardInfo.size]}`}
                >
                    <div className={s.cdTimelineContentText}>
                        <span className={s.cdTimelineDate}>{cardInfo.date}</span>
                        <p className={s.colorContrastMedium}>{cardInfo.text}</p>
                        <a href="#" className={`${id % 2 === 0 ? s.disabledText : s.btn}`}>
                            {id % 2 === 0 ? (
                                cardInfo.planterOrganization
                            ) : (
                                <a
                                    className={s.linked}
                                    href={`https://${NETWORK_ID === testnetNetworkId && `testnets.`}opensea.io/assets/${NETWORK_ID === mainnetNetworkId ? 'matic' : 'mumbai'}/${FOREST_CONTRACT_ADDRESS}/${params.id}`}
                                >
                                    {cardInfo.subtext}
                                </a>
                            )}
                        </a>
                    </div>
                    <div
                        className={
                            cardInfo.size === 'sm'
                                ? s.smCardImgContainer
                                : s.mdCardImgContainer
                        }
                    >
                        <img
                            className={
                                cardInfo.size === 'sm'
                                    ? s.timelineContentImgSm
                                    : s.timelineContentImgMd
                            }
                            src={cardInfo.img}
                            alt="timeline content image"
                        />
                    </div>
                </div>
                <div
                    className={`${s.backSide} ${s.cdTimelineContent}  ${
                        s[cardInfo.size]
                    } `}
                >
                    <div className={s.backSideInfo}>
                        <span>caretaker</span>
                        <h2>{cardInfo.planterName}</h2>
                        <p>{cardInfo.planterBio}</p>
                        <button onClick={() => setIsShowBack(false)}>Back</button>
                    </div>
                    <img
                        src={cardInfo.planterPhoto}
                        className={
                            cardInfo.size === 'sm'
                                ? s.timelineContentImgSm
                                : s.timelineContentImgMd
                        }
                        alt="timeline content image"
                    />
                </div>
            </div>
        </div>
    )
}

export default TimelineCard
