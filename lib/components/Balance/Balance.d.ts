import { FC } from "react";
export interface BalanceProps {
    balance: number;
    currency: string;
    className?: string;
}
export declare const Balance: FC<BalanceProps>;
