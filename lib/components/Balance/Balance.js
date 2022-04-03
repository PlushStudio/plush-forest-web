import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Balance.module.scss";
import classnames from "classnames";
export const Balance = ({ balance, currency, className }) => {
    const componentClassName = classnames(styles.balance, className);
    return (_jsxs("div", Object.assign({ className: componentClassName }, { children: [_jsx("span", Object.assign({ className: styles.count }, { children: balance })), _jsx("span", Object.assign({ className: styles.currency }, { children: currency }))] })));
};
