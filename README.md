eXceed 13 vote APIs
===

## Sign up
Suffix URL: /api/signup  
URL enconded

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
URL enconded

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
