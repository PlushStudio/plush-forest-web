import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import styles from "./Icon.module.scss";
import classnames from "classnames";
import AlertIcon from "./parts/AlertIcon/AlertIcon";
import ChildIcon from "./parts/ChildIcon/ChildIcon";
import SkullIcon from "./parts/SkullIcon/SkullIcon";
const Icon = ({ theme, className }) => {
    const componentClassName = classnames(styles.icon, className);
    const statusClassName = classnames(styles.status, {
        [styles.error]: theme === "WARNING" || theme === "ERROR",
        [styles.success]: theme === "FEMALE" || theme === "MALE"
    });
    const icon = useMemo(() => {
        switch (theme) {
            case "WARNING":
                return _jsx(AlertIcon, {});
            case "ERROR":
                return _jsx(SkullIcon, {});
            case "FEMALE":
                return _jsx(ChildIcon, { gender: 'FEMALE' });
            case "MALE":
                return _jsx(ChildIcon, { gender: 'MALE' });
            default:
                throw new Error(`Unknown theme: ${theme}`);
        }
    }, [theme]);
    return (_jsxs("div", Object.assign({ className: componentClassName }, { children: [icon, _jsx("div", { className: statusClassName })] })));
};
export default Icon;
