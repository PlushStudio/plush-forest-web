import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classnames from "classnames";
import { useRef } from "react";
import { Modal } from "../Modal/Modal";
import styles from "./BaseModal.module.scss";
import closeIcon from "./images/close.svg";
export const BaseModal = ({ isOpen, opener, className, style, onRender, onToggle, children }) => {
    const componentClassName = classnames(styles.modal, className);
    const closerRef = useRef(null);
    return (_jsxs(Modal, Object.assign({ style: style, isOpen: isOpen, opener: opener, closer: closerRef, onRender: onRender, onToggle: onToggle, className: componentClassName }, { children: [_jsx("img", { src: closeIcon, ref: closerRef, className: styles.closer, alt: "close icon" }), children] })));
};
