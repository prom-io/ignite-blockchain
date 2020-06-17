import {AbiItem} from 'web3-utils';
export const cidChainAbi: AbiItem[] = [
    {
        'constant': false,
        'inputs': [
            {
                'name': 'node',
                'type': 'address'
            }
        ],
        'name': 'addToAllowList',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': '_btfsCid',
                'type': 'string'
            }
        ],
        'name': 'pushBlock',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'node',
                'type': 'address'
            }
        ],
        'name': 'removeInAllowList',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'node',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'addedAt',
                'type': 'uint256'
            }
        ],
        'name': 'ToAllowListAddressAdded',
        'type': 'event'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'node',
                'type': 'address'
            },
            {
                'indexed': false,
                'name': 'removedAt',
                'type': 'uint256'
            }
        ],
        'name': 'InAllowListAddressRemoved',
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
                'name': 'node',
                'type': 'address'
            }
        ],
        'name': 'CidChainBlockPushed',
        'type': 'event'
    },
    {
        'inputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'constructor'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'address'
            }
        ],
        'name': 'allowList',
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
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'name': 'cidChain',
        'outputs': [
            {
                'name': 'btfsCid',
                'type': 'string'
            },
            {
                'name': 'node',
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
        'name': 'lastPushedBlock',
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
    }
];
