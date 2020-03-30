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
    "posts": [
        "99ee5e8f-fea5-4f70-b369-9e8ab0d4b797",
        "e2754550-d6c8-40de-836b-f58210c0424a"
    ],
    "likes": [
        {
            "commentId": "99ee5e8f-fea5-4f70-b369-9e8ab0d4b797",
            "id": "ecb6f339-3811-4698-a856-79b21de2fce6"
        },
        {
            "commentId": "99ee5e8f-fea5-4f70-b369-9e8ab0d4b797",
            "id": "9cb8c4a1-2043-4a7a-a8ea-e95b49052b48"
        }
    ],
    "images": [
        "572ff731-1176-4d3a-b2e6-3985145b5a38",
        "967ffb35-1f57-4ef1-a800-d25f20b68a96"
    ],
    "subscribes": [
        {
            "userId": "71e1ec8a-cb1b-4a5c-af5d-20dffd10f0e3",
            "id": "ab541c76-ce8a-4714-a010-5cb1918d58e6"
        },
        {
            "userId": "71e1ec8a-cb1b-4a5c-af5d-20dffd10f0e3",
            "id": "01866d34-7d72-4c0a-9770-0d7315721832"
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
