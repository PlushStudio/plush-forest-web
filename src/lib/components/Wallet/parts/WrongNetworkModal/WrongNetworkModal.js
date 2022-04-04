var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BaseModal } from "../../../BaseModal/BaseModal";
import classnames from "classnames";
import ConnectionStatus from "../ConnectionStatus/ConnectionStatus";
import ModalButton from "../ModalButton/ModalButton";
import styles from "./WrongNetworkModal.module.scss";
const WrongNetworkModal = ({ opener, expectedNetworkName, switchNetwork, onToggle, className, style }) => {
    const componentClassName = classnames(styles.modal, className);
    let modalVisibilitySetter = null;
    const handleButtonClicked = () => __awaiter(void 0, void 0, void 0, function* () {
        yield switchNetwork();
        if (modalVisibilitySetter) {
            modalVisibilitySetter(false);
        }
    });
    return (_jsxs(BaseModal, Object.assign({ style: style, opener: opener, onRender: (setModalOpen) => { modalVisibilitySetter = setModalOpen; }, onToggle: onToggle, className: componentClassName }, { children: [_jsxs("div", Object.assign({ className: styles.content }, { children: [_jsx("div", Object.assign({ className: styles.title }, { children: "Wrong network detected" })), _jsx(ConnectionStatus, { className: styles.status, size: 'big', isConnected: false }), _jsxs("div", Object.assign({ className: styles.hint }, { children: ["Please switch to ", expectedNetworkName, " Network in your wallet and try again."] }))] })), _jsxs(ModalButton, Object.assign({ className: styles.switchNetworkButton, onClick: () => handleButtonClicked() }, { children: ["Switch to ", expectedNetworkName] }))] })));
};
export default WrongNetworkModal;
