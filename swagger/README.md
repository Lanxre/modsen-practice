# Api
Open [api-doc](http://localhost:3000/api-doc/) and see swagger.

![image](https://user-images.githubusercontent.com/73068449/230184815-4591e23a-c918-4908-bd25-f4d507da3a01.png)

# doc

|    Path            |     Method     |      Params           |       Type            |         Required    | 
|    :---:           |     :---:      |      :---:            |     :---:             |         :---:       |
| api/meet-up        | POST /         |      body             |    object             |          ✅         |
| api/meet-up        | GET /          |      query            |    string, integer    |          ❌         |
| api/meet-up        | GET /:id       |      path             |    integer            |          ✅         |
| api/meet-up        | PUT /:id       |      body, path       |    object, integer    |          ✅         |
| api/meet-up        | DELETE /:id    |      path             |    integer            |          ✅         |
