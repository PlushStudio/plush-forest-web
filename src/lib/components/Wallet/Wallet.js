import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import styles from "./Wallet.module.scss";
import Icon from "./parts/Icon/Icon";
import BlockchainAddress from "./parts/BlockchainAddress/BlockchainAddress";
import arrowButtonIcon from "./images/arrow-bottom.svg";
import SwitchAccountModal from "./parts/SwitchAccountModal/SwitchAccountModal";
import WrongNetworkModal from "./parts/WrongNetworkModal/WrongNetworkModal";
import RegisterModal from "./parts/RegisterModal/RegisterModal";
import ConnectModal from "./parts/ConnectModal/ConnectModal";
const getWalletStateRequirements = (props) => {
    const name = {
        name: "Name should not be empty.",
        condition: props.name.length > 0
    };
    const address = {
        name: "Address should not be empty.",
        condition: props.address.length > 0
    };
    const actualNetworkName = {
        name: "Actual network name should not be empty.",
        condition: props.actualNetworkName.length > 0
    };
    const expectedNetworkName = {
        name: "Expected network name should not be empty.",
        condition: props.expectedNetworkName.length > 0
    };
    return [
        {
            name: "DISCONNECTED",
            requirements: [expectedNetworkName]
        },
        {
            name: "WRONG_NETWORK",
            requirements: [expectedNetworkName]
        },
        {
            name: "USER_NOT_FOUND",
            requirements: []
        },
        {
            name: "USER_FOUND",
            requirements: [name, address, actualNetworkName]
        }
    ];
};
export const Wallet = (props) => {
    var _a;
    const componentClassName = classnames(styles.wallet, props.className);
    const [staticTitle, setStaticTitle] = useState("Hey,");
    const [staticStatus, setStaticStatus] = useState("You are disconnected");
    const [iconTheme, setIconTheme] = useState("WARNING");
    const [isConnectModalVisible, setConnectModalVisible] = useState(false);
    const [isSwitchAccountModalVisible, setSwitchAccountModalVisible] = useState(false);
    const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
    const [isWrongNetworkModalVisible, setWrongNetworkModalVisible] = useState(false);
    const arrowClassName = classnames(styles.arrow, {
        [styles.inverted]: isConnectModalVisible || isSwitchAccountModalVisible || isRegisterModalVisible || isWrongNetworkModalVisible
    });
    const title = props.state === "USER_FOUND" ? props.name : staticTitle;
    const address = props.state === "USER_FOUND" &&
        _jsx(BlockchainAddress, { theme: 'primary', className: styles.address, address: (_a = props.address) !== null && _a !== void 0 ? _a : "" });
    const status = props.state === "USER_FOUND"
        ? `${staticStatus} ${props.actualNetworkName}`
        : staticStatus;
    const statusClassName = classnames(styles.status, {
        [styles.success]: staticStatus === "Connected to",
        [styles.error]: staticStatus !== "Connected to"
    });
    const openerRef = useRef(null);
    const validateState = () => {
        const state = getWalletStateRequirements(props).find((state) => state.name === props.state);
        let isStateApplicable = true;
        if (!state) {
            throw new Error(`Requirements for state ${props.state} are not found.`);
        }
        for (let j = 0; j < state.requirements.length; j++) {
            if (!state.requirements[j].condition) {
                isStateApplicable = false;
                break;
            }
        }
        if (!isStateApplicable) {
            let text = "";
            text += `\n State ${state.name} requirements not fullfilled:`;
            for (let j = 0; j < state.requirements.length; j++) {
                if (!state.requirements[j].condition) {
                    text += `\n - ${state.requirements[j].name}`;
                }
            }
            throw new Error(text);
        }
    };
    const handleConnectModalToggle = (isOpen) => {
        setConnectModalVisible(isOpen);
    };
    const handleSwitchAccountModalToggle = (isOpen) => {
        setSwitchAccountModalVisible(isOpen);
    };
    const handleRegisterModalToggle = (isOpen) => {
        setRegisterModalVisible(isOpen);
    };
    const handleWrongNetworkModalToggle = (isOpen) => {
        setWrongNetworkModalVisible(isOpen);
    };
    const modal = () => {
        var _a, _b, _c;
        switch (props.state) {
            case "USER_FOUND":
                return (_jsx(SwitchAccountModal, { style: props.modalStyle, address: (_a = props.address) !== null && _a !== void 0 ? _a : "", opener: openerRef, openWalletExplorer: props.openExplorer, switchWalletAccount: props.switchAccount, onToggle: handleSwitchAccountModalToggle, className: styles.switchAccountModal }));
            case "USER_NOT_FOUND":
                return (_jsx(RegisterModal, { style: props.modalStyle, opener: openerRef, register: props.register, onToggle: handleRegisterModalToggle, className: styles.registerModal }));
            case "WRONG_NETWORK":
                return (_jsx(WrongNetworkModal, { style: props.modalStyle, opener: openerRef, expectedNetworkName: (_b = props.expectedNetworkName) !== null && _b !== void 0 ? _b : "", switchNetwork: props.switchNetwork, onToggle: handleWrongNetworkModalToggle, className: styles.wrongNetworkModal }));
            case "DISCONNECTED":
                return (_jsx(ConnectModal, { style: props.modalStyle, opener: openerRef, expectedNetworkName: (_c = props.expectedNetworkName) !== null && _c !== void 0 ? _c : "", connect: props.connect, onToggle: handleConnectModalToggle, className: styles.connectModal }));
            default:
                throw new Error("Unknown props set was provided");
        }
    };
    useEffect(() => {
        var _a;
        validateState();
        switch (props.state) {
            case "DISCONNECTED":
                setStaticTitle("Hey,");
                setStaticStatus("You are disconnected");
                setIconTheme("WARNING");
                break;
            case "WRONG_NETWORK":
                setStaticTitle("Hey,");
                setStaticStatus("Wrong network!");
                setIconTheme("WARNING");
                break;
            case "USER_NOT_FOUND":
                setStaticTitle("No account");
                setStaticStatus("Sign up to continue");
                setIconTheme("ERROR");
                break;
            case "USER_FOUND":
                setStaticTitle("");
                setStaticStatus("Connected to");
                setIconTheme((_a = props.gender) !== null && _a !== void 0 ? _a : "ERROR");
                break;
            default:
                throw new Error("Unknown props set was provided");
        }
    }, [props.state]);
    return (_jsxs("div", Object.assign({ className: componentClassName }, { children: [_jsx(Icon, { theme: iconTheme }), _jsxs("div", Object.assign({ ref: openerRef, className: styles.opener }, { children: [_jsxs("div", Object.assign({ className: styles.info }, { children: [_jsxs("div", Object.assign({ className: styles.top }, { children: [_jsx("div", Object.assign({ className: styles.title }, { children: title })), address] })), _jsx("div", Object.assign({ className: statusClassName }, { children: status }))] })), _jsx("div", Object.assign({ className: styles.button }, { children: _jsx("img", { src: arrowButtonIcon, className: arrowClassName, alt: 'arrow bottom' }) }))] })), modal()] })));
};
