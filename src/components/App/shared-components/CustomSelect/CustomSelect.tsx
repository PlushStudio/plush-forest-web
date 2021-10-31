import React, { MouseEventHandler, useState } from 'react'
import '@/components/App/shared-components/CustomSelect/CustomSelect.module.scss'
import s from './CustomSelect.module.scss'
import arrowDown from '@/assets/images/24-px-1-outlined-chevron-down.png'
import treeIcon0 from '@/assets/images/treeIcon-01.png'
import treeIcon1 from '@/assets/images/treeIcon-02.png'
import treeIcon2 from '@/assets/images/treeIcon-03.png'
import treeIcon3 from '@/assets/images/treeIcon-04.png'

interface IData {
  id: number;
  label: string;
  available: number;
}

export const CustomSelect: React.FC = () => {
  const data: IData[] = [
    { id: 0, label: 'Cacao', available: 590 },
    { id: 1, label: 'Shihuahuaco', available: 343 },
    { id: 2, label: 'Guaba', available: 58 },
    { id: 3, label: 'Caoba (Big-leafed mahogany)', available: 7 }
  ]

  const [isOpen, setOpen] = useState<boolean>(false)
  const [items] = useState<IData[]>(data)
  const [selectedItem, setSelectedItem] = useState<number>(0)

  const TreeTypeSelectorImages = [treeIcon0, treeIcon1, treeIcon2, treeIcon3]

  const toggleDropdown = () => setOpen(!isOpen)

  const handleItemClick = (id: number) => {
    selectedItem == id ? setSelectedItem(0) : setSelectedItem(id)
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
          <div className={`${s.itemPrice} ${s.itemPriceDropdownHeader}`}>5 Plai</div>
          <img className={`${s.dropDownArrow} ${isOpen ? s.rotate180 : ''}`} src={arrowDown}
               alt='arrow down' />
        </div>
      </div>
      <div className={`${s.dropdownBody} ${isOpen ? s.dropdownBodyOpen : ''}`}>
        {items.map((item: IData, index: number) => (
          <div key={item.id + index} className={`${s.dropdownItem} ${selectedItem === item.id ? s.selectedItem : ''}`}
               onClick={() => handleItemClick(index)}>
            <div className={s.dropdownItemPrefixContainer}>
              <div className={s.dropdownItemPrefix}
                   style={{ backgroundImage: `url(/src/assets/images/treeIcon-0${index + 1}.png)` }} />
              <div className={s.dropdownItemContent}>
                <div className={s.dropdownLabel}>
                  {item.label}
                </div>
                <div className={s.availableCount}>
                  {`Available: ${item.available}`}
                </div>
              </div>
            </div>
            <div className={s.itemPrice}>5 Plai</div>
          </div>
        ))}
      </div>
    </div>
  )
}