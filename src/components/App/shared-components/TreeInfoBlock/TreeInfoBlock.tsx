import React, {FC} from 'react';
import s from './TreeInfoBlock.module.scss';
import treeInRound from "@/assets/images/tree-in-round.png";
import {ITreeData} from "@/pages/TreeInfo";

interface ITreeInfoBlockProps {
    treeData: ITreeData
}

const TreeInfoBlock: FC<ITreeInfoBlockProps> = ({treeData}) => {

    return (
        <div>
            <div className={s.info}>
                <div>
                    <div className={s.infoTitle}>
                        <p>{treeData.name}</p>
                        <span>{treeData.desc}</span>
                    </div>
                    <div className={s.infoStats}>
                        <div className={s.infoStatsContainerOne}>
                            {treeData.info.map((item, index: number) =>
                                <div key={item + `${index}_`} className={s.infoStatsContainerOneBlock}>
                                    <p>{item.title}</p>
                                    <span>{item.desc}</span>
                                </div>
                            )}

                        </div>

                        <div className={s.infoStatsContainerTwo}>
                            {treeData.subInfo.map((item, index: number) =>
                                <div key={item + `_${index}`} className={s.infoStatsContainerTwoBlock}>
                                    <img src={item.img}/>
                                    <div>
                                        <p>{item.title}</p>
                                        <span>{item.desc}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={s.treeInRound}>
                    <img src={treeInRound} alt="tree"/>
                </div>
            </div>
        </div>
    );
};

export default TreeInfoBlock;