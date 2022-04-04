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
import { ClipboardButton } from "../../../ClipboardButton/ClipboardButton";
import classnames from "classnames";
import BlockchainAddress from "../BlockchainAddress/BlockchainAddress";
import ConnectionStatus from "../ConnectionStatus/ConnectionStatus";
import ModalButton from "../ModalButton/ModalButton";
import styles from "./SwitchAccountModal.module.scss";
const SwitchAccountModal = ({ address, opener, openWalletExplorer, switchWalletAccount, onToggle, className, style }) => {
    const componentClassName = classnames(styles.modal, className);
    let modalVisibilitySetter = null;
    const handleButtonClicked = () => __awaiter(void 0, void 0, void 0, function* () {
        yield switchWalletAccount();
        if (modalVisibilitySetter) {
            modalVisibilitySetter(false);
        }
    });
    return (_jsxs(BaseModal, Object.assign({ style: style, opener: opener, onRender: (setModalOpen) => { modalVisibilitySetter = setModalOpen; }, onToggle: onToggle, className: componentClassName }, { children: [_jsxs("div", Object.assign({ className: styles.content }, { children: [_jsx(ConnectionStatus, { size: 'small', isConnected: true }), _jsxs("div", Object.assign({ className: styles.info }, { children: [_jsxs("div", Object.assign({ className: styles.addressContainer }, { children: [_jsx(BlockchainAddress, { address: address, theme: 'secondary' }), _jsx(ClipboardButton, { text: address, className: styles.copyButton })] })), _jsx("div", Object.assign({ className: styles.status, onClick: () => openWalletExplorer() }, { children: "View on Explorer" }))] }))] })), _jsx(ModalButton, Object.assign({ className: styles.switchAccountButton, onClick: () => handleButtonClicked() }, { children: "Switch account" }))] })));
};
export default SwitchAccountModal;
