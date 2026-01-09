export const GENWEALTH_VAULT_ABI = [
    {
        "type": "function",
        "name": "setupVault",
        "inputs": [
            { "name": "_inactivityPeriod", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "external"
    },
    {
        "type": "function",
        "name": "checkIn",
        "inputs": [],
        "outputs": [],
        "stateMutability": "external"
    },
    {
        "type": "function",
        "name": "getVaultSettings",
        "inputs": [
            { "name": "_owner", "type": "address", "internalType": "address" }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct GenwealthVault.VaultSettings",
                "components": [
                    { "name": "lastCheckIn", "type": "uint256", "internalType": "uint256" },
                    { "name": "inactivityPeriod", "type": "uint256", "internalType": "uint256" },
                    { "name": "recoveryActive", "type": "bool", "internalType": "bool" }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "CheckedIn",
        "inputs": [
            { "name": "owner", "type": "address", "indexed": true, "internalType": "address" },
            { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
        ],
        "anonymous": false
    }
] as const;

// Replace with deployed address
export const GENWEALTH_VAULT_ADDRESS = "0x0000000000000000000000000000000000000000"; 
