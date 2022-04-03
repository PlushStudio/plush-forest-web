import React, { CSSProperties, FC, RefObject } from "react";
export interface ModalProps {
    opener: RefObject<HTMLElement>;
    isOpen?: boolean;
    closer?: RefObject<HTMLElement>;
    className?: string;
    onRender?: (setModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => void;
    onToggle?: (isOpen: boolean) => void;
    style?: CSSProperties;
}
export declare const Modal: FC<ModalProps>;
