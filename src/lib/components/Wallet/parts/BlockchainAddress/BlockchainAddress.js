import { jsx as _jsx } from "react/jsx-runtime";
import classnames from "classnames";
import styles from "./BlockchainAddress.module.scss";
const themes = {
    primary: "primary",
    secondary: "secondary"
};
const REQUIRED_ADDRESS_LENGTH = 42;
const isValidAddress = (address) => {
    return address.length === REQUIRED_ADDRESS_LENGTH;
};
const cutWalletAddress = (address) => {
    if (!isValidAddress(address)) {
        throw Error(`Not valid address: ${address}`);
    }
    return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};
const BlockchainAddress = ({ theme, address, className }) => {
    const componentClassName = classnames(styles.address, className, {
        [styles.primary]: theme === "primary",
        [styles.secondary]: theme === "secondary"
    });
    const formattedAddress = cutWalletAddress(address);
    return (_jsx("div", Object.assign({ className: componentClassName }, { children: formattedAddress })));
};
export default BlockchainAddress;
