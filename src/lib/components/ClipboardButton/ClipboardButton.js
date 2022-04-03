var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import classnames from "classnames";
import { useState } from "react";
import styles from "./ClipboardButton.module.scss";
import copyIcon from "./images/icon.svg";
export const ClipboardButton = ({ text, resetTimeout = 1000, className }) => {
    const [clipboardText, setClipboardText] = useState("");
    const componentClassName = classnames(styles.button, className, {
        [styles.copied]: clipboardText === text
    });
    const copy = () => __awaiter(void 0, void 0, void 0, function* () {
        yield navigator.clipboard.writeText(text);
        setClipboardText(text);
        setTimeout(() => {
            setClipboardText("");
        }, resetTimeout);
    });
    return (_jsx("img", { onClick: () => copy(), className: componentClassName, src: copyIcon, alt: 'copy icon' }));
};
