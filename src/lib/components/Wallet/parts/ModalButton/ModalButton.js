import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./ModalButton.module.scss";
import classnames from "classnames";
const ModalButton = ({ className, onClick, children }) => {
    const componentClassName = classnames(styles.button, className);
    const handleButtonClick = () => {
        if (onClick) {
            onClick();
        }
    };
    return (_jsx("button", Object.assign({ className: componentClassName, onClick: () => handleButtonClick() }, { children: children })));
};
export default ModalButton;
