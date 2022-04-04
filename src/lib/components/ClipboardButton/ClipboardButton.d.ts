import { FC } from "react";
export interface ClipboardButtonProps {
    text: string;
    resetTimeout?: number;
    className?: string;
}
export declare const ClipboardButton: FC<ClipboardButtonProps>;
