Smart Home Backend

- This project is the backend part of our smart home app i.e made in React Native
- It contains code for REST API connected to mongodb using mongoose client

- Following requests are allowed by this API (In VSCode use REST Client extension to test the following- or POSTMAN (better) )

- A. users/

GET http://localhost:3000/users 
GET http://localhost:3000/users/user1

PUT http://localhost:3000/users/pnanwani61 HTTP/1.1

content-type: application/json
{
  "email": "pnanwani612@gmail.com",
  "firstName": "Dominic"
}

POST http://localhost:3000/users HTTP/1.1

content-type: application/json
{
  "userId: "user1",
  "email": "user1@gmail.com",
  "firstName": "Ram",
  "lastName": "Raavan"
}

DELETE http://localhost:3000/users/user1
