import { jsx as _jsx } from "react/jsx-runtime";
import classnames from "classnames";
import ChainIcon from "../ChainIcon/ChainIcon";
import styles from "./MetamaskIcon.module.scss";
import metamaskIcon from "./images/metamask.svg";
const MetamaskIcon = ({ size, className }) => {
    const componentClassName = classnames(styles.icon, className);
    return (_jsx(ChainIcon, Object.assign({ size: size, className: componentClassName }, { children: _jsx("img", { className: styles.image, src: metamaskIcon, alt: "metamask icon" }) })));
};
export default MetamaskIcon;
