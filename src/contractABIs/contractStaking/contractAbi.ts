const stakingContractAbi = [
    {
        "inputs": [],
        "name": "exit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "val",
                "type": "address"
            }
        ],
        "name": "Exited",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "val",
                "type": "address"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "del",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "val",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Staked",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "val",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "unstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "del",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "val",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Unstaked",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "val",
                "type": "address"
            }
        ],
        "name": "withdrawlReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "del",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "val",
                "type": "address"
            }
        ],
        "name": "WithdrawlReward",
        "type": "event"
    }
] as const

export default stakingContractAbi