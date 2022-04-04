import { jsx as _jsx } from "react/jsx-runtime";
import classnames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import styles from "./Modal.module.scss";
export const Modal = ({ isOpen = false, opener, closer, className, style, onRender, onToggle, children }) => {
    const [isModalOpen, setModalOpen] = useState(isOpen);
    const componentClassName = classnames(styles.modal, className, {
        [styles.open]: isModalOpen,
        [styles.closed]: !isModalOpen
    });
    const modalRef = useRef(null);
    const toggle = () => setModalOpen(!isModalOpen);
    useEventListener("click", (event) => {
        if (opener.current && opener.current.contains(event.target)) {
            toggle();
        }
        if ((closer === null || closer === void 0 ? void 0 : closer.current) && closer.current.contains(event.target)) {
            setModalOpen(false);
        }
    });
    useOnClickOutside(opener, (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setModalOpen(false);
        }
    });
    useEffect(() => {
        if (onRender) {
            onRender(setModalOpen);
        }
    });
    useEffect(() => {
        if (onToggle) {
            onToggle(isModalOpen);
        }
    }, [isModalOpen]);
    return (_jsx("div", Object.assign({ ref: modalRef, className: componentClassName, style: style }, { children: children })));
};
