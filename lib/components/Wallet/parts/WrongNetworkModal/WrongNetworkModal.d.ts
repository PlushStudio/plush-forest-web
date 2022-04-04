import { CSSProperties, FC, RefObject } from "react";
interface WrongNetworkModalProps {
    opener: RefObject<HTMLElement>;
    expectedNetworkName: string;
    switchNetwork: () => void | Promise<void>;
    onToggle?: (isOpen: boolean) => void;
    className?: string;
    style?: CSSProperties;
}
declare const WrongNetworkModal: FC<WrongNetworkModalProps>;
export default WrongNetworkModal;
