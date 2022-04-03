import { FC } from "react";
import { ChainIconSize } from "../ChainIcon/ChainIcon";
interface ConnectionStatusProps {
    size: ChainIconSize;
    isConnected: boolean;
    className?: string;
}
declare const ConnectionStatus: FC<ConnectionStatusProps>;
export default ConnectionStatus;
