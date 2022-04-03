import React, { CSSProperties, FC, RefObject } from "react";
export interface BaseModalProps {
    isOpen?: boolean;
    opener: RefObject<HTMLElement>;
    className?: string;
    onRender?: (setModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => void;
    onToggle?: (isOpen: boolean) => void;
    style?: CSSProperties;
}
export declare const BaseModal: FC<BaseModalProps>;
