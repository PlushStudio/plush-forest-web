import { CSSProperties, FC, RefObject } from "react";
interface RegisterModalProps {
    opener: RefObject<HTMLElement>;
    register: () => void | Promise<void>;
    onToggle?: (isOpen: boolean) => void;
    className?: string;
    style?: CSSProperties;
}
declare const RegisterModal: FC<RegisterModalProps>;
export default RegisterModal;
