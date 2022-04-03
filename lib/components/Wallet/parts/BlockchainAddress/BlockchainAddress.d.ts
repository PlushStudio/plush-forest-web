import { FC } from "react";
declare const themes: {
    primary: string;
    secondary: string;
};
declare type BlockchainAddressTheme = keyof typeof themes;
interface BlockchainAddressProps {
    theme: BlockchainAddressTheme;
    address: string;
    className?: string;
}
declare const BlockchainAddress: FC<BlockchainAddressProps>;
export default BlockchainAddress;
