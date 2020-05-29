import {AbiItem} from 'web3-utils';

export const cidStorageAbi: AbiItem[] = [
    {
        'constant': true,
        'inputs': [],
        'name': 'cidCount',
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
        'name': 'allCid',
        'outputs': [
            {
                'name': '',
                'type': 'string'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'cidIndex',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'name': 'cid',
                'type': 'string'
            }
        ],
        'name': 'CidSaved',
        'type': 'event'
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'cid',
                'type': 'string'
            }
        ],
        'name': 'setCid',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    }
];
