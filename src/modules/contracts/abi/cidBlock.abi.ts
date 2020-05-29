import {AbiItem} from 'web3-utils';
export const cidBlockAbi: AbiItem[] = [
    {
        'constant': true,
        'inputs': [],
        'name': 'validator',
        'outputs': [
            {
                'name': '',
                'type': 'address'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'lastCommittedBlock',
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
        'name': 'plasmaChain',
        'outputs': [
            {
                'name': 'btfsCid',
                'type': 'string'
            },
            {
                'name': 'previousBtfsCid',
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
                'name': 'btfsCid',
                'type': 'string'
            },
            {
                'indexed': false,
                'name': 'previousBtfsCid',
                'type': 'string'
            },
            {
                'indexed': false,
                'name': 'operator',
                'type': 'address'
            }
        ],
        'name': 'BlockSubmitted',
        'type': 'event'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': '_btfsCid',
                'type': 'string'
            }
        ],
        'name': 'submitBlock',
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
