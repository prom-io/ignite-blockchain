# Api for work with Likes

## Api for add Like

### Route
> **Method**: Post
>
> **URI**: /api/v1/like

### Parameters
```
    id - required|uuid
    commentId - required|uuid
    data - required|json
```

Description:
1. id - Like id
2. commentId - Comment id
3. data - Like data (raw data)
---------------------------------------------------------
### Example success add like

#### Request 

* Url - http://localhost:3000/api/v1/like
* Method - Post
* Header - Content-type: application/json

Body:
```json
{
	"id": "9cb8c4a1-2043-4a7a-a8ea-e95b49052b48",
	"commentId": "99ee5e8f-fea5-4f70-b369-9e8ab0d4b797",
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

* Url - http://localhost:3000/api/v1/like
* Method - Post
* Header - Content-type: application/json

Body:
```json
{
	"id": "9cb8c4a1-2043-4a7a-a8ea-e95b49052b48",
	"commentId": "99ee5e8f-fea5-4f70-b369-9e8ab0d4b797",
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

## Api for fetch all Comment Likes by Comment ID

### Route
> **Method**: GET
>
> **URI**: /api/v1/like/:cid/:id

### Parameters
```
    cid - required|string
    id - required|uuid
```

Description:
1. cid - Btfs cid (example: Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2)
2. id - Comment id
---------------------------------------------------------
### Example success fetch likes

#### Request 

* Url - http://localhost:3000/api/v1/like/Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2/99ee5e8f-fea5-4f70-b369-9e8ab0d4b797
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
    "ecb6f339-3811-4698-a856-79b21de2fce6": {
        "message": "Likesss"
    },
    "f4b72e81-3ffd-46a3-932b-4ee2c498563d": {
        "message": "Likesss"
    },
    "9cb8c4a1-2043-4a7a-a8ea-e95b49052b48": {
        "message": "Likesss"
    }
}
``` 
---------------------------------------------------------
### Example error fetch likes

#### Request 

* Url - http://localhost:3000/api/v1/like/Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2/99ee5e8f-fea5-4f70-b369-9e8ab0d4b797
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
