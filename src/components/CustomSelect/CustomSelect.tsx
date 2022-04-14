import React, { useEffect, useRef, useState } from 'react'
import '@/components/CustomSelect/CustomSelect.module.scss'
import s from './CustomSelect.module.scss'
import arrowDown from '@/assets/images/outlinedIcons/outlined-chevron-down.png'
import treeIcon0 from '@/assets/images/treeIconSelector/shihuahuaco-selector.png'
import treeIcon1 from '@/assets/images/treeIconSelector/cacao-selector.png'
import treeIcon2 from '@/assets/images/treeIconSelector/guaba-selector.png'
import treeIcon3 from '@/assets/images/treeIconSelector/caoba-selector.png'
import classNames from 'classnames'
import { useStore } from 'effector-react'
import { $forest } from '@/store/forest'
import { useOnClickOutside } from 'usehooks-ts'
import { treeNames } from '@/pages/Planting/PlantingLogic'
import { $app, setActiveTreeEvt } from '@/store/app'

interface TreesInfo {
  name: string,
  label: string
}

interface CustomSelectProps {
  icons: string[],
  itemsInfo: TreesInfo[],
  currency: string,
  className?: string,
  onSelect?: (itemId: number, itemName: string) => void
}

const TreeTypeSelectorImages = [treeIcon0, treeIcon1, treeIcon2, treeIcon3]

export const CustomSelect = ({ icons, itemsInfo, currency, onSelect, className }: CustomSelectProps) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const { treesPrice, treesCount } = useStore($forest)
  const { selectedTreeType } = useStore($app)

  const [selectedItemId, setSelectedItemId] = useState<number>(0)

  const dropdownStyles = classNames(s.dropdown, className, { [s.focused]: isOpen })
  const dropdownBodyStyles = classNames(s.dropdownBody, { [s.dropdownBodyOpen]: isOpen })
  const arrowStyles = classNames(s.dropDownArrow, { [s.rotate180]: isOpen })

  const ref = useRef(null)

  useEffect(() => {
    setSelectedItemId(treeNames.indexOf(selectedTreeType))
  }, [selectedTreeType])

  const handleItemClick = (itemId: number, itemName: string) => {
    if (onSelect) {
      onSelect(itemId, itemName)
    }
    setActiveTreeEvt(itemName.toUpperCase())
    setOpen(false)
  }

  const handleClickOutside = () => {
    setOpen(false)
  }

  const handleClickInside = () => {
    setOpen(!isOpen)
  }

  useOnClickOutside(ref, handleClickOutside)

  return (
    <div role={'presentation'} ref={ref} onClick={handleClickInside} className={dropdownStyles}>
      <div
        className={s.dropdownHeader}
      >
        <div className={s.dropdownHeaderContent}>
          {itemsInfo.map(
            (item: TreesInfo, index: number) =>
              selectedItemId === index && (
                <img
                  key={index}
                  className={s.dropdownHeaderPrefix}
                  src={icons[index]}
                  alt={'tree icon'}
                />
              )
          )}
          <div className={s.headerContentContainer}>
            <h2>
              {itemsInfo.find((item: TreesInfo, index: number) => index === selectedItemId)?.name}
            </h2>
            <p>{itemsInfo.find((item: TreesInfo, index: number) => index === selectedItemId)?.label}</p>
          </div>
        </div>
        <div className={s.dropdownHeaderRightPull}>
          <div className={classNames(s.itemPrice, s.itemPriceDropdownHeader)}>
            <h2>{treesPrice[selectedItemId]}</h2>
            <p>{currency}</p>
          </div>
          <img
            className={arrowStyles}
            src={arrowDown}
            alt="arrow down"
          />
        </div>
      </div>
      <div className={dropdownBodyStyles}>
        {itemsInfo.map(
          (item: TreesInfo, index: number) =>
            treesCount[index] !== 0 && (
              <div
                role={'presentation'}
                key={item.name + index}
                className={classNames(s.dropdownItem, { [s.selectedItem]: selectedItemId === index })}
                onClick={() => handleItemClick(index, item.name)}
              >
                <div className={s.dropdownItemPrefixContainer}>
                  <img
                    key={index}
                    className={classNames(s.dropdownHeaderPrefix, s.dropdownChildItem)}
                    src={TreeTypeSelectorImages[index]}
                    alt={'tree icon'}
                  />
                  <div className={s.dropdownItemContent}>
                    <div className={s.dropdownLabel}>{item.name}</div>
                    <div className={s.availableCount}>
                      {`Available: ${treesCount[index]}`}
                    </div>
                  </div>
                </div>
                <div className={s.itemPrice}>
                  {`${treesPrice[index]} ${currency}`}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  )
}
