import React from "react";
import s from "./About.module.css"
import {Header } from "@/components/common/App/layout-components/Header"
import {HomeText} from "@/components/common/App/shared-components/HomeText";
import {TreeTypeSelector} from "@/components/common/App/shared-components/TreeTypeSelector";
import {GetStartedBtn} from "@/components/common/App/shared-components/GetStartedBtn";
import {HomeFeatureSection1} from "@/components/common/App/shared-components/HomeFeatureSection1";
import {TreesArea} from "@/components/common/App/shared-components/TreesArea/TreesArea";
import {HomeFeatureSection2} from "@/components/common/App/shared-components/HomeFeatureSection2";
import {HomeFeatureSection3} from "@/components/common/App/shared-components/HomeFeatureSection3";
import {Footer} from "@/components/common/App/layout-components/Footer";

export const AboutPage = () => {
    return (
        <>
            <svg style={{position: "absolute", minHeight: 400, zIndex: -1}} xmlns="http://www.w3.org/2000/svg"
                 viewBox="110 300 1140 700">
                <g fill="none">
                    <g fill="#FAFAFA">
                        <path
                            d="M1439.999 0v524.414c-119.69 59.348-236.289 12.964-328.983 11.586-92.693-1.378-237.982 32-438.052 84.78C472.894 673.558 109.483 770.28-.001 615V0h1440z"/>
                    </g>
                </g>
            </svg>
            <div className={s.container}>
                <div className={s.getStartedContentContainer}>
                    <Header/>
                    <HomeText/>
                    <TreeTypeSelector/>
                    <GetStartedBtn/>
                    <TreesArea/>
                </div>
                <div className={s.homeFeatureContainer}>
                    <HomeFeatureSection1/>
                    <HomeFeatureSection2/>
                    <HomeFeatureSection3/>
                </div>
            </div>
            <Footer/>
        </>

    )
}