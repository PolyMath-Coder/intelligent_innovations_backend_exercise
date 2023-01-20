# Intelligent Innovations Backend Exercise

## Overall Objective

This is the server-side technology of Twitee (a social media micro-blogging application) with endpoints typical of the popularly known Twitter. It also supports the posts functionality of Twitter.

---

# Setup

- Install [Node](https://nodejs.org/en/download/) if not already installed on your PC.
- Create an `env` file by running `touch .env` on a wsl or git terminal.
- Copy the fields from `.sample.env` and replace with the correct fields.
- Install needful dependencies by running `npm install`

---

## Useful Links.

- [Postman Documentation](https://documenter.getpostman.com/view/15118089/UyrGCuYQ)
- [Base URL for Live API](https://intelligent-innovations.onrender.com/)

---

## Models

---

### User

| field       | data_type | constraints |
| ----------- | --------- | ----------- |
| name        | string    | optional    |
| email       | string    | required    |
| password    | string    | required    |
| dateCreated | Date      | required    |

### Blog

| field        | data_type | constraints |
| ------------ | --------- | ----------- |
| content      | string    | optional    |
| author       | string    | required    |
| commentaries | array     | required    |
| likes        | Number    | optional    |
| timeOfPost   | string    | required    |
| dateOfPost   | string    | required    |

### Signup User

- Route: /api/auth/register
- Method: POST
- Body:

```
{
  "email": "john_doe@example.com",
  "password": "Password"
}
```

- Responses

Success

```
{
    status: 'Account Creation Successful',
    message: 'Email sent to newly created user.'

    user: {
        "name": "john_doe",
        "email": "john_doe@example.com",
        "password": "Password1"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2Njg0OGIzNGQ4OTIzYjA1NjM5NjJkIiwiZW1haWwiOiJheW9sdXdhbWlyYWNsZUBnbWFpbC5jb20ifSwiaWF0IjoxNjY3NjYyOTg5LCJleHAiOjE2Njc2NjY1ODl9.YPoI35Y5oJqdmIRBTWOm8scFR7sDDhCav-Fw8VFaqX8"
}
```

Kindly peruse through the [Postman API Documentation](https://documenter.getpostman.com/view/15118089/UyrGCuYQ) to have a comprehensive overview of all exposed endpoints.

## Technologies Used.

- [Mongo DB](https://account.mongodb.com/account/login?n=%2Fv2%2F6051c58edfe30d503cc47b3f&nextHash=%23clusters) Database Provider
