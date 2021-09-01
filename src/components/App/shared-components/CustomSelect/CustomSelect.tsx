import React, {useEffect, useState} from 'react'
import '@/components/App/shared-components/CustomSelect/CustomSelect.module.scss'
import s from "./CustomSelect.module.scss";
import arrowDown from "@/assets/images/24-px-1-outlined-chevron-down.png";

interface IData {
    id: number;
    label: string;
    available: number;
}

export const CustomSelect: React.FC = () => {
    const data: IData[] = [
        {id: 0, label: "Cacao", available: 590},
        {id: 1, label: "Shihuahuaco", available: 343},
        {id: 2, label: "Guaba", available: 58},
        {id: 3, label: "Caoba (Big-leafed mahogany)", available: 7}
    ];

    const [isOpen, setOpen] = useState<boolean>(false);
    const [items,] = useState<IData[]>(data);
    const [selectedItem, setSelectedItem] = useState<number>(0);

    const toggleDropdown = () => setOpen(!isOpen);

    const handleItemClick = (id: number) => {
        selectedItem == id ? setSelectedItem(0) : setSelectedItem(id);
        setOpen(false)

    };

    const handleClickOutside = () => {
        isOpen && setOpen(false);
    };

    const selectHandler = (e: Event) => {
        toggleDropdown();
        handleClickOutside();
    };


/*
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
    });
*/

    return (
        <div className={`${s.dropdown} ${isOpen && s.focused}`}>
            <div className={`${s.dropdownHeader}`} onClick={(e:any) => {selectHandler(e)}}>
                <div className={s.dropdownHeaderContent}>
                    <div className={s.dropdownHeaderPrefix}
                         style={{backgroundImage: `url(/assets/treeIcon-0${selectedItem + 1}.png)`}}/>

                    {items.find((item: IData) => item.id == selectedItem)!.label}

                </div>
                <img className={`${s.dropDownArrow} ${isOpen && s.rotate180}`} src={arrowDown}
                     alt="arrow down"/>
            </div>
            <div className={`${s.dropdownBody} ${isOpen && s.dropdownBodyOpen}`}>
                {items.map((item: IData, index: number) => (

                    <div className={s.dropdownItem} onClick={() => handleItemClick(index)}>
                        <div className={s.dropdownItemPrefix}
                             style={{backgroundImage: `url(/assets/treeIcon-0${index + 1}.png)`}}/>
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
};