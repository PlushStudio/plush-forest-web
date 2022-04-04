import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from "classnames";
import styles from "./IconButton.module.scss";
export const IconButton = ({ icon, className, onClick, children }) => {
    const componentClassName = classNames(styles.button, className);
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };
    return (_jsxs("button", Object.assign({ className: componentClassName, onClick: handleClick }, { children: [_jsx("img", { className: styles.icon, src: icon, alt: 'button icon' }), _jsx("div", Object.assign({ className: styles.text }, { children: children }))] })));
};
