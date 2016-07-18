![eXceed13 logo](./exceed13.jpg)

eXceed 13 vote APIs
===

# Installation
First install [nodejs](http://nodejs.org/) and run command `npm install`, database use [mongodb](https://www.mongodb.com/) [installation (Ubuntu 16.04)](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)

# APIs details
---
## Sign up
Suffix URL: /api/signup  
Method: **POST**  
URL enconded

## Body
| Parameter Name | Required | Remark |Example |
| :-------------- |:-------------:|:--|:-------|
| username | yes| Username | b571054xxxx |
| password | yes | Password | 1q2w3e4r |
| group | yes | Group ID | 5780dad899aec131560a1572 |

## Output: JSON
```
{
  "status": 200,
  "success": true,
  "message": "Successful created new user."
}
```
---

## Login
Suffix URL: /api/login  
Method: **POST**  
URL enconded

## Body
| Parameter Name | Required | Remark |Example |
| :-------------- |:-------------:|:--|:-------|
| username | yes| Username | b571054xxxx |
| password | yes | Password | 1q2w3e4r |

## Output: JSON
```
{
  "status": 200,
  "success": true,
  "username": "ddd",
  "group": "Justseed",
  "token": "eXceed13vote eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NzhiNTk4YTAxZDAwMjYyMWEyN2IzNWQiLCJ1c2VybmFtZSI6ImRkZCIsInBhc3N3b3JkIjoiJDJhJDEwJDZLWGVSdlRaZjJ1ai9LbS5FNjJWa3U0L2MwV051SFVZZUxUQXNaWW9DR3JRakRvQU1OZkgyIiwiZ3JvdXAiOiI1NzgwZGFkODk5YWVjMTMxNTYwYTE1NzIiLCJfX3YiOjB9.62Tr8spEp2XOB7UluncCYW1edH8rvJjKgGt3O5EUiBo 20160729"
}
```
---
## Add a Project
Suffix URL: /api/project  
Method: **POST**  
URL enconded

## Header
| Parameter Name | Required | Remark |Example |
| :-------------- |:-------------:|:--|:-------|
| Authorization | yes | User's token | eXceed13vote eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NzhiNTk4YTAxZDAwMjYyMWEyN2IzNWQiLCJ1c2VybmFtZSI6ImRkZCIsInBhc3N3b3JkIjoiJDJhJDEwJDZLWGVSdlRaZjJ1ai9LbS5FNjJWa3U0L2MwV051SFVZZUxUQXNaWW9DR3JRakRvQU1OZkgyIiwiZ3JvdXAiOiI1NzgwZGFkODk5YWVjMTMxNTYwYTE1NzIiLCJfX3YiOjB9.62Tr8spEp2XOB7UluncCYW1edH8rvJjKgGt3O5EUiBo 20160729 |

## Body
| Parameter Name | Required | Remark |Example |
| :-------------- |:-------------:|:--|:-------|
| name | yes | Project's name | Smart Smoke Detector |
| image_url | yes | Link to image file | http://exceed.cpe.ku.ac.th/wiki/images/5/55/11802617_10206898348362241_5034490617162168826_o.jpg |
| content | yes | Project's description | "[{"header": "this is header5", "desc": "this is desc5"},{"header": "this is header6", "desc": "this is desc6"}]" |

## Output: JSON
```
{
  "status": 200,
  "success": true,
  "message": "Successful created new project."
}
```
---

## Show All Projects
Suffix URL: /api/poject  
Method: **GET**  

## Output: JSON
```
{
  "status": 200,
  "success": true,
  "projects": [
    {
      "_id": "578b3cef8c1d44550238cc0b",
      "name": "abc",
      "image_url": "http://google.co.th",
      "group": {
        "_id": "5780daf299aec131560a1575",
        "group_name": "ceedX"
      },
      "__v": 0,
      "content": [
        {
          "header": "this is header",
          "desc": "this is desc"
        },
        {
          "header": "this is header2",
          "desc": "this is desc2"
        }
      ]
    },
    {
      "_id": "578b57e95b657d1b19b09453",
      "name": "bax",
      "image_url": "www.yahoo.com",
      "group": {
        "_id": "5780db2199aec131560a157b",
        "group_name": "LinkZeed"
      },
      "__v": 0,
      "content": [
        {
          "header": "this is header3",
          "desc": "this is desc3"
        },
        {
          "header": "this is header4",
          "desc": "this is desc4"
        }
      ]
    },
    {
      "_id": "578b59b701d002621a27b35e",
      "name": "Go pro",
      "image_url": "www.hotmail.com",
      "group": {
        "_id": "5780dad899aec131560a1572",
        "group_name": "Justseed"
      },
      "__v": 0,
      "content": [
        {
          "header": "this is header5",
          "desc": "this is desc5"
        },
        {
          "header": "this is header6",
          "desc": "this is desc6"
        }
      ]
    }
  ]
}
```
---

## Vote Checker
Suffix URL: /api/vote/check_voted  
Method: **POST**  
URL enconded


## Header
| Parameter Name | Required | Remark |Example |
| :-------------- |:-------------:|:--|:-------|
| Authorization | yes | User's token | eXceed13vote eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NzhiNTk4YTAxZDAwMjYyMWEyN2IzNWQiLCJ1c2VybmFtZSI6ImRkZCIsInBhc3N3b3JkIjoiJDJhJDEwJDZLWGVSdlRaZjJ1ai9LbS5FNjJWa3U0L2MwV051SFVZZUxUQXNaWW9DR3JRakRvQU1OZkgyIiwiZ3JvdXAiOiI1NzgwZGFkODk5YWVjMTMxNTYwYTE1NzIiLCJfX3YiOjB9.62Tr8spEp2XOB7UluncCYW1edH8rvJjKgGt3O5EUiBo 20160729 |

## Body
| Parameter Name | Required | Remark |Example |
| :-------------- |:-------------:|:--|:-------|
| category | yes | Vote category (best_of_hardware, best_of_software, popular, top_rated) | best_of_hardware |
| project_id | yes | Project's ID | 578b3cef8c1d44550238cc0b |

## Output: JSON
```
{
  "status": 200,
  "success": true,
  "username": "ddd",
  "available": true
}
```

---

## Vote
Suffix URL: /api/vote/  
Method: **POST**  
URL enconded

## Header
| Parameter Name | Required | Remark |Example |
| :-------------- |:-------------:|:--|:-------|
| Authorization | yes | User's token | eXceed13vote eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NzhiNTk4YTAxZDAwMjYyMWEyN2IzNWQiLCJ1c2VybmFtZSI6ImRkZCIsInBhc3N3b3JkIjoiJDJhJDEwJDZLWGVSdlRaZjJ1ai9LbS5FNjJWa3U0L2MwV051SFVZZUxUQXNaWW9DR3JRakRvQU1OZkgyIiwiZ3JvdXAiOiI1NzgwZGFkODk5YWVjMTMxNTYwYTE1NzIiLCJfX3YiOjB9.62Tr8spEp2XOB7UluncCYW1edH8rvJjKgGt3O5EUiBo 20160729 |

## Body
| Parameter Name | Required | Remark |Example |
| :-------------- |:-------------:|:--|:-------|
| category | yes | Vote category (best_of_hardware, best_of_software, popular, top_rated) | best_of_hardware |
| project_id | yes | Project's ID | 578b3cef8c1d44550238cc0b |
| score | yes | Vote score | 3 |

## Output: JSON
```
{
  "status": 200,
  "success": true,
  "message": "Vote successfully."
}
```

---

## Vote Average
Suffix URL: /api/vote/average  
Method: **POST**  
URL enconded

## Body
| Parameter Name | Required | Remark |Example |
| :-------------- |:-------------:|:--|:-------|
| category | yes | Vote category (best_of_hardware, best_of_software, popular, top_rated) | best_of_hardware |
| project_id | yes | Project's ID | 578b3cef8c1d44550238cc0b |

## Output: JSON
```
{
  "status": 200,
  "success": true,
  "project": "Go pro",
  "group": "Systema",
  "average": 7
}
```
---
## Add New Group
Suffix URL: /api/groups  
Method: **POST**  

## Header
| Parameter Name | Required | Remark |Example |
| :-------------- |:-------------:|:--|:-------|
| Authorization | yes | User's token | eXceed13vote eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NzhiNTk4YTAxZDAwMjYyMWEyN2IzNWQiLCJ1c2VybmFtZSI6ImRkZCIsInBhc3N3b3JkIjoiJDJhJDEwJDZLWGVSdlRaZjJ1ai9LbS5FNjJWa3U0L2MwV051SFVZZUxUQXNaWW9DR3JRakRvQU1OZkgyIiwiZ3JvdXAiOiI1NzgwZGFkODk5YWVjMTMxNTYwYTE1NzIiLCJfX3YiOjB9.62Tr8spEp2XOB7UluncCYW1edH8rvJjKgGt3O5EUiBo 20160729 |

## Body
| Parameter Name | Required | Remark |Example |
| :-------------- |:-------------:|:--|:-------|
| group_name | yes | Group's name | eXceed13team |

## Output: JSON
```
{
  "status": 200,
  "success": true,
  "message": "Add a new group successfully."
}
```
---
## Show All Groups
Suffix URL: /api/groups  
Method: **GET**  

## Output: JSON
```
{
  "status": 200,
  "success": true,
  "groups": [
    {
      "_id": "578b6bb7537c9526c85cf532",
      "group_name": "Systema"
    },
    {
      "_id": "578b6bc0537c9526c85cf533",
      "group_name": "Justseed"
    },
    {
      "_id": "578b6bc7537c9526c85cf534",
      "group_name": "Ohzeed"
    },
    {
      "_id": "578b6bcd537c9526c85cf535",
      "group_name": "Have a Zeed"
    },
    {
      "_id": "578b6bd2537c9526c85cf536",
      "group_name": "ceedX"
    },
    {
      "_id": "578b6bd7537c9526c85cf537",
      "group_name": "OAZeeD"
    },
    {
      "_id": "578b6bde537c9526c85cf538",
      "group_name": "Seat Belt"
    },
    {
      "_id": "578b6be6537c9526c85cf539",
      "group_name": "Zeedluck"
    },
    {
      "_id": "578b6bed537c9526c85cf53a",
      "group_name": "Zeeeeedstem"
    },
    {
      "_id": "578b6bf3537c9526c85cf53b",
      "group_name": "ZeedDown"
    },
    {
      "_id": "578b6bf7537c9526c85cf53c",
      "group_name": "LinkZeed"
    },
    {
      "_id": "578b6c01537c9526c85cf53d",
      "group_name": "Alexceed Sanchez"
    }
  ]
}
```
---

## Show Group Members
Suffix URL: /api/group/member  
Method: **POST**  
URL enconded

## Body
| Parameter Name | Required | Remark |Example |
| :-------------- |:-------------:|:--|:-------|
| group | yes | Group's ID | 578b6bb7537c9526c85cf532 |

## Output: JSON
```
{
  "status": 200,
  "success": true,
  "group_name": "Systema",
  "members": [
    "aaa",
    "ccc"
  ]
}
```
