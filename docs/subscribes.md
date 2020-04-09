# Api for work with Subscribes

## Api for add Subscribe

### Route
> **Method**: Post
>
> **URI**: /api/v1/subscribe

### Parameters
```
    id - required|uuid
    userId - required|uuid
    peerWallet - required|string
    peerIp - required|string
    data - required|json
```

Description:
1. id - Subscribe id
2. userId - User id
3. peerWallet - Node wallet
4. peerIp - Node ip address
5. data - Subscribe data (raw data)
---------------------------------------------------------
### Example success add subscribe

#### Request 

* Url - http://localhost:3000/api/v1/subscribe
* Method - Post
* Header - Content-type: application/json

Body:
```json
{
	"id": "0fc9276a-52a2-4690-afd2-13877a8b5c57",
	"userId": "71e1ec8a-cb1b-4a5c-af5d-20dffd10f0e3",
	"peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE",
	"peerIp": "178.0.1.10",
	"data": {"message": "2313123"}
}
``` 

#### Response
* Status - 200

Body:
```json
{
    "message": "Subscribe success added!"
}
``` 
---------------------------------------------------------
### Example error add subscribe

#### Request 

* Url - http://localhost:3000/api/v1/subscribe
* Method - Post
* Header - Content-type: application/json

Body:
```json
{
	"id": "0fc9276a-52a2-4690-afd2-13877a8b5c57",
	"userId": "71e1ec8a-cb1b-4a5c-af5d-20dffd10f0e3",
	"peerWallet": "TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE",
	"peerIp": "178.0.1.10",
	"data": {"message": "2313123"}
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

## Api for UnSubscribe

### Route
> **Method**: Post
>
> **URI**: /api/v1/unsubscribe

### Parameters
```
    id - required|uuid
    userId - required|uuid
    peerWallet - required|string
    peerIp - required|string
    data - required|json
```

Description:
1. id - UnSubscribe id
2. userId - User id
3. peerWallet - Node wallet
4. peerIp - Node ip address
5. data - UnSubscribe data (raw data)
---------------------------------------------------------
### Example success add UnSubscribe

#### Request 

* Url - http://localhost:3000/api/v1/unsubscribe
* Method - Post
* Header - Content-type: application/json

Body:
```json
{
	"id": "0ec7db5d-95d3-4257-8a24-5068e974c2b6",
	"userId": "0a68a3ac-729b-4173-8737-0f3a01cf6b3e",
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
    "message": "Unsubscribe success added!"
}
``` 
---------------------------------------------------------
### Example error add UnSubscribe

#### Request 

* Url - http://localhost:3000/api/v1/unsubscribe
* Method - Post
* Header - Content-type: application/json

Body:
```json
{
	"id": "0ec7db5d-95d3-4257-8a24-5068e974c2b6",
	"userId": "0a68a3ac-729b-4173-8737-0f3a01cf6b3e",
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

## Api for fetch all Subscribe by User ID

### Route
> **Method**: GET
>
> **URI**: /api/v1/subscribe/:cid/:id

### Parameters
```
    cid - required|string
    id - required|uuid
```

Description:
1. cid - Btfs cid (example: Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2)
2. id - User id
---------------------------------------------------------
### Example success fetch subscribes

#### Request 

* Url - http://localhost:3000/api/v1/subscribe/Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2/71e1ec8a-cb1b-4a5c-af5d-20dffd10f0e3
* Method - Get

Parameters:
```
    cid: Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2
    id: 71e1ec8a-cb1b-4a5c-af5d-20dffd10f0e3
``` 

#### Response
* Status - 200

Body:
```json
{
    "ab541c76-ce8a-4714-a010-5cb1918d58e6": {
        "message": "2313123"
    },
    "01866d34-7d72-4c0a-9770-0d7315721832": {
        "message": "2313123"
    }
}
``` 
---------------------------------------------------------
### Example error fetch subscribes

#### Request 

* Url - http://localhost:3000/api/v1/subscribe/Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2/71e1ec8a-cb1b-4a5c-af5d-20dffd10f0e3
* Method - Get

Parameters:
```
    cid: Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2
    id: 71e1ec8a-cb1b-4a5c-af5d-20dffd10f0e3
``` 

#### Response
* Status - 400

Body:
```json
{
	"message": "File not found!"
}
``` 
