import React, {useState} from 'react'
import '@/components/common/App/shared-components/CustomSelect.module.scss'
import s from "@/components/common/App/shared-components/CustomSelect.module.scss";
import arrowDown from "@/assets/images/24-px-1-outlined-chevron-down.png";

export const CustomSelect = () => {

    const data = [
        {id: 0, label: "Cacao", available: 590},
        {id: 1, label: "Shihuahuaco", available: 343},
        {id: 2, label: "Guaba", available: 58},
        {id: 3, label: "Caoba (Big-leafed mahogany)", available: 7}
    ];

    const [isOpen, setOpen] = useState(false);
    const [items, setItem] = useState(data);
    const [selectedItem, setSelectedItem] = useState(0);

    const toggleDropdown = () => setOpen(!isOpen);

    const handleItemClick = (id: number) => {
        selectedItem == id ? setSelectedItem(0) : setSelectedItem(id);
    }

    return (
        <div className={s.dropdown}>
            <div className={s.dropdownHeader} onClick={toggleDropdown}>
                <div className={s.dropdownHeaderContent}>
                    <div className={s.dropdownHeaderPrefix}
                         style={{backgroundImage: `url(/src/assets/images/treeIcon-0${selectedItem + 1}.png)`}}/>

                    {items.find(item => item.id == selectedItem).label}

                </div>
                <img className={s.dropDownArrow} src={arrowDown} style={isOpen ? {transform: "rotate(180deg)"} : null}
                     alt="arrow down"/>
            </div>
            <div className={`${s.dropdownBody} ${isOpen && s.dropdownBodyOpen}`}>
                {items.map((item, index) => (

                    <div className={s.dropdownItem} onClick={() => handleItemClick(index)}>
                        <div className={s.dropdownItemPrefix}
                             style={{backgroundImage: `url(/src/assets/images/treeIcon-0${index + 1}.png)`}}/>
                        <div className={s.dropdownItemContent}>
                            <div className={s.dropdownLabel}>
                                {item.label}
                            </div>
                            <div className={s.availableCount}>
                                {`Available: ${item.available}`}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )

}