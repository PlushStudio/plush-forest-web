import React, { ReactHTML, useEffect, useState } from 'react'
import MessageInfo from "@/components/App/shared-components/Timeline/MessageInfo";
import s from './Timeline.module.scss'
import TimelineCard from "@/components/App/shared-components/Timeline/TimelineCards/TimelineCard";
import heartImg from '@/assets/images/bitmap-copy@2x.png';
import timelineBase from '@/assets/images/timelinebase.png';
import { log } from 'util'

export interface ICardInfo {
    date: string,
    text: string,
    subtext: string,
    img: string,
    size: string
}

interface TimelineInfo {
    firstBlockInfo: string,
    secondBlockInfo: string,
}

const Timeline = (timelineInfo: any) => {
    const [timelineData, setTimelineData] = useState(timelineInfo)

    useEffect(() => {
        setTimelineData(timelineInfo)
    }, [timelineInfo])

    const cardInfo: ICardInfo[] = [
        {
            date: 'Mar 09, 2020',
            text: timelineInfo.timelineInfo.firstBlockInfo.split('.')[0],
            subtext: 'Verify',
            img: heartImg,
            size: 'md'
        },
        {
            date: 'Jan 11, 2020',
            text: timelineInfo.timelineInfo.secondBlockInfo.split('.')[0],
            subtext: 'Meet the planter',
            img: timelineInfo.timelineInfo.imageLink,
            size: 'sm'
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