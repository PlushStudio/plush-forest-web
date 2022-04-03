import { FC } from "react";
declare const sizes: {
    small: string;
    big: string;
};
export declare type ChainIconSize = keyof typeof sizes;
interface ChainIconProps {
    size: ChainIconSize;
    className?: string;
}
declare const ChainIcon: FC<ChainIconProps>;
export default ChainIcon;
