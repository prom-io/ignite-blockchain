# Api for work with comment

## Api for add comment

### Route
> **Method**: Post
>
> **URI**: /api/v1/comment

### Parameters
```
    commentId - required|uuid
    postId - required|uuid
    peerWallet - required|string
    peerIp - required|string
    data - required|json
```

Description:
1. commentId - Comment entity id
2. postId - Post entity id
3. peerWallet - Node wallet
4. peerIp - Node ip address
5. data - comment data (raw data)
---------------------------------------------------------
### Example success add comment

#### Request 

* Url - http://localhost:3000/api/v1/comment
* Method - Post
* Header - application/json

Body:
```json
{
	"commentId": "a9ee9f0e-ee00-44e3-b45e-235fa35c5899",
	"postId": "79018bd3-999f-4303-91e7-2d2ee5f5015f",
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
	"message": "Comment success added!"
}
``` 
---------------------------------------------------------
### Example error add comment

#### Request 

* Url - http://localhost:3000/api/v1/comment
* Method - Post
* Header - application/json

Body:
```json
{
	"commentId": "a9ee9f0e-ee00-44e3-b45e-235fa35c5899",
	"postId": "79018bd3-999f-4303-91e7-2d2ee5f5015f",
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

## Api for fetch comment by post ID

### Route
> **Method**: GET
>
> **URI**: /api/v1/comment/:cid/:id

### Parameters
```
    cid - required|string
    postId - required|uuid
```

Description:
1. cid - Btfs cid (example: Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2)
2. postId - Post entity id
---------------------------------------------------------
### Example success fetch post

#### Request 

* Url - http://localhost:3000/api/v1/comment/QmcHrA63nVcsJ1D6jk1KwmTuDoxbA7Y1aQ99AGKrLjKM8x/79018bd3-999f-4303-91e7-2d2ee5f5015f
* Method - Get

Parameters:
```
    cid: QmcHrA63nVcsJ1D6jk1KwmTuDoxbA7Y1aQ99AGKrLjKM8x
    postId: 79018bd3-999f-4303-91e7-2d2ee5f5015f
``` 

#### Response
* Status - 200

Body:
```json
{
    "a9ee9f0e-ee00-44e3-b45e-235fa35c5899": {
        "message": "hello"
    }
}
``` 
---------------------------------------------------------
### Example error fetch post

#### Request 

* Url - http://localhost:3000/api/v1/comment/QmcHrA63nVcsJ1D6jk1KwmTuDoxbA7Y1aQ99AGKrLjKM8x/79018bd3-999f-4303-91e7-2d2ee5f5015f
* Method - Get

Parameters:
```
    cid: QmcHrA63nVcsJ1D6jk1KwmTuDoxbA7Y1aQ99AGKrLjKM8x
    postId: 79018bd3-999f-4303-91e7-2d2ee5f5015f
``` 

#### Response
* Status - 400

Body:
```json
{
	"message": "File not found!"
}
``` 
