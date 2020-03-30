# Api for work with Comment

## Api for add Comment

### Route
> **Method**: Post
>
> **URI**: /api/v1/comment

### Parameters
```
    id - required|uuid
    data - required|json
```

Description:
1. id - Comment id
2. data - Comment data (raw data)
---------------------------------------------------------
### Example success add comment

#### Request 

* Url - http://localhost:3000/api/v1/comment
* Method - Post
* Header - application/json

Body:
```json
{
	"id": "e2754550-d6c8-40de-836b-f58210c0424a",
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
	"id": "e2754550-d6c8-40de-836b-f58210c0424a",
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

## Api for fetch Comment by ID

### Route
> **Method**: GET
>
> **URI**: /api/v1/comment/:cid/:id

### Parameters
```
    cid - required|string
    id - required|uuid
```

Description:
1. cid - Btfs cid (example: Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2)
2. id - Comment id
---------------------------------------------------------
### Example success fetch comment

#### Request 

* Url - http://localhost:3000/api/v1/comment/Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2/99ee5e8f-fea5-4f70-b369-9e8ab0d4b797
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
### Example error fetch comment

#### Request 

* Url - http://localhost:3000/api/v1/comment/Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2/99ee5e8f-fea5-4f70-b369-9e8ab0d4b797
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
