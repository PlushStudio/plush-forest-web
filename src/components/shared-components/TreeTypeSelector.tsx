import s from "../../assets/styles/data-entry/TreeTypeSelector.module.scss"
import {treesTooltip} from "../../assets/data/treesTooltip";
import oval from "../../assets/images/oval-copy.svg"
import firstSelectorImg from "../../assets/images/img-in-selector-1.png"
import {Button, OverlayTrigger, Popover} from "react-bootstrap";
import {useState, useRef} from "react";

export const TreeTypeSelector = () => {
    const [activeTreeId, setActiveTreeId] = useState(3);

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClickHover = (e: any) => {
        setShow(!show);
        setTarget(e.target);
    };
    const handleClick = (activeTreeId: number) => {
        setActiveTreeId(activeTreeId)
    }

    const popover = (
        <Popover id="popover-basic">
            <div className={s.popoverWrapper}>
                <div>
                    <img className={s.popoverImageContainer} src={firstSelectorImg} alt={"tree"}/>
                </div>
                <div className={s.popoverTextContainer}>
                    <div className={s.popoverTitle}>
                        Caoba
                    </div>
                    <div className={s.popoverContent}>
                        The Caoba or big-leafed mahogany is so much prized for its beauty and durability, that today it
                        became an
                        endangered specie. It’s estimated that 80 to 90 percent of Peruvian mahogany exported to the US
                        is illegally harvested.
                    </div>
                </div>
            </div>
        </Popover>
    );

    return (
        <div className={s.container}>
            <div className={s.header}>Select your tree:</div>
            <div className={s.circlesContainer}>
                {treesTooltip.map((item, index) =>
                    <div ref={ref}>
                        <OverlayTrigger trigger="hover" placement="top" overlay={popover} defaultShow={false}
                                        delay={1000}>
                            <div onClick={() => handleClick(index)}
                                 style={{backgroundImage: `url(/images/tree-0${index}.png)`}}
                                 className={s.circle}>
                                {activeTreeId === index &&
                                <img className={s.ovalSelected} src={oval} alt="oval selected"/>}
                            </div>
                        </OverlayTrigger>
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