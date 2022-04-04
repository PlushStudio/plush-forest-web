import { jsx as _jsx } from "react/jsx-runtime";
import childIcon1x from "./images/child.png";
import childIcon2x from "./images/child@2x.png";
import childIcon3x from "./images/child@3x.png";
import { ResponsiveImage } from "../../../../../ResponsiveImage/ResponsiveImage";
import styles from "./ChildIcon.module.scss";
import classnames from "classnames";
const ChildIcon = ({ gender, className }) => {
    const componentClassName = classnames(styles.childIcon, className, {
        [styles.female]: gender === "FEMALE",
        [styles.male]: gender === "MALE"
    });
    return (_jsx("div", Object.assign({ className: componentClassName }, { children: _jsx(ResponsiveImage, { x1: childIcon1x, x2: childIcon2x, x3: childIcon3x, alt: "child face", className: styles.image }) })));
};
export default ChildIcon;
