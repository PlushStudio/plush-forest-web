import { FC } from "react";
export interface IconButtonProps {
    icon: string;
    className?: string;
    onClick?: () => void;
}
export declare const IconButton: FC<IconButtonProps>;
