import { FC } from "react";
export declare type IconTheme = "WARNING" | "ERROR" | "FEMALE" | "MALE";
interface IconProps {
    theme: IconTheme;
    className?: string;
}
declare const Icon: FC<IconProps>;
export default Icon;
