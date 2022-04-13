import { CSSProperties, FC } from "react";
import { Gender } from "./types/Gender";
export declare type WalletState = "DISCONNECTED" | "WRONG_NETWORK" | "USER_NOT_FOUND" | "USER_FOUND";
export interface WalletProps {
    state: WalletState;
    expectedNetworkName: string;
    actualNetworkName: string;
    name: string;
    gender: Gender;
    address: string;
    modalStyle?: CSSProperties;
    className?: string;
    connect: () => void | Promise<void>;
    switchNetwork: () => void | Promise<void>;
    register: () => void;
    switchAccount: () => void | Promise<void>;
    onStateChanged?: (state: WalletState) => void;
    openExplorer: () => void;
}
export declare const Wallet: FC<WalletProps>;
