eXceed 13 vote APIs
===

## Sign up
Suffix URL: /api/signup  
Method: POST  
URL enconded

## Body
| Parameter Name | Required | Remark |Example |
| :-------------- |:-------------:|:--|:-------|
| username | yes| username | b571054xxxx |
| password | yes | password | 1q2w3e4r |
| group | yes | group_id | 5780dad899aec131560a1572 |

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
Method: POST  
URL enconded

## Body
| Parameter Name | Required | Remark |Example |
| :-------------- |:-------------:|:--|:-------|
| username | yes| username | b571054xxxx |
| password | yes | password | 1q2w3e4r |

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
Suffix URL: /api/vote
Method: POST  
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
