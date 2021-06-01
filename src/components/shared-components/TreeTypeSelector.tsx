import s from "../../assets/styles/data-entry/TreeTypeSelector.module.scss"
import {treesTooltip} from "../../assets/data/treesTooltip";
import oval from "../../assets/images/oval-copy.svg"
import {useState} from "react";

export const TreeTypeSelector = () => {
    const [activeTreeId, setActiveTreeId] = useState(3);

    const handleClick = (activeTreeId: number) => {
        setActiveTreeId(activeTreeId)
    }

    return (
        <div className={s.container}>
            <div className={s.header}>Select your tree:</div>
            <div className={s.circlesContainer}>
                {treesTooltip.map((item, index) =>
                    <div onClick={() => handleClick(index)} style={{backgroundImage: `url(/images/tree-0${index}.png)`}}
                         className={s.circle}>
                        {activeTreeId === index && <img className={s.ovalSelected} src={oval} alt="oval selected"/>}
                    </div>
                )}
            </div>
            <div className={s.footer}>
                <div className={s.treesCountBold}>
                    Total trees: <b className={s.numberValue}>1000</b>,
                </div>
                <div className={s.treesCountBold}>
                    Available: <b className={s.numberValue}>658</b>
                </div>
            </div>
        </div>
    )
}