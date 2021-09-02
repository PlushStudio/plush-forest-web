import React, {ReactHTML} from 'react';
import MessageInfo from "@/components/App/shared-components/Timeline/MessageInfo";
import s from './Timeline.module.scss'
import TimelineCard from "@/components/App/shared-components/Timeline/TimelineCards/TimelineCard";
import heartImg from '@/assets/images/bitmap-copy@2x.png';
import plantImg from '@/assets/images/plant-image.png';
import timelineBase from '@/assets/images/timelinebase.png';

export interface ICardInfo {
    date: string,
    text: string,
    subtext: string,
    img: string,
    size: string
}

const Timeline: React.FC = () => {

    const cardInfo: ICardInfo[] = [
        {
            date: 'Mar 09, 2020',
            text: 'Seedling is dedicated to Jasmin by James Dean.',
            subtext: 'Verify',
            img: heartImg,
            size: 'md'
        },
        {
            date: 'Jan 11, 2020',
            text: 'Cacao seedling was planted in Campoverde, Peru.',
            subtext: 'Meet the planter',
            img: plantImg,
            size: 'sm'
        },
        {
            date: 'Jan 11, 2020',
            text: 'Cacao seedling was planted in Campoverde, Peru.',
            subtext: 'Meet the planter',
            img: heartImg,
            size: 'md'
        }
    ];
    return (
        <div>
            <div className={`${s.container} ${s.cdTimelineContainer}`}>
                <div className={s.greyDot}/>
                {cardInfo.map((item: ICardInfo, index: number) : JSX.Element => {
                    return <TimelineCard id={index + 1} cardInfo={cardInfo[index]}/>
                })}
                <div className={s.timelineBase}>
                    <img src={timelineBase} alt="tree timeline"/>
                </div>
            </div>
            <MessageInfo/>
        </div>
    );
};

export default Timeline;