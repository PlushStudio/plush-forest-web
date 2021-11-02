import classnames from 'classnames'
import React, { FC } from 'react'
import styles from './StyledText.module.css'

type Family = keyof typeof families
type Size = keyof typeof sizes
type Weight = keyof typeof weights
type Color = keyof typeof colors

const families = {
  moranga: styles.moranga,
  avenir: styles.avenir,
  avenirDemi: styles.avenirDemi,
}

const sizes = {
  s14: styles.s14,
  s16: styles.s16,
  s20: styles.s20,
  s22: styles.s22,
  s28: styles.s28,
  s32: styles.s32,
}

const weights = {
  normal: '',
  w500: styles.w500,
}

const colors = {
  darkGray: styles.darkGray,
  white: styles.white,
  gray500: styles.gray500,
  gray800: styles.gray800,
  rose500t90: styles.rose500t90,
  middleGray: styles.middleGray,
}

interface IText {
  family: Family
  size: Size
  weight?: Weight
  color?: Color
  className?: string
}

const Text: FC<IText> = ({
  family,
  size,
  weight = 'normal',
  color = 'white',
  className,
  children,
}) => {
  const style = classnames(
    families[family],
    sizes[size],
    weights[weight],
    colors[color],
    className
  )

  return <span className={style}>{children}</span>
}

export default Text
