# Api for work with Files

## Api for upload File

### Route
> **Method**: POST
>
> **URI**: /api/v1/file/upload

### Parameters
```
    id - required|uuid
    file - required|file
```

Description:
1. id - File id
2. file - Uploaded file of form data
---------------------------------------------------------
### Example success upload file

#### Request 

* Url - http://localhost:3000/api/v1/file/upload
* Method - Post
* Header - Content-Type: multipart/form-data;

Body:
```
    id - 967ffb35-1f57-4ef1-a800-d25f20b68a96
    file - Uploaded file
``` 

#### Response
* Status - 200

Body:
```json
{
    "message": "File success uploaded!"
}
``` 
---------------------------------------------------------
### Example error upload file

#### Request 

* Url - http://localhost:3000/api/v1/file/upload
* Method - Post
* Header - Content-Type: multipart/form-data;

Body:
```
    id - 967ffb35-1f57-4ef1-a800-d25f20b68a96
    file - Uploaded file
``` 

#### Response
* Status - 400

Body:
```json
{
    "message": "Id exists!"
}
``` 

## Api for fetch File by ID

### Route
> **Method**: GET
>
> **URI**: /api/v1/file/:cid/:id

### Parameters
```
    cid - required|string
    id - required|uuid
```

Description:
1. cid - Btfs cid (example: Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2)
2. id - File id
---------------------------------------------------------
### Example success fetch comment

#### Request 

* Url - http://localhost:3000/api/v1/file/Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2/572ff731-1176-4d3a-b2e6-3985145b5a38
* Method - Get

Parameters:
```
    cid: Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2
    id: 572ff731-1176-4d3a-b2e6-3985145b5a38
``` 

#### Response
* Status - 200

Body: Response file

---------------------------------------------------------
### Example error fetch comment

#### Request 

* Url - http://localhost:3000/api/v1/file/Qme5jXiZFauedKCmiAQQzXLkfj3VjBCmeh2k672MsvRmv2/572ff731-1176-4d3a-b2e6-3985145b5a38
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
