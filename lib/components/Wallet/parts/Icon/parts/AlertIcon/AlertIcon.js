import { jsx as _jsx } from "react/jsx-runtime";
import alertIcon1x from "./images/alert.png";
import alertIcon2x from "./images/alert@2x.png";
import alertIcon3x from "./images/alert@3x.png";
import { ResponsiveImage } from "../../../../../ResponsiveImage/ResponsiveImage";
import styles from "./AlertIcon.module.scss";
import classnames from "classnames";
const AlertIcon = ({ className }) => {
    const componentClassName = classnames(styles.alertIcon, className);
    return (_jsx("div", Object.assign({ className: componentClassName }, { children: _jsx(ResponsiveImage, { x1: alertIcon1x, x2: alertIcon2x, x3: alertIcon3x, alt: "alert sign", className: styles.image }) })));
};
export default AlertIcon;
