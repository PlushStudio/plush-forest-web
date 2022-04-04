import { jsx as _jsx } from "react/jsx-runtime";
import classnames from "classnames";
import ChainIcon from "../ChainIcon/ChainIcon";
import styles from "./NetworkIcon.module.scss";
import networkIcon from "./images/polygon.svg";
const NetworkIcon = ({ size, className }) => {
    const componentClassName = classnames(styles.icon, className);
    return (_jsx(ChainIcon, Object.assign({ size: size, className: componentClassName }, { children: _jsx("img", { className: styles.image, src: networkIcon, alt: "network icon" }) })));
};
export default NetworkIcon;
