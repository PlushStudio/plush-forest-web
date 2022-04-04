import React from 'react'
import s from './HomeFeatureSection.module.scss'
import womanWithPlant from '@/assets/images/woman-with-plants.png'
import { setActiveAccordionTabId } from "@/store/app";

export const HomeFeatureSection1 = ({ accordionRef }: any) => {

  const scrollToAccordion = () => {
    setActiveAccordionTabId(0)
    if (accordionRef && accordionRef.current) {
      accordionRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={s.container}>
      <div className={s.imageBlock}>
        <img
          className={s.womanWithPlant}
          src={womanWithPlant}
          alt="two birds"
        />
      </div>
      <div className={s.firstContainerText}>
        <span className={s.title}>Plant a tree. Celebrate life.</span>
        <span className={s.description}>
          On average, one hectare of Amazon forest conserves 130 tons of carbon
          per year. But the carbon offset is only the beginning. This agroforest
          will be home to hundreds of animal and plant species found nowhere
          else in the world. <br />
          <br />
          The forest will also provide much needed support to remote farming
          communities, by giving them the necessary resources to lift them out
          of poverty.
        </span>
        <span onClick={() => scrollToAccordion()} className={s.link}>How it works</span>
      </div>
    </div>
  )
}
