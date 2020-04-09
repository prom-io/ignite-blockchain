# Api for work with Entities

## Api for fetch all entity ids

### Route
> **Method**: Get
>
> **URI**: /api/v1/soter/entities/:cid

### Parameters
```
    cid - required|string
```

Description:
1. cid - Btfs cid

### Example success fetch all entities

#### Request 

* Url - http://localhost:3000/api/v1/soter/entities/Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2
* Method - Get

Parameters:
```
    cid - Btfs cid
``` 

#### Response
* Status - 200

Body:
```json
{
    "images": [
        {
            "fileId": "967ffb35-1f57-4ef1-a800-d25f20b68a96",
            "peerIp": "178.0.1.10",
            "peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE"
        },
        {
            "fileId": "967ffb35-1f57-4ef1-a800-d25f20b68a96",
            "peerIp": "178.0.1.10",
            "peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE"
        }
    ],
    "subscribes": [
        {
            "id": "0fc9276a-52a2-4690-afd2-13877a8b5c57",
            "peerIp": "178.0.1.10",
            "userId": "71e1ec8a-cb1b-4a5c-af5d-20dffd10f0e3",
            "peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE"
        }
    ],
    "likes": [
        {
            "id": "78fe6cf9-a918-498a-9e79-d129709efd04",
            "peerIp": "178.0.1.10",
            "commentId": "99ee5e8f-fea5-4f70-b369-9e8ab0d4b797",
            "peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE"
        },
        {
            "id": "78fe6cf9-a918-498a-9e79-d129709efd04",
            "peerIp": "178.0.1.10",
            "commentId": "99ee5e8f-fea5-4f70-b369-9e8ab0d4b797",
            "peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE"
        }
    ],
    "posts": [
        {
            "peerIp": "178.0.1.10",
            "postId": "79018bd3-999f-4303-91e7-2d2ee5f5015f",
            "peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE"
        },
        {
            "peerIp": "178.0.1.10",
            "postId": "79018bd3-999f-4303-91e7-2d2ee5f5015f",
            "peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE"
        },
        {
            "peerIp": "178.0.1.10",
            "postId": "79018bd3-999f-4303-91e7-2d2ee5f5015f",
            "peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE"
        }
    ],
    "users": [
        {
            "peerIp": "178.0.1.10",
            "userId": "a1f5bd70-18f2-4753-bb3b-a4cafb01ef3c",
            "peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE"
        }
    ],
    "unlikes": [
        {
            "id": "0ec7db5d-95d3-4257-8a24-5068e974c2b6",
            "peerIp": "178.0.1.10",
            "commentId": "0a68a3ac-729b-4173-8737-0f3a01cf6b3e",
            "peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE"
        },
        {
            "id": "0ec7db5d-95d3-4257-8a24-5068e974c2b6",
            "peerIp": "178.0.1.10",
            "commentId": "0a68a3ac-729b-4173-8737-0f3a01cf6b3e",
            "peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE"
        }
    ],
    "unsubscribes": [
        {
            "id": "0ec7db5d-95d3-4257-8a24-5068e974c2b6",
            "peerIp": "178.0.1.10",
            "userId": "0a68a3ac-729b-4173-8737-0f3a01cf6b3e",
            "peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE"
        },
        {
            "id": "0ec7db5d-95d3-4257-8a24-5068e974c2b6",
            "peerIp": "178.0.1.10",
            "userId": "0a68a3ac-729b-4173-8737-0f3a01cf6b3e",
            "peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE"
        }
    ]
}
``` 
---------------------------------------------------------

### Example error fetch all entities

#### Request 

* Url - http://localhost:3000/api/v1/soter/entities/Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2
* Method - Get

Parameters:
```
    cid - Btfs cid
``` 

#### Response
* Status - 400

Body:
```json
{
    "message": "This not valid CID!"
}
``` 
---------------------------------------------------------
