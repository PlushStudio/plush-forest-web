import React, {FC} from "react";
import "~/bootstrap/scss/bootstrap.scss";
import s from "@/components/App/layout-components/Footer/Footer.module.scss";
import {LearnMoreAccordion } from '@/components/App/shared-components/Accordion/Accordion'
import {SoilFooterWithContacts} from './SoilFooterWithContacts'

export const Footer: FC = () => {
    return (
        <>
            <div className={s.footerContainer}>
                <div className={s.footerContent}>
                    <div className={s.footerTitle}>Learn more</div>
                    <LearnMoreAccordion/>
                </div>
            </div>
            <SoilFooterWithContacts/>
        </>
    )
}