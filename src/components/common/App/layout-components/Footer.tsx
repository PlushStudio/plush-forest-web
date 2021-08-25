import React, {FC, useState} from "react";
import "~/bootstrap/scss/bootstrap.scss";
import s from "@/components/common/App/layout-components/Footer.module.scss";
import {LearnMoreAccordion } from '@/components/common/App/shared-components/Accordion'
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