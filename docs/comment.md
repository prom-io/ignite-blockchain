# Api for work with comment

## Api for add comment

### Route
> **TOPIC**: ignite.comments.add

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

* Topic - ignite.comments.add

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

* Topic - ignite.comments.add

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
