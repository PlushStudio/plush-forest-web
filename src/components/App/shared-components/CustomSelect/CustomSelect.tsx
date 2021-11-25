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
  id: number;
  label: string;
  available: number;
}

export const CustomSelect: React.FC = () => {
  const data: IData[] = [
    { id: 0, label: 'Shihuahuaco', available: 590 },
    { id: 1, label: 'Cacao', available: 343 },
    { id: 2, label: 'Guaba', available: 58 },
    { id: 3, label: 'Caoba (Big-leafed mahogany)', available: 7 }
  ]

  const [isOpen, setOpen] = useState<boolean>(false)
  const [items] = useState<IData[]>(data)
  const [userDetails, setUserDetails] = useContext(userDetailsContext)
  const [selectedItem, setSelectedItem] = useState<number>(0)
  const { getTicker } = useMetamaskWallet()
  const [ticker, setTicker] = useState('')
  const TreeTypeSelectorImages = [treeIcon0, treeIcon1, treeIcon2, treeIcon3]

  const toggleDropdown = () => setOpen(!isOpen)

  const getContractTicker = async () => {
    const t = await getTicker()
    setTicker(t)
  }
  useEffect(() => {
    getContractTicker()
    setSelectedItem(userDetails.treeTypeIdToPlant)
  })

  const handleItemClick = (id: number) => {
    if (selectedItem === id) {
      setSelectedItem(0)
    } else {
      setSelectedItem(id)
      setUserDetails({
        ...userDetails,
        treeTypeIdToPlant: data[id].id
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
  /*
  if outside click handler is required
      useEffect(() => {
          document.addEventListener('click', handleClickOutside, true);
      });
  */
  return (
    <div className={`${s.dropdown} ${isOpen ? s.focused : ''}`}>
      <div className={`${s.dropdownHeader}`} onClick={() => {
        selectHandler()
      }}>
        <div className={s.dropdownHeaderContent}>
          {items.map((item: IData, index: number) => (
            selectedItem === index &&
            <img key={index} className={s.dropdownHeaderPrefix} src={TreeTypeSelectorImages[index]} alt={'tree icon'} />
          ))}
          {items.find((item: IData) => item.id == selectedItem)?.label}
        </div>
        <div className={s.dropdownHeaderRightPull}>
          <div className={`${s.itemPrice} ${s.itemPriceDropdownHeader}`}>{`5 ${ticker}`}</div>
          <img className={`${s.dropDownArrow} ${isOpen ? s.rotate180 : ''}`} src={arrowDown}
               alt='arrow down' />
        </div>
      </div>
      <div className={`${s.dropdownBody} ${isOpen ? s.dropdownBodyOpen : ''}`}>
        {items.map((item: IData, index: number) => (
          <div key={item.id + index} className={`${s.dropdownItem} ${selectedItem === item.id ? s.selectedItem : ''}`}
               onClick={() => handleItemClick(index)}>
            <div className={s.dropdownItemPrefixContainer}>
              <img key={index} className={`${s.dropdownHeaderPrefix} ${s.dropdownChildItem}`}
                   src={TreeTypeSelectorImages[index]}
                   alt={'tree icon'} />
              <div className={s.dropdownItemContent}>
                <div className={s.dropdownLabel}>
                  {item.label}
                </div>
                <div className={s.availableCount}>
                  {`Available: ${item.available}`}
                </div>
              </div>
            </div>
            <div className={s.itemPrice}>{`5 ${ticker}`}</div>
          </div>
        ))}
      </div>
    </div>
  )
}