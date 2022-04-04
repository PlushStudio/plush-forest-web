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
import ModalButton from "../ModalButton/ModalButton";
import styles from "./RegisterModal.module.scss";
const RegisterModal = ({ opener, register, onToggle, className, style }) => {
    const componentClassName = classnames(styles.modal, className);
    let modalVisibilitySetter = null;
    const handleButtonClicked = () => __awaiter(void 0, void 0, void 0, function* () {
        yield register();
        if (modalVisibilitySetter) {
            modalVisibilitySetter(false);
        }
    });
    return (_jsxs(BaseModal, Object.assign({ style: style, opener: opener, onRender: (setModalOpen) => { modalVisibilitySetter = setModalOpen; }, onToggle: onToggle, className: componentClassName }, { children: [_jsxs("div", Object.assign({ className: styles.content }, { children: [_jsx("div", Object.assign({ className: styles.title }, { children: "Plush account is required" })), _jsx("div", Object.assign({ className: styles.hint }, { children: "If you already have a Plush account, try switching between your Metamask wallets. Otherwise, please visit Plush website to learn more about Plush, and create your account." }))] })), _jsx(ModalButton, Object.assign({ className: styles.registerButton, onClick: () => handleButtonClicked() }, { children: "Sign up" }))] })));
};
export default RegisterModal;
