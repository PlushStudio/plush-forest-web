import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton } from "../../index";
import walletIcon from "./images/wallet.svg";
export const ConnectButton = ({ onClick, className }) => {
    return (_jsx(IconButton, Object.assign({ className: className, onClick: onClick, icon: walletIcon }, { children: "Connect" })));
};
