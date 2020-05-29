import {AbiItem} from 'web3-utils';
export const rootChainAbi: AbiItem[] = [
    {
        'constant': true,
        'inputs': [],
        'name': 'lastSyncBlock',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'name': 'verificationBlocks',
        'outputs': [
            {
                'name': 'verificationHash',
                'type': 'string'
            },
            {
                'name': 'operator',
                'type': 'address'
            },
            {
                'name': 'createdAt',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'lastVerificationBlock',
        'outputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'address'
            }
        ],
        'name': 'isWhiteList',
        'outputs': [
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'constructor'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'operator',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'addedAt',
                'type': 'uint256'
            }
        ],
        'name': 'ToWhiteListAddressAdded',
        'type': 'event'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'operator',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'removedAt',
                'type': 'uint256'
            }
        ],
        'name': 'InWhiteListAddressRemoved',
        'type': 'event'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'verificationHash',
                'type': 'string'
            },
            {
                'indexed': false,
                'name': 'operator',
                'type': 'address'
            }
        ],
        'name': 'VerificationBlockSubmitted',
        'type': 'event'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': '_verificationHash',
                'type': 'string'
            },
            {
                'name': '_lastSyncBlock',
                'type': 'uint256'
            }
        ],
        'name': 'submitVerificationBlock',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'operator',
                'type': 'address'
            }
        ],
        'name': 'addToWhiteList',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'operator',
                'type': 'address'
            }
        ],
        'name': 'removeInWhiteList',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    }
];
