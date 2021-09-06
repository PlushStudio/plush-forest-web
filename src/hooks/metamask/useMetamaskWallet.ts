import { JsonRpcSigner, Web3Provider, ExternalProvider } from '@ethersproject/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import MetaMaskOnboarding from '@metamask/onboarding';
import { ethers, utils } from 'ethers';
import { useEffect, useRef, useState } from 'react';

const PLAIContractAddress = '0x7fD549d856c4a74fB902932dEA896FA7DE9D0823';

export const errors = {
    walletNotInstalled: {
        code: 1,
        message: 'Wallet is not installed'
    },
    walletNotConnected: {
        code: 2,
        message: 'Wallet is not connected'
    },
    signingFailed: {
        code: 3,
        message: 'Signing was failed'
    },
};

const useMetamaskWallet = () => {
    const onboarding = useRef<MetaMaskOnboarding>();
    const [provider, setProvider] = useState<Web3Provider>();
    const [signer, setSigner] = useState<JsonRpcSigner>();
    const [initialized, setInitialized] = useState<boolean>(false);

    /**
     * Returns MetaMask wallet installation state
     * @returns Is MetaMask wallet installed or not
     **/
    const isInstalled = (): boolean => {
        return MetaMaskOnboarding.isMetaMaskInstalled()
    };

    /**
     * Returns Metamask wallet connection state
     * @returns Is MetaMask wallet connected or not to the website
     */
    const isConnected = async (): Promise<boolean> => {
        try {
            await getAddress();
            return true
        } catch {
            return false
        }
    };

    /**
     * Opens metamask installation page and returns user to the initial page
     * when he completes all installation steps
     **/
    const install = (): void => {
        onboarding.current?.startOnboarding()
    };

    /**
     * Opens metamask connection modal window
     */
    const connect = async () => {
        if (!isInstalled()) {
            throw errors.walletNotInstalled
        }

        await provider?.send("eth_requestAccounts", []);
    };

    /**
     * Returns active wallet account address
     * @returns Wallet address
     **/
    const getAddress = async (): Promise<string> => {
        if (!signer) {
            throw errors.walletNotConnected
        }

        return await signer.getAddress()
    };

    /**
     * Returns PLAI balance of active wallet
     * @returns PLAI balance
     */
    const getPLAIBalance = async (): Promise<number> => {
        if (!signer) {
            throw errors.walletNotConnected
        }

        const genericErc20Abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
        const contract = new ethers.Contract(PLAIContractAddress, genericErc20Abi, provider);
        const balance = ethers.utils.formatUnits(await contract.balanceOf(await getAddress()), 8);

        return parseInt(balance)
    };

    /**
     * Opens MetaMask sign modal
     * @param signature Signature message user will see in Metamask popup (text + nonce)
     * @returns signed message
     */
    const sign = async (signature: string): Promise<string> => {
        if (!signer) {
            throw errors.walletNotConnected
        }

        try {
            const hash = await signer.signMessage(signature);
            return hash
        } catch (error) {
            throw errors.signingFailed
        }
    };

    useEffect(() => {
        /**
         * Waits when window.ethereum will be available and
         * sets provider and signer to work with blockchain
         */
        const detectProvider = async (): Promise<void> => {
            const ethereumMetamaskGlobalObject = await detectEthereumProvider({ mustBeMetaMask: true, silent: true}) as ExternalProvider

            if (!ethereumMetamaskGlobalObject) {
                // Metamask wallet is not installed, but it is ok
                // in this case, do nothing
                return
            }

            setProvider(new ethers.providers.Web3Provider(ethereumMetamaskGlobalObject));
        };

        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding()
        }

        detectProvider()
    }, []);

    useEffect(() => {
        if (provider) {
            setSigner(provider.getSigner());
            setInitialized(true)
        }
    }, [provider]);

    return {
        initialized,
        isInstalled,
        isConnected,
        install,
        connect,
        sign,
        getAddress,
        getPLAIBalance
    }
};

export default useMetamaskWallet