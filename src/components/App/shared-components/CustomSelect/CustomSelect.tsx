import React, { useContext, useEffect, useState } from 'react'
import '@/components/App/shared-components/CustomSelect/CustomSelect.module.scss'
import s from './CustomSelect.module.scss'
import arrowDown from '@/assets/images/24-px-1-outlined-chevron-down.png'
import treeIcon0 from '@/assets/images/tree-icon-selector/shihuahuaco.png'
import treeIcon1 from '@/assets/images/tree-icon-selector/cacao.png'
import treeIcon2 from '@/assets/images/tree-icon-selector/guaba.png'
import treeIcon3 from '@/assets/images/tree-icon-selector/caoba.png'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import useMetamaskWallet from '@/hooks/useMetamaskWallet'
import classNames from "classnames";

interface TreesInfo {
  name: string,
  label: string
}

interface CustomSelectProps {
  icons: string[],
  itemsInfo: TreesInfo[],
  prices: number[],
  currency: string,
  className?: string,
  onSelect?: (itemId: number, itemName: string) => void
}

export const CustomSelect = ({ icons, itemsInfo, prices, currency, onSelect, className }: CustomSelectProps) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [userDetails, setUserDetails] = useContext(userDetailsContext)
  const [selectedItemId, setSelectedItemId] = useState<number>(0)
  const { walletConnected } = useMetamaskWallet()
  const TreeTypeSelectorImages = [treeIcon0, treeIcon1, treeIcon2, treeIcon3]

  const dropdownStyles = classNames(s.dropdown, className, { [s.focused]: isOpen })
  const dropdownBodyStyles = classNames(s.dropdownBody, { [s.dropdownBodyOpen]: isOpen })
  const arrowStyles = classNames(s.dropDownArrow, { [s.rotate180]: isOpen })

  const toggleDropdown = () => setOpen(!isOpen)

  useEffect(() => {
    setSelectedItemId(userDetails.treeTypeIdToPlant)
  }, [walletConnected])

  const handleItemClick = (itemId: number, itemName: string) => {
    if (onSelect) {
      onSelect(itemId, itemName)
    }
    if (selectedItemId === itemId) {
      setSelectedItemId(0)

    } else {
      setSelectedItemId(itemId)
      setUserDetails({
        ...userDetails,
        treeTypeIdToPlant: itemId,
      })
    }
    setOpen(false)
  }

  const handleClickOutside = () => {
    isOpen && setOpen(false)
  }

  const selectHandler = () => {
    toggleDropdown()
    handleClickOutside()
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
  })

  return (
    <div className={dropdownStyles}>
      <div
        className={`${s.dropdownHeader}`}
        onClick={() => {
          selectHandler()
        }}
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
              {itemsInfo.find((item: TreesInfo, index: number) => index == selectedItemId)?.name}
            </h2>
            <p>{itemsInfo.find((item: TreesInfo, index: number) => index == selectedItemId)?.label}</p>
          </div>
        </div>
        <div className={s.dropdownHeaderRightPull}>
          <div className={classNames(s.itemPrice, s.itemPriceDropdownHeader)}>
            <h2>{prices[0]}</h2>
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
            userDetails.treesCount[index] !== 0 && (
              <div
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
                      {`Available: ${userDetails.treesCount[index]}`}
                    </div>
                  </div>
                </div>
                <div className={s.itemPrice}>
                  {prices.map((price: number, priceIndex: number) => priceIndex === index && price)}
                  {` ${currency}`}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  )
}
