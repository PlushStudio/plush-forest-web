import { jsx as _jsx } from "react/jsx-runtime";
import classnames from "classnames";
import styles from "./Pipe.module.scss";
export const Pipe = ({ className }) => {
    const componentClassName = classnames(styles.pipe, className);
    return _jsx("div", { className: componentClassName });
};
