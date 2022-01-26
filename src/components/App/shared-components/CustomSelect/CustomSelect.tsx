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

interface IData {
  id: number
  name: string
  available: number
  label: string
}

export const CustomSelect: React.FC = () => {
  const data: IData[] = [
    {
      id: 0,
      name: 'Shihuahuaco',
      label: `The Amazon's tree of life.`,
      available: 590,
    },
    {
      id: 1,
      name: 'Cacao',
      label: 'The food of the Gods.',
      available: 343,
    },
    {
      id: 2,
      name: 'Guaba',
      label: 'The ice cream tree.',
      available: 58,
    },
    {
      id: 3,
      name: 'Caoba',
      label: 'The majestic mahogany.',
      available: 7,
    },
  ]

  const [isOpen, setOpen] = useState<boolean>(false)
  const [items] = useState<IData[]>(data)
  const [userDetails, setUserDetails] = useContext(userDetailsContext)
  const [selectedItem, setSelectedItem] = useState<number>(0)
  const { getCurrency, walletConnected } = useMetamaskWallet()
  const [ticker, setTicker] = useState('')
  const TreeTypeSelectorImages = [treeIcon0, treeIcon1, treeIcon2, treeIcon3]

  const toggleDropdown = () => setOpen(!isOpen)

  const getContractTicker = async () => {
    const t = await getCurrency()
    setTicker(t)
  }
  useEffect(() => {
    if (walletConnected) {
      getContractTicker()
    }
    setSelectedItem(userDetails.treeTypeIdToPlant)
  }, [walletConnected])

  const handleItemClick = (id: number) => {
    if (selectedItem === id) {
      setSelectedItem(0)
    } else {
      setSelectedItem(id)
      setUserDetails({
        ...userDetails,
        treeTypeIdToPlant: data[id].id,
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
    <div className={`${s.dropdown} ${isOpen ? s.focused : ''}`}>
      <div
        className={`${s.dropdownHeader}`}
        onClick={() => {
          selectHandler()
        }}
      >
        <div className={s.dropdownHeaderContent}>
          {items.map(
            (item: IData, index: number) =>
              selectedItem === index && (
                <img
                  key={index}
                  className={s.dropdownHeaderPrefix}
                  src={TreeTypeSelectorImages[index]}
                  alt={'tree icon'}
                />
              )
          )}
          <div className={s.headerContentContainer}>
            <h2>
              {items.find((item: IData) => item.id == selectedItem)?.name}
            </h2>
            <p>{items.find((item: IData) => item.id == selectedItem)?.label}</p>
          </div>
        </div>
        <div className={s.dropdownHeaderRightPull}>
          <div className={`${s.itemPrice} ${s.itemPriceDropdownHeader}`}>
            <h2>5</h2>
            <p>{ticker}</p>
          </div>
          <img
            className={`${s.dropDownArrow} ${isOpen ? s.rotate180 : ''}`}
            src={arrowDown}
            alt="arrow down"
          />
        </div>
      </div>
      <div className={`${s.dropdownBody} ${isOpen ? s.dropdownBodyOpen : ''}`}>
        {items.map(
          (item: IData, index: number) =>
            userDetails.treesCount[index] !== 0 && (
              <div
                key={item.id + index}
                className={`${s.dropdownItem} ${selectedItem === item.id ? s.selectedItem : ''
                  }`}
                onClick={() => handleItemClick(item.id)}
              >
                <div className={s.dropdownItemPrefixContainer}>
                  <img
                    key={index}
                    className={`${s.dropdownHeaderPrefix} ${s.dropdownChildItem}`}
                    src={TreeTypeSelectorImages[item.id]}
                    alt={'tree icon'}
                  />
                  <div className={s.dropdownItemContent}>
                    <div className={s.dropdownLabel}>{item.name}</div>
                    <div className={s.availableCount}>
                      {`Available: ${userDetails.treesCount[item.id]}`}
                    </div>
                  </div>
                </div>
                <div className={s.itemPrice}>{`5 ${ticker}`}</div>
              </div>
            )
        )}
      </div>
    </div>
  )
}
