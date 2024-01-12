# Simple Node Application
## To play around with get, post, put and delete:
## Download Yet Another REST Client from google extension store
## To start the service:
```
nodemon index.js
```
## Code below gets information from item "sample":
```
http://localhost:5000/api/getMethod/sample
```
## Code below post item named "newName":
```
http://localhost:5000/api/postMethod/
```
## Payload:
```
{
    "attr": "newName",
    "age": "25"
}
```
## Code below put item sample and change "age":
```
http://localhost:5000/api/putMethod/sample
```
## Payload:
```
{
    "age": "23"
}
```
## Code below delete item "sample":
```
http://localhost:5000/api/deleteMethod/sample
```
