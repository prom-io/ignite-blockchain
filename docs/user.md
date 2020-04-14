# Api for work with user

## Api for add user

### Route
> **Method**: Post
>
> **URI**: /api/v1/user

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

* Url - http://localhost:3000/api/v1/user
* Method - Post
* Header - application/json

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

* Url - http://localhost:3000/api/v1/user
* Method - Post
* Header - application/json

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

## Api for fetch user by ID

### Route
> **Method**: GET
>
> **URI**: /api/v1/user/:cid/:id

### Parameters
```
    cid - required|string
    id - required|uuid
```

Description:
1. cid - Btfs cid (example: Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2)
2. id - User entity id
---------------------------------------------------------
### Example success fetch user

#### Request 

* Url - http://localhost:3000/api/v1/user/QmPLPB1CQ9SiJ7DUYtdPdDbANnY68o4go24k12XAWp77Ga/a1f5bd70-18f2-4753-bb3b-a4cafb01ef3c
* Method - Get

Parameters:
```
    cid: QmPLPB1CQ9SiJ7DUYtdPdDbANnY68o4go24k12XAWp77Ga
    id: a1f5bd70-18f2-4753-bb3b-a4cafb01ef3c
``` 

#### Response
* Status - 200

Body:
```json
{
    "message": "test data"
}
``` 
---------------------------------------------------------
### Example error fetch user

#### Request 

* Url - http://localhost:3000/api/v1/user/QmPLPB1CQ9SiJ7DUYtdPdDbANnY68o4go24k12XAWp77Ga/a1f5bd70-18f2-4753-bb3b-a4cafb01ef3c
* Method - Get

Parameters:
```
    cid: QmPLPB1CQ9SiJ7DUYtdPdDbANnY68o4go24k12XAWp77Ga
    id: a1f5bd70-18f2-4753-bb3b-a4cafb01ef3c
``` 

#### Response
* Status - 400

Body:
```json
{
	"message": "File not found!"
}
``` 
