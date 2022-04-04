import { jsx as _jsx } from "react/jsx-runtime";
import skullIcon1x from "./images/skull.png";
import skullIcon2x from "./images/skull@2x.png";
import skullIcon3x from "./images/skull@3x.png";
import { ResponsiveImage } from "../../../../../ResponsiveImage/ResponsiveImage";
import styles from "./SkullIcon.module.scss";
import classnames from "classnames";
const SkullIcon = ({ className }) => {
    const componentClassName = classnames(styles.skullIcon, className);
    return (_jsx("div", Object.assign({ className: componentClassName }, { children: _jsx(ResponsiveImage, { x1: skullIcon1x, x2: skullIcon2x, x3: skullIcon3x, alt: "skull", className: styles.image }) })));
};
export default SkullIcon;
