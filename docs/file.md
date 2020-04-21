# Api for work with Files

## Api for upload File

### Route
> **TOPIC**: ignite.files.add

### Parameters
```
    id - required|uuid
    peerWallet - required|string
    peerIp - required|string
    file - required|file
```

Description:
1. id - File id
2. peerWallet - Node wallet
3. peerIp - Node ip address
4. file - Uploaded file of form data
---------------------------------------------------------
### Example success upload file

#### Request 

* Topic - ignite.files.add

Body:
```
    id - 967ffb35-1f57-4ef1-a800-d25f20b68a96
    peerWallet - TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE
    peerIp - 178.0.1.10
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

* Topic - ignite.files.add

Body:
```
    id - 967ffb35-1f57-4ef1-a800-d25f20b68a96
    peerWallet - TFMamu2dzZQip3H8jYaW4NyTLZ83Azt8aE
    peerIp - 178.0.1.10
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
