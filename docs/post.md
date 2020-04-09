# Api for work with post

## Api for add post

### Route
> **Method**: Post
>
> **URI**: /api/v1/post

### Parameters
```
    id - required|uuid
    peerWallet - required|string
    peerIp - required|string
    data - required|json
```

Description:
1. id - post id
2. peerWallet - Node wallet
3. peerIp - Node ip address
4. data - post data (raw data)
---------------------------------------------------------
### Example success add post

#### Request 

* Url - http://localhost:3000/api/v1/post
* Method - Post
* Header - application/json

Body:
```json
{
	"id": "79018bd3-999f-4303-91e7-2d2ee5f5015f",
	"peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE",
	"peerIp": "178.0.1.10",
	"data": {"message": "hello"}
}
``` 

#### Response
* Status - 200

Body:
```json
{
	"message": "post success added!"
}
``` 
---------------------------------------------------------
### Example error add post

#### Request 

* Url - http://localhost:3000/api/v1/post
* Method - Post
* Header - application/json

Body:
```json
{
	"id": "79018bd3-999f-4303-91e7-2d2ee5f5015f",
	"peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE",
	"peerIp": "178.0.1.10",
	"data": {"message": "hello"}
}
``` 

#### Response
* Status - 400

Body:
```json
{
	"message": "Id exists!"
}
``` 

## Api for fetch post by ID

### Route
> **Method**: GET
>
> **URI**: /api/v1/post/:cid/:id

### Parameters
```
    cid - required|string
    id - required|uuid
```

Description:
1. cid - Btfs cid (example: Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2)
2. id - post id
---------------------------------------------------------
### Example success fetch post

#### Request 

* Url - http://localhost:3000/api/v1/post/Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2/99ee5e8f-fea5-4f70-b369-9e8ab0d4b797
* Method - Get

Parameters:
```
    cid: Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2
    id: 99ee5e8f-fea5-4f70-b369-9e8ab0d4b797
``` 

#### Response
* Status - 200

Body:
```json
{
    "message": "hello"
}
``` 
---------------------------------------------------------
### Example error fetch post

#### Request 

* Url - http://localhost:3000/api/v1/post/Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2/99ee5e8f-fea5-4f70-b369-9e8ab0d4b797
* Method - Get

Parameters:
```
    cid: Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2
    id: 99ee5e8f-fea5-4f70-b369-9e8ab0d4b797
``` 

#### Response
* Status - 400

Body:
```json
{
	"message": "File not found!"
}
``` 
