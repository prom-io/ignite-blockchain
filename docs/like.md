# Api for work with Likes

## Api for add Like

### Route

> **TOPIC**: ignite.likes.add

### Parameters
```
    id - required|uuid
    commentId - required|uuid
    peerWallet - required|string
    peerIp - required|string
    data - required|json
```

Description:
1. id - Like id
2. commentId - Comment id
3. peerWallet - Node wallet
4. peerIp - Node ip address
5. data - Like data (raw data)
---------------------------------------------------------
### Example success add like

#### Request 

* Topic - ignite.likes.add

Body:
```json
{
	"id": "78fe6cf9-a918-498a-9e79-d129709efd04",
	"commentId": "99ee5e8f-fea5-4f70-b369-9e8ab0d4b797",
	"peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE",
	"peerIp": "178.0.1.10",
	"data": {"message": "Likesss"}
}
``` 

#### Response
* Status - 200

Body:
```json
{
    "message": "Like success added!"
}
``` 
---------------------------------------------------------
### Example error add like

#### Request 

* Topic - ignite.likes.add

Body:
```json
{
	"id": "78fe6cf9-a918-498a-9e79-d129709efd04",
	"commentId": "99ee5e8f-fea5-4f70-b369-9e8ab0d4b797",
	"peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE",
	"peerIp": "178.0.1.10",
	"data": {"message": "Likesss"}
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

## Api for add unlike

### Route
> **TOPIC**: ignite.unlikes.add

### Parameters
```
    id - required|uuid
    commentId - required|uuid
    peerWallet - required|string
    peerIp - required|string
    data - required|json
```

Description:
1. id - Like id
2. commentId - Comment id
3. peerWallet - Node wallet
4. peerIp - Node ip address
5. data - Like data (raw data)
---------------------------------------------------------
### Example success add like

#### Request 

* Topic - ignite.unlikes.add

Body:
```json
{
	"id": "0ec7db5d-95d3-4257-8a24-5068e974c2b6",
	"commentId": "0a68a3ac-729b-4173-8737-0f3a01cf6b3e",
	"peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE",
	"peerIp": "178.0.1.10",
	"data": {"message": "Unlike!!"}
}
``` 

#### Response
* Status - 200

Body:
```json
{
    "message": "Unlike success added!"
}
``` 
---------------------------------------------------------
### Example error add like

#### Request 

* Topic - ignite.unlikes.add

Body:
```json
{
	"id": "0ec7db5d-95d3-4257-8a24-5068e974c2b6",
	"commentId": "0a68a3ac-729b-4173-8737-0f3a01cf6b3e",
	"peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE",
	"peerIp": "178.0.1.10",
	"data": {"message": "Unlike!!"}
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
--------------------------------------------------------------------

