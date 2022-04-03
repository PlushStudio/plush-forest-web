import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classnames from "classnames";
import MetamaskIcon from "../MetamaskIcon/MetamaskIcon";
import NetworkIcon from "../NetworkIcon/NetworkIcon";
import styles from "./ConnectionStatus.module.scss";
import connectedIcon from "./images/connected.svg";
import disconnectedIcon from "./images/disconnected.svg";
const ConnectionStatus = ({ size, isConnected, className }) => {
    const componentClassName = classnames(styles.status, className);
    const iconClassName = classnames(styles.statusIcon, {
        [styles.big]: size === "big",
        [styles.small]: size === "small"
    });
    const icon = isConnected
        ? _jsx("img", { src: connectedIcon, className: iconClassName, alt: 'connected icon' })
        : _jsx("img", { src: disconnectedIcon, className: iconClassName, alt: 'disconnected icon' });
    return (_jsxs("div", Object.assign({ className: componentClassName }, { children: [_jsx(MetamaskIcon, { size: size }), icon, _jsx(NetworkIcon, { size: size })] })));
};
export default ConnectionStatus;
