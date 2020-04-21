# Api for work with post

## Api for add post

### Route
> **TOPIC**: ignite.posts.add

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

* Topic - ignite.posts.add

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

* Topic - ignite.posts.add

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
