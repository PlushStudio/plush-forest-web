import { jsx as _jsx } from "react/jsx-runtime";
import classnames from "classnames";
import styles from "./ChainIcon.module.scss";
const sizes = {
    small: "small",
    big: "big"
};
const ChainIcon = ({ size, className, children }) => {
    const componentClassName = classnames(styles.icon, className, {
        [styles.small]: size === "small",
        [styles.big]: size === "big"
    });
    return (_jsx("div", Object.assign({ className: componentClassName }, { children: children })));
};
export default ChainIcon;
