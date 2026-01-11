import { createPublicClient, http, createWalletClient, custom } from 'viem';
import { baseSepolia } from 'viem/chains';
import { useState, useEffect } from 'react';
import { GENWEALTH_VAULT_ABI, GENWEALTH_VAULT_ADDRESS } from '../lib/contracts';

export function useGenwealthVault() {
    const [address, setAddress] = useState<`0x${string}` | null>(null);

    useEffect(() => {
        // Simple way to get address if window.ethereum exists
        if (typeof window !== 'undefined' && (window as any).ethereum) {
            (window as any).ethereum.request({ method: 'eth_requestAccounts' })
                // @ts-ignore
                .then((accounts: string[]) => {
                    if (accounts.length > 0) setAddress(accounts[0] as `0x${string}`);
                });
        }
    }, []);

    const publicClient = createPublicClient({
        chain: baseSepolia,
        transport: http()
    });

    interface VaultSettings {
        lastCheckIn: bigint;
        inactivityPeriod: bigint;
        threshold: number;
        recoveryActive: boolean;
    }

    const getSettings = async (ownerAddress: string): Promise<VaultSettings | null> => {
        try {
            const data = await publicClient.readContract({
                address: GENWEALTH_VAULT_ADDRESS,
                abi: GENWEALTH_VAULT_ABI,
                functionName: 'getVaultSettings',
                args: [ownerAddress as `0x${string}`]
            });
            // viem returns struct as object when components are named in ABI
            return data as unknown as VaultSettings;
        } catch (error) {
            console.error("Error fetching settings:", error);
            return null;
        }
    };

    const checkIn = async () => {
        if (!(window as any).ethereum) return;
        const walletClient = createWalletClient({
            chain: baseSepolia,
            transport: custom((window as any).ethereum)
        });

        const [account] = await walletClient.getAddresses();
        return walletClient.writeContract({
            address: GENWEALTH_VAULT_ADDRESS,
            abi: GENWEALTH_VAULT_ABI,
            functionName: 'checkIn',
            account,
            chain: baseSepolia
        });
    };

    const setupVault = async (inactivityPeriod: number, threshold: number = 1) => {
        if (!(window as any).ethereum) return;
        const walletClient = createWalletClient({
            chain: baseSepolia,
            transport: custom((window as any).ethereum)
        });

        const [account] = await walletClient.getAddresses();
        return walletClient.writeContract({
            address: GENWEALTH_VAULT_ADDRESS,
            abi: GENWEALTH_VAULT_ABI,
            functionName: 'setupVault',
            args: [BigInt(inactivityPeriod), threshold],
            account,
            chain: baseSepolia
        });
    };

    const approveRecovery = async (ownerAddress: string) => {
        if (!(window as any).ethereum) return;
        const walletClient = createWalletClient({
            chain: baseSepolia,
            transport: custom((window as any).ethereum)
        });

        const [account] = await walletClient.getAddresses();
        return walletClient.writeContract({
            address: GENWEALTH_VAULT_ADDRESS,
            abi: GENWEALTH_VAULT_ABI,
            functionName: 'approveRecovery',
            args: [ownerAddress as `0x${string}`],
            account,
            chain: baseSepolia
        });
    };

    return {
        address,
        getSettings,
        checkIn,
        setupVault,
        approveRecovery
    };
}
