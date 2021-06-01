import {FC, useState} from "react";
import s from "../../assets/styles/layout/SoilFooterWithContacts.module.scss";
import {Accordion, Card} from "react-bootstrap";
import accordionPlus from "../../assets/images/16-px-1-outlined-plus.svg"
import accordionMinus from "../../assets/images/16-px-1-outlined-minus.svg"

export const SoilFooterWithContacts: FC = () => {

    return (
        <div className={s.soilFooterWithContactsContainer}>
            <div className={s.soilFooterConentWrapper}>
                <div className={s.soilFooterContent}>
                    <div className={s.leftPull}>

                    </div>
                    <div className={s.rightPull}>

                    </div>
                </div>
            </div>
        </div>
    )
}