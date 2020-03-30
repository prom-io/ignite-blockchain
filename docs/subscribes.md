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
    data - required|json
```

Description:
1. id - Like id
2. userId - Current user id
3. data - Like data (raw data)
---------------------------------------------------------
### Example success add subscribe

#### Request 

* Url - http://localhost:3000/api/v1/subscribe
* Method - Post
* Header - Content-type: application/json

Body:
```json
{
	"id": "01866d34-7d72-4c0a-9770-0d7315721832",
	"userId": "71e1ec8a-cb1b-4a5c-af5d-20dffd10f0e3",
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
	"id": "01866d34-7d72-4c0a-9770-0d7315721832",
	"userId": "71e1ec8a-cb1b-4a5c-af5d-20dffd10f0e3",
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
