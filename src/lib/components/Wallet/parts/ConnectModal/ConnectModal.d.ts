import { CSSProperties, FC, RefObject } from "react";
interface ConnectModalProps {
    opener: RefObject<HTMLElement>;
    expectedNetworkName: string;
    connect: () => void | Promise<void>;
    onToggle?: (isOpen: boolean) => void;
    className?: string;
    style?: CSSProperties;
}
declare const ConnectModal: FC<ConnectModalProps>;
export default ConnectModal;
