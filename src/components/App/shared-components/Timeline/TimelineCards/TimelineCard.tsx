import React, {FC} from 'react';
import s from "@/components/App/shared-components/Timeline/Timeline.module.scss";
import {ICardInfo} from "@/components/App/shared-components/Timeline/Timeline";
import orangeDot from '@/assets/images/orange-dot.png';

interface ITimelineCardProps {
    id: number;
    cardInfo: ICardInfo
}

const TimelineCard: FC<ITimelineCardProps> = ({id, cardInfo}) => {

    return (
        <div className={`${s.cdTimelineBlock} ${id % 2 === 0 ? s.reverse : ''}`}>
            <div className={s.cdTimelineImg}>
                <img src={orangeDot} alt="Picture"/>
            </div>

            <div className={s.cardContainer}>
                <div
                    className={`${s.cdTimelineContent} ${id % 2 === 0 ? s.arrowLeft : s.arrowRight} ${s[cardInfo.size]}`}>
                    <div className={s.cdTimelineContentText}>
                        <span className={s.cdTimelineDate}>{cardInfo.date}</span>
                        <p className={s.colorContrastMedium}>{cardInfo.text}</p>
                        <a href="#" className={`${s.btn}`}>{cardInfo.subtext}</a>
                    </div>
                    <img className={cardInfo.size === 'sm' ? s.timelineContentImgSm : s.timelineContentImgMd}
                         src={cardInfo.img} alt="timeline content image"/>
                </div>
            </div>

        </div>
    );
};

export default TimelineCard;