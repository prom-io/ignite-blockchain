# Api for work with user

## Api for add user

### Route
> **TOPIC**: ignite.users.add

### Parameters
```
    userId - required|uuid
    peerWallet - required|string
    peerIp - required|string
    data - required|json
```

Description:
1. userId - User entity id
2. peerWallet - Node wallet
3. peerIp - Node ip address
4. data - user data (raw data)
---------------------------------------------------------
### Example success add user

#### Request 

* Topic - ignite.users.add

Body:
```json
{
	"userId": "a1f5bd70-18f2-4753-bb3b-a4cafb01ef3c",
	"peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE",
	"peerIp": "178.0.1.10",
	"data": {"message": "hellqweqewo"}
}
``` 

#### Response
* Status - 200

Body:
```json
{
	"message": "User success added!"
}
``` 
---------------------------------------------------------
### Example error add user

#### Request 

* Topic - ignite.users.add

Body:
```json
{
	"userId": "a1f5bd70-18f2-4753-bb3b-a4cafb01ef3c",
	"peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE",
	"peerIp": "178.0.1.10",
	"data": {"message": "hellqweqewo"}
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
