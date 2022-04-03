import { CSSProperties, FC, RefObject } from "react";
interface SwitchAccountModalProps {
    address: string;
    opener: RefObject<HTMLElement>;
    openWalletExplorer: () => void;
    switchWalletAccount: () => void | Promise<void>;
    onToggle?: (isOpen: boolean) => void;
    className?: string;
    style?: CSSProperties;
}
declare const SwitchAccountModal: FC<SwitchAccountModalProps>;
export default SwitchAccountModal;
